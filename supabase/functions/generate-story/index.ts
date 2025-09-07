import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, genre, tone, audience, artStyle } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Generating story for prompt:', prompt);

    const systemPrompt = `You are a professional children's storybook creator AI. Based on the user idea: "${prompt}", generate a short illustrated story in exactly 4 scenes.

Genre: ${genre || 'Adventure'}
Tone: ${tone || 'Playful'}
Audience: ${audience || 'Children (3-6)'}
Art Style: ${artStyle || 'Cartoon'}

Each scene must include:
1. A short title for the scene.
2. A story text (2–3 sentences, child-friendly, imaginative, and engaging).
3. An image_prompt that describes the illustration clearly.

Important rules:
- Keep the story coherent across all 4 scenes, with recurring characters, setting, and theme.
- Ensure characters look the same in every image (mention details like color, clothing, expressions, and style).
- Use colorful, cartoon-style, whimsical, storybook illustrations suitable for children.
- Include emotions and actions in the image descriptions for stronger visuals.
- Make it appropriate for the specified audience and tone.

Return the result strictly in this JSON array format:
[
  {
    "title": "Scene 1 Title",
    "scene": "Scene 1 story text",
    "image_prompt": "Illustration description"
  },
  {
    "title": "Scene 2 Title", 
    "scene": "Scene 2 story text",
    "image_prompt": "Illustration description"
  },
  {
    "title": "Scene 3 Title",
    "scene": "Scene 3 story text", 
    "image_prompt": "Illustration description"
  },
  {
    "title": "Scene 4 Title",
    "scene": "Scene 4 story text",
    "image_prompt": "Illustration description"
  }
]`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Create a story based on: ${prompt}` }
        ],
        max_tokens: 2000,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('Generated story text:', generatedText);

    // Parse the JSON response from GPT
    let storyScenes;
    try {
      storyScenes = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Failed to parse story JSON:', parseError);
      console.error('Raw response:', generatedText);
      throw new Error('Failed to parse story content');
    }

    // Generate images for each scene
    const scenesWithImages = await Promise.all(
      storyScenes.map(async (scene: any, index: number) => {
        try {
          const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openAIApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-image-1',
              prompt: `${scene.image_prompt}. ${artStyle || 'Cartoon'} style, colorful, whimsical, storybook illustration for children, high quality`,
              size: '1024x1024',
              quality: 'high',
              output_format: 'webp'
            }),
          });

          if (!imageResponse.ok) {
            console.error(`Image generation failed for scene ${index + 1}:`, await imageResponse.text());
            // Use a placeholder image if generation fails
            return {
              id: index + 1,
              text: scene.scene,
              imageUrl: `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop`,
              imagePrompt: scene.image_prompt,
              title: scene.title
            };
          }

          const imageData = await imageResponse.json();
          const imageBase64 = imageData.data[0].b64_json;
          const imageUrl = `data:image/webp;base64,${imageBase64}`;

          return {
            id: index + 1,
            text: scene.scene,
            imageUrl: imageUrl,
            imagePrompt: scene.image_prompt,
            title: scene.title
          };
        } catch (imageError) {
          console.error(`Error generating image for scene ${index + 1}:`, imageError);
          // Return scene with placeholder image
          return {
            id: index + 1,
            text: scene.scene,
            imageUrl: `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop`,
            imagePrompt: scene.image_prompt,
            title: scene.title
          };
        }
      })
    );

    console.log('Story generation complete with', scenesWithImages.length, 'scenes');

    return new Response(JSON.stringify({ 
      story: scenesWithImages,
      title: storyScenes[0]?.title ? `The ${storyScenes[0].title.split(' ')[0]} Adventure` : 'A Magical Story'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-story function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate story', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});