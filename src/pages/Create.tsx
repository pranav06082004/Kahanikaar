import { useState, useEffect } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { useStories } from "@/hooks/useStories";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

  const { user } = useAuth();
  const { saveStory } = useStories();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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

  const randomStoryPrompts = [
    "A curious cat discovers a door to a magical world where colors can talk",
    "A young baker finds that their bread rolls can grant wishes",
    "Two best friends build a rocket ship out of cardboard and actually fly to the moon",
    "A shy bookworm discovers they can enter any story they read",
    "A little elephant learns to paint with their trunk and becomes famous",
    "A robot learns what friendship means by helping a lost puppy find its way home",
    "A magical tree grows different fruits that give people different superpowers",
    "A young chef discovers their grandmother's secret recipe book contains spells",
    "A lonely lighthouse keeper befriends a family of whales",
    "A girl who can speak to flowers solves mysteries in her neighborhood"
  ];

  const generateStory = async () => {
    setIsGenerating(true);
    
    try {
      // Generate random parameters if not set
      const randomPrompt = storyIdea.trim() || randomStoryPrompts[Math.floor(Math.random() * randomStoryPrompts.length)];
      const randomGenre = genre || genres[Math.floor(Math.random() * genres.length)];
      const randomTone = tone || tones[Math.floor(Math.random() * tones.length)];
      const randomAudience = audience || audiences[Math.floor(Math.random() * audiences.length)];
      const randomArtStyle = artStyle || artStyles[Math.floor(Math.random() * artStyles.length)];

      const { data, error } = await supabase.functions.invoke('generate-story', {
        body: {
          prompt: randomPrompt,
          genre: randomGenre,
          tone: randomTone,
          audience: randomAudience,
          artStyle: randomArtStyle
        }
      });

      if (error) {
        console.error('Story generation error:', error);
        toast.error("Failed to generate story. Please try again.");
        return;
      }

      if (data.error) {
        console.error('Story generation API error:', data.error);
        toast.error(data.error);
        return;
      }

      setStory(data.story);
      setStoryTitle(data.title);
      setCurrentScene(0);
      
      // Update form fields with generated values
      if (!storyIdea.trim()) setStoryIdea(randomPrompt);
      if (!genre) setGenre(randomGenre);
      if (!tone) setTone(randomTone);
      if (!audience) setAudience(randomAudience);
      if (!artStyle) setArtStyle(randomArtStyle);
      
      toast.success("Your magical story has been created!");
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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

  const handleSaveStory = async () => {
    if (!story.length || !user) return;
    
    try {
      await saveStory({
        title: storyTitle,
        description: storyIdea,
        genre,
        tone,
        audience,
        art_style: artStyle,
        scenes: story,
        thumbnail_url: story[0]?.imageUrl
      });
      
      toast.success("Story saved to your library!");
    } catch (error) {
      toast.error("Failed to save story");
    }
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
                    disabled={isGenerating}
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
                    <Button variant="outline" size="sm" onClick={handleSaveStory}>
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
