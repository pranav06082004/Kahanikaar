import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  Users, 
  Globe, 
  Cpu, 
  Palette, 
  Volume2,
  Download,
  Share2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: Cpu,
      title: "Advanced AI Technology",
      description: "Powered by cutting-edge language models and image generation AI to create coherent, engaging stories with beautiful illustrations."
    },
    {
      icon: BookOpen,
      title: "Multi-Scene Narratives",
      description: "Generate complete stories with multiple scenes, each featuring custom text and accompanying artwork."
    },
    {
      icon: Palette,
      title: "Diverse Art Styles",
      description: "Choose from various artistic styles including traditional Indian folk art, watercolor, digital art, and more."
    },
    {
      icon: Volume2,
      title: "Text-to-Speech",
      description: "Bring your stories to life with natural-sounding narration in multiple languages and voices."
    },
    {
      icon: Download,
      title: "Export & Share",
      description: "Download your stories as beautiful PDFs or share them instantly with friends and family."
    },
    {
      icon: Globe,
      title: "Cultural Heritage",
      description: "Celebrating the rich tradition of Indian storytelling while embracing modern technology."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Share Your Idea",
      description: "Enter any story concept, from simple prompts to detailed plots. Our AI understands and builds upon your creativity."
    },
    {
      step: "2",
      title: "Customize Your Story",
      description: "Choose genre, tone, audience, and art style to make your kahani perfectly suited to your vision."
    },
    {
      step: "3",
      title: "AI Magic Happens",
      description: "Our advanced AI creates a multi-scene story with coherent narrative flow and beautiful accompanying illustrations."
    },
    {
      step: "4",
      title: "Enjoy & Share",
      description: "Read, listen, export, and share your completed story. Save it to your personal library for future enjoyment."
    }
  ];

  const techStack = [
    "React & TypeScript for robust frontend development",
    "Advanced Language Models for story generation",
    "AI Image Generation for custom illustrations",
    "Web Speech API for text-to-speech functionality",
    "Modern responsive design with Tailwind CSS",
    "Progressive Web App capabilities"
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-primary rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-story font-bold text-foreground mb-4">
              About KahaniKaar
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to democratize storytelling by combining the ancient art of 
              Indian kahani-telling with cutting-edge AI technology.
            </p>
          </div>

          {/* Mission Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 shadow-story">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-story font-bold text-foreground mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Every culture has its storytelling traditions, and India's is particularly rich with 
                    kahaniyan that have been passed down through generations. We believe everyone has 
                    stories within them waiting to be told.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    KahaniKaar bridges the gap between imagination and creation, making it possible for 
                    anyone to craft beautiful, illustrated stories without needing artistic or writing 
                    expertise. We're preserving the essence of traditional storytelling while embracing 
                    the possibilities of modern AI.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6 text-red-500" />
                    <span className="text-foreground font-medium">Made with love for storytellers everywhere</span>
                  </div>
                </div>
                <div className="bg-gradient-hero rounded-2xl p-8 text-center">
                  <Users className="w-16 h-16 text-primary-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    10,000+ Stories Created
                  </h3>
                  <p className="text-primary-foreground/80">
                    Join thousands of storytellers who have already brought their imagination to life
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* How It Works */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-story font-bold text-foreground mb-4">
                How KahaniKaar Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From idea to illustrated story in minutes. Here's how our AI-powered platform 
                transforms your creativity into beautiful kahaniyan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full text-center">
                    <div className="bg-gradient-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary-foreground">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-story font-bold text-foreground mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, enjoy, and share amazing stories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-story transition-magical">
                    <div className="bg-gradient-primary rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-card">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-story font-bold text-foreground mb-4">
                  Built with Modern Technology
                </h2>
                <p className="text-muted-foreground">
                  KahaniKaar leverages the latest in AI and web technologies to deliver a seamless storytelling experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {techStack.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-xl">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{tech}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 shadow-story">
              <h2 className="text-3xl md:text-4xl font-story font-bold text-foreground mb-4">
                Ready to Start Your Storytelling Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of storytellers who are already creating magical kahaniyan with KahaniKaar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/create">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Your First Story
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default About;