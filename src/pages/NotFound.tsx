import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-12 text-center shadow-story">
            <div className="bg-gradient-primary rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-6xl font-story font-bold text-foreground mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Story Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              It seems this page has wandered off into an unwritten chapter. 
              Let's get you back to where the stories are!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  <Home className="w-5 h-5 mr-2" />
                  Return Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="mt-12 p-6 bg-muted rounded-2xl">
              <h3 className="font-semibold text-foreground mb-3">
                Looking for something specific?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <Link to="/create" className="text-primary hover:underline">Create Stories</Link>
                <Link to="/library" className="text-primary hover:underline">Story Library</Link>
                <Link to="/about" className="text-primary hover:underline">About Us</Link>
                <Link to="/contact" className="text-primary hover:underline">Get Help</Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
