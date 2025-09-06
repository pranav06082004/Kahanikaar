import { BookOpen, Heart, Github, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-primary rounded-xl p-2 shadow-story">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-story font-bold text-foreground">KahaniKaar</h3>
                <p className="text-sm text-muted-foreground">The AI Storyteller</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Where your imagination becomes beautiful kahaniyan. Turn any idea into a multi-part 
              illustrated story in seconds, inspired by the rich tradition of Indian storytelling.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-muted-foreground hover:text-primary transition-colors">
                  Create Story
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-muted-foreground hover:text-primary transition-colors">
                  My Library
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 KahaniKaar. Made with <Heart className="w-4 h-4 inline text-red-500" /> for storytellers everywhere.
          </p>
          <p className="text-muted-foreground text-sm mt-2 sm:mt-0">
            Powered by AI, inspired by tradition
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;