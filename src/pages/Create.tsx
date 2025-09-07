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

interface GeneratedStory {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  timestamp: Date;
}

const Create = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStories, setGeneratedStories] = useState<GeneratedStory[]>([]);

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

  const sampleStories = [
    {
      title: "The Magical Peacock's Garden",
      text: "In a hidden valley surrounded by emerald hills, there lived a magnificent peacock named Mayura whose feathers shimmered like rainbow silk. Unlike other peacocks, Mayura possessed a special gift - wherever he danced, the most beautiful flowers would bloom instantly.\n\nOne day, a terrible drought struck the land, and all the gardens withered away. The village children were heartbroken, for they had no flowers to offer at the temple festival. Mayura decided to help, spreading his magnificent tail and dancing with all his heart.\n\nAs his feet touched the dry earth, marigolds, roses, and jasmine began to sprout and bloom in magnificent colors. The entire village was filled with the sweet fragrance of flowers, and the children's laughter echoed through the valley once again.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center"
    },
    {
      title: "The Little Elephant's Big Dream",
      text: "Golu was the smallest elephant in his herd, with ears that flapped like tiny fans and a trunk that could barely reach the lowest branches. While other elephants could easily pluck mangoes from tall trees, Golu had to be content with fallen fruits.\n\nOne morning, Golu discovered a family of sparrows whose nest had fallen from a tree during a storm. The baby birds were too young to fly, and their mother was desperately chirping for help. All the big elephants were too large to help without causing more damage.\n\nBut Golu's small size was perfect! He gently used his little trunk to lift each baby bird and carefully placed them in a safe, low branch. The grateful sparrow family decided to become Golu's friends, and from that day on, they would fly ahead and tell him where the sweetest fruits had fallen.",
      imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop&crop=center"
    },
    {
      title: "The Star Weaver's Gift",
      text: "High up in the Himalayan mountains lived an old grandmother who was known throughout the villages as the Star Weaver. Every night, she would sit on her terrace with a magical spinning wheel, spinning threads of starlight into the most beautiful shawls.\n\nOne cold winter night, a poor shepherd boy knocked on her door, shivering in the mountain wind. His only goat had wandered away, and he had been searching for hours in the snow. The Star Weaver invited him in and wrapped him in one of her starlight shawls.\n\nThe moment the shawl touched his shoulders, it began to glow softly, creating a gentle light that cut through the darkness. Following the warm glow, the boy found his goat safe and sound, sheltered behind a large rock. When he returned to thank the Star Weaver, she smiled and told him the shawl was his to keep, for kindness should always be rewarded with kindness.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center"
    },
    {
      title: "The Singing Banyan Tree",
      text: "In the heart of a bustling Indian village stood an ancient banyan tree that was at least a thousand years old. Its massive trunk was so wide that it took twenty people holding hands to circle it, and its branches spread like a natural umbrella over half the village square.\n\nWhat made this tree truly special was that it could sing. Every evening at sunset, the tree would hum beautiful melodies that filled the air with peace and joy. The villagers believed the tree held the wisdom of ages in its songs, and many important decisions were made while sitting under its canopy.\n\nOne day, a developer wanted to cut down the tree to build a shopping mall. But when the village children formed a circle around the tree and asked it to sing, the most beautiful melody filled the air - so enchanting that even the developer's heart was touched. He decided to build his mall elsewhere, and the singing banyan tree continues to bless the village with its ancient songs.",
      imageUrl: "https://images.unsplash.com/photo-1574263867128-3527b87b89b7?w=400&h=400&fit=crop&crop=center"
    },
    {
      title: "The Rainbow Fish of the Sacred River",
      text: "Deep in the sacred waters of the Ganges lived a special fish named Rangoli, whose scales sparkled with all the colors of the rainbow. Legend said that anyone who saw Rangoli would be blessed with good fortune, but the magical fish only appeared to those with pure hearts.\n\nA young girl named Priya visited the river every day, bringing breadcrumbs for the fish and cleaning the riverbank of any litter she found. She never asked for anything in return; she simply loved caring for the river and its creatures.\n\nOne evening, as Priya sat quietly by the water, Rangoli emerged from the depths, her scales creating ripples of color on the water's surface. The fish granted Priya a special gift - the ability to understand the language of all river creatures. From that day forward, Priya became the guardian of the river, helping to protect it with the wisdom she gained from listening to the fish, frogs, and water birds.",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop&crop=center"
    },
    {
      title: "The Monsoon Dancing Frog",
      text: "In a small pond surrounded by lotus flowers lived Mukul, a bright green frog who loved to dance. While other frogs were content to sit on lily pads and croak, Mukul had learned to dance from watching the classical dancers who practiced by the pond each morning.\n\nWhen the monsoon season arrived, the village faced an unusual problem - the rains were too gentle, and the crops needed more water. The villagers were worried about their harvest, and many prayers were offered to the rain gods.\n\nMukul decided to help in his own special way. He began performing an elaborate rain dance, leaping from lily pad to lily pad with graceful movements inspired by the classical dancers. His infectious joy attracted other frogs, birds, and even the village children, who joined in the celebration. Their collective dance of gratitude pleased the rain gods so much that the monsoons poured down abundantly, saving the harvest.",
      imageUrl: "https://images.unsplash.com/photo-1619479195195-bb2e4d6ba3c3?w=400&h=400&fit=crop&crop=center"
    }
  ];

  const generateStory = () => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      const randomStory = sampleStories[Math.floor(Math.random() * sampleStories.length)];
      const newStory: GeneratedStory = {
        id: Date.now().toString(),
        title: randomStory.title,
        text: randomStory.text,
        imageUrl: randomStory.imageUrl,
        timestamp: new Date()
      };
      
      // Add new story at the top of the list
      setGeneratedStories(prev => [newStory, ...prev]);
      setIsGenerating(false);
      toast.success("Your magical Kahani has been created!");
    }, 2000);
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
              Click the button below to generate beautiful, randomly selected stories from our collection of magical tales!
            </p>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-12">
            <Button
              variant="magical"
              size="xl"
              onClick={generateStory}
              disabled={isGenerating}
              className="group min-w-[250px]"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="w-5 h-5 mr-2 animate-pulse" />
                  Creating magical story...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Generate My Kahani!
                </>
              )}
            </Button>
          </div>

          {/* Generated Stories Library */}
          {generatedStories.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-story font-bold text-foreground mb-2">
                  Your Kahani Library
                </h2>
                <p className="text-muted-foreground">
                  {generatedStories.length} magical {generatedStories.length === 1 ? 'story' : 'stories'} created
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full overflow-hidden hover-scale shadow-story transition-magical hover:shadow-card">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-story font-semibold text-foreground mb-3 line-clamp-2">
                          {story.title}
                        </h3>
                        <div className="text-sm text-muted-foreground mb-4">
                          Created {story.timestamp.toLocaleDateString()} at{' '}
                          {story.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed line-clamp-4 mb-4">
                          {story.text}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Read Full
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
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