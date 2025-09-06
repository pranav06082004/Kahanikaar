import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Sparkles, 
  Wand2, 
  BookOpen, 
  Download, 
  Volume2, 
  Share2, 
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryScene {
  id: number;
  text: string;
  imageUrl: string;
  imagePrompt: string;
}

const Create = () => {
  const [storyIdea, setStoryIdea] = useState("");
  const [genre, setGenre] = useState("");
  const [tone, setTone] = useState("");
  const [audience, setAudience] = useState("");
  const [artStyle, setArtStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState<StoryScene[]>([]);
  const [currentScene, setCurrentScene] = useState(0);
  const [storyTitle, setStoryTitle] = useState("");

  const genres = [
    "Adventure", "Fantasy", "Fairy Tale", "Mythology", 
    "Comedy", "Mystery", "Historical", "Nature", "Friendship"
  ];

  const tones = [
    "Playful", "Magical", "Adventurous", "Heartwarming", 
    "Exciting", "Mysterious", "Inspirational", "Humorous"
  ];

  const audiences = [
    "Children (3-6)", "Kids (7-12)", "Teens (13-17)", 
    "Young Adults", "All Ages", "Adults"
  ];

  const artStyles = [
    "Indian Folk Art", "Watercolor", "Digital Art", "Pencil Sketch", 
    "Cartoon", "Realistic", "Abstract", "Traditional Painting"
  ];

  const generateStory = async () => {
    if (!storyIdea.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock story generation - in real app, this would be AI API call
    const mockStory: StoryScene[] = [
      {
        id: 1,
        text: `Once upon a time, in the heart of a bustling Indian village, there lived a curious young girl named Meera. She had always been fascinated by the ancient stories her grandmother told her about magical creatures that lived in the nearby forest. One sunny morning, Meera decided to venture into the mysterious woods to discover these wonders for herself.`,
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        imagePrompt: "A curious Indian girl standing at the edge of a mystical forest"
      },
      {
        id: 2,
        text: `As Meera walked deeper into the forest, she noticed something extraordinary. The trees seemed to whisper her name, and colorful butterflies danced around her in perfect harmony. Suddenly, she spotted a shimmering path made of golden leaves that led to a clearing she had never seen before.`,
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        imagePrompt: "A magical forest path with golden leaves and dancing butterflies"
      },
      {
        id: 3,
        text: `In the center of the clearing stood an ancient banyan tree with silver bark that sparkled in the sunlight. As Meera approached, she heard a gentle voice calling to her. "Welcome, young seeker," said the tree. "I am the Guardian of Stories, and I have been waiting for someone pure of heart to share the greatest tale of all."`,
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        imagePrompt: "An ancient silver banyan tree in a magical clearing"
      },
      {
        id: 4,
        text: `The Guardian Tree shared with Meera the secret that every person carries within them the power to create their own magical stories. "The real magic," whispered the tree, "is not in finding extraordinary things, but in seeing the extraordinary in ordinary moments." Meera smiled, understanding that her greatest adventures were just beginning.`,
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        imagePrompt: "A young girl listening to wisdom from a magical tree, surrounded by soft light"
      }
    ];
    
    setStory(mockStory);
    setStoryTitle("Meera and the Guardian of Stories");
    setCurrentScene(0);
    setIsGenerating(false);
  };

  const nextScene = () => {
    if (currentScene < story.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  const regenerateScene = async (sceneId: number, type: 'text' | 'image') => {
    // Mock regeneration
    console.log(`Regenerating ${type} for scene ${sceneId}`);
  };

  const saveStory = () => {
    // Save to localStorage for demo
    const savedStories = JSON.parse(localStorage.getItem('kahanikar_stories') || '[]');
    const newStory = {
      id: Date.now(),
      title: storyTitle,
      scenes: story,
      createdAt: new Date().toISOString(),
      genre,
      tone,
      audience,
      artStyle
    };
    savedStories.push(newStory);
    localStorage.setItem('kahanikar_stories', JSON.stringify(savedStories));
    alert('Story saved to your library!');
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-story font-bold text-foreground mb-4">
              Create Your Magical Kahani
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your imagination into a beautiful illustrated story. 
              Just share your idea and watch the magic unfold!
            </p>
          </div>

          {!story.length ? (
            /* Story Creation Form */
            <Card className="max-w-4xl mx-auto p-8 shadow-story">
              <div className="space-y-6">
                {/* Story Idea Input */}
                <div className="space-y-2">
                  <Label htmlFor="storyIdea" className="text-lg font-semibold">
                    What's your story idea? ✨
                  </Label>
                  <Textarea
                    id="storyIdea"
                    placeholder="Enter your story idea here... (e.g., 'A young girl discovers a magical garden where flowers can talk')"
                    value={storyIdea}
                    onChange={(e) => setStoryIdea(e.target.value)}
                    className="min-h-[120px] text-base"
                  />
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Genre</Label>
                    <Select value={genre} onValueChange={setGenre}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((g) => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Audience</Label>
                    <Select value={audience} onValueChange={setAudience}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audiences.map((a) => (
                          <SelectItem key={a} value={a}>{a}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Art Style</Label>
                    <Select value={artStyle} onValueChange={setArtStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose art style" />
                      </SelectTrigger>
                      <SelectContent>
                        {artStyles.map((style) => (
                          <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center pt-4">
                  <Button
                    variant="magical"
                    size="xl"
                    onClick={generateStory}
                    disabled={!storyIdea.trim() || isGenerating}
                    className="group min-w-[200px]"
                  >
                    {isGenerating ? (
                      <>
                        <Wand2 className="w-5 h-5 mr-2 animate-pulse" />
                        Magical words are being written...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                        Generate My Kahani!
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            /* Story Display */
            <div className="space-y-6">
              {/* Story Header */}
              <Card className="p-6 shadow-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-story font-bold text-foreground mb-2">
                      {storyTitle}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {genre && <Badge variant="outline">{genre}</Badge>}
                      {tone && <Badge variant="outline">{tone}</Badge>}
                      {audience && <Badge variant="outline">{audience}</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={saveStory}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Narrate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Story Scene */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-8 shadow-story">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Image */}
                      <div className="space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-card">
                          <img
                            src={story[currentScene]?.imageUrl}
                            alt={story[currentScene]?.imagePrompt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => regenerateScene(story[currentScene].id, 'image')}
                          className="w-full"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate Image
                        </Button>
                      </div>

                      {/* Text */}
                      <div className="space-y-4">
                        <div className="bg-muted rounded-2xl p-6">
                          <p className="text-lg leading-relaxed text-foreground">
                            {story[currentScene]?.text}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => regenerateScene(story[currentScene].id, 'text')}
                          className="w-full"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate Text
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Scene Navigation */}
              <Card className="p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevScene}
                    disabled={currentScene === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Scene {currentScene + 1} of {story.length}
                    </span>
                    <div className="flex space-x-1">
                      {story.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentScene(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentScene
                              ? "bg-primary"
                              : "bg-muted hover:bg-muted-foreground/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={nextScene}
                    disabled={currentScene === story.length - 1}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>

              {/* New Story Button */}
              <div className="text-center">
                <Button
                  variant="hero"
                  onClick={() => {
                    setStory([]);
                    setStoryIdea("");
                    setGenre("");
                    setTone("");
                    setAudience("");
                    setArtStyle("");
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Another Story
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Create;