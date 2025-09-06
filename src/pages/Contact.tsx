import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Instagram, 
  Github,
  Send,
  Clock,
  MessageCircle,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Drop us a line anytime",
      contact: "hello@kahanikar.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm IST",
      contact: "+91 98765 43210"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      contact: "Bangalore, Karnataka, India"
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-12 text-center shadow-story">
              <div className="bg-gradient-primary rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-story font-bold text-foreground mb-4">
                Thank You!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                  Back to Home
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-story font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or just want to say hello? We'd love to hear from you. 
              Let's start a conversation about storytelling!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Information */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 h-full shadow-card">
                <h2 className="text-2xl font-story font-bold text-foreground mb-6">
                  Let's Connect
                </h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-gradient-primary rounded-xl p-3 flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                        <p className="font-medium text-foreground">{item.contact}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="bg-muted hover:bg-primary hover:text-primary-foreground p-3 rounded-xl transition-magical"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">Response Time</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 shadow-story">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-story font-bold text-foreground">
                    Send us a Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <strong>Privacy Notice:</strong> We respect your privacy and will never share your 
                    personal information with third parties. Your data is used only to respond to your inquiry.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-card">
              <h2 className="text-2xl font-story font-bold text-foreground mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">How do I create my first story?</h3>
                    <p className="text-sm text-muted-foreground">
                      Simply visit our Create page, enter your story idea, choose your preferences, and let our AI do the magic!
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can I edit generated stories?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! You can regenerate individual scenes, both text and images, until you're completely satisfied.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Is KahaniKaar free to use?</h3>
                    <p className="text-sm text-muted-foreground">
                      We offer both free and premium tiers. Contact us to learn more about our pricing plans.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Can I share my stories?</h3>
                    <p className="text-sm text-muted-foreground">
                      Absolutely! You can share your stories via link, export as PDF, or even have them narrated aloud.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;