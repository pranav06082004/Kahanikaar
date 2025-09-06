import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Sparkles, 
  BookOpen, 
  Palette, 
  Share2, 
  Download, 
  Volume2,
  Users,
  Clock,
  Star,
  ArrowRight,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Stories",
      description: "Transform any idea into captivating multi-part stories with beautiful illustrations"
    },
    {
      icon: Palette,
      title: "Custom Art Styles",
      description: "Choose from various art styles inspired by Indian folk art and modern illustrations"
    },
    {
      icon: Volume2,
      title: "Story Narration",
      description: "Listen to your stories with built-in text-to-speech in multiple languages"
    },
    {
      icon: Download,
      title: "Export Stories",
      description: "Download your stories as beautiful PDFs to share or print"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your kahaniyan with friends and family with a simple link"
    },
    {
      icon: BookOpen,
      title: "Personal Library",
      description: "Keep all your stories organized in your personal digital library"
    }
  ];

  const stats = [
    { label: "Stories Created", value: "10,000+", icon: BookOpen },
    { label: "Happy Storytellers", value: "2,500+", icon: Users },
    { label: "Average Creation Time", value: "< 2 min", icon: Clock },
    { label: "User Rating", value: "4.9/5", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              ✨ Where Imagination Meets AI Magic
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-story font-bold text-foreground mb-6 leading-tight">
              Where Your Imagination <br />
              Becomes Beautiful{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Kahaniyan
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Turn any idea into a multi-part illustrated kahani in seconds. 
              Experience the magic of AI-powered storytelling inspired by Indian traditions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                variant="hero" 
                size="xl" 
                asChild
                className="group"
              >
                <Link to="/create">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Start Your Kahani
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="xl" 
                className="group"
                onClick={() => {
                  // Demo story data
                  const demoStory = {
                    title: "The Magic Garden",
                    scenes: [
                      {
                        text: "Once upon a time, in a small village, there lived a curious little girl named Maya who loved exploring.",
                        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
                      },
                      {
                        text: "One day, Maya discovered a hidden garden behind her grandmother's house, filled with flowers that glowed in the moonlight.",
                        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop"
                      }
                    ]
                  };
                  
                  // Create demo modal
                  const modal = document.createElement('div');
                  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                  modal.innerHTML = `
                    <div class="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                      <h2 class="text-2xl font-bold mb-4">Demo: ${demoStory.title}</h2>
                      <div class="space-y-4">
                        ${demoStory.scenes.map((scene, index) => `
                          <div class="border rounded-lg p-4">
                            <img src="${scene.imageUrl}" alt="Scene ${index + 1}" class="w-full h-48 object-cover rounded mb-3">
                            <p class="text-muted-foreground">${scene.text}</p>
                          </div>
                        `).join('')}
                      </div>
                      <button onclick="this.parentElement.parentElement.remove()" class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                        Close Demo
                      </button>
                    </div>
                  `;
                  document.body.appendChild(modal);
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-story font-bold text-foreground mb-4">
              Magical Features for Every Storyteller
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the tools that make KahaniKaar the perfect platform for creating, 
              sharing, and enjoying illustrated stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-story transition-magical story-card">
                  <div className="bg-gradient-primary rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Story Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-story font-bold text-foreground mb-4">
              See KahaniKaar in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's a sample story created with KahaniKaar - from a simple idea to a beautiful illustrated kahani.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-story">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-story font-bold text-foreground">The Magical Garden</h3>
                  <p className="text-muted-foreground">A story about friendship and nature</p>
                </div>
                <Badge variant="outline">Sample Story</Badge>
              </div>
              
              <div className="bg-muted rounded-2xl p-8 mb-6">
                <div className="aspect-video bg-gradient-hero rounded-xl flex items-center justify-center mb-4">
                  <Play className="w-16 h-16 text-primary-foreground opacity-80" />
                </div>
                <p className="text-foreground leading-relaxed">
                  "In a small village nestled between rolling hills, there lived a young girl named Priya 
                  who discovered a magical garden where flowers sang melodies and trees whispered ancient secrets..."
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Full Story
                </Button>
                <Button variant="outline" size="sm">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-story font-bold text-foreground mb-6">
              Ready to Create Your First Kahani?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of storytellers who are already creating magical stories with KahaniKaar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="magical" size="xl" asChild className="group">
                <Link to="/create">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Start Creating Now
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;