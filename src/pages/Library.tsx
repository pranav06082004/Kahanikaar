import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Trash2, 
  Share2, 
  Download,
  Eye,
  Calendar,
  Sparkles,
  Plus,
  SortDesc,
  Grid3X3,
  List
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useStories } from "@/hooks/useStories";
import { toast } from "sonner";

interface SavedStory {
  id: number;
  title: string;
  scenes: any[];
  createdAt: string;
  genre: string;
  tone: string;
  audience: string;
  artStyle: string;
}

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedGenre, setSelectedGenre] = useState("");

  const { user } = useAuth();
  const { stories, loading, deleteStory } = useStories();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const filteredStories = stories
    .filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === "" || story.genre === selectedGenre)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleDeleteStory = async (storyId: string) => {
    if (confirm("Are you sure you want to delete this story?")) {
      try {
        await deleteStory(storyId);
        toast.success("Story deleted successfully");
      } catch (error) {
        toast.error("Failed to delete story");
      }
    }
  };

  const shareStory = (story: any) => {
    // Mock share functionality
    navigator.clipboard.writeText(`Check out my story "${story.title}" created with KahaniKaar!`);
    toast.success('Story link copied to clipboard!');
  };

  const genres = [...new Set(stories.map(story => story.genre))].filter(Boolean);

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
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-story font-bold text-foreground mb-4">
              Your Kahani Library
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All your magical stories in one place. Read, share, and relive your creative adventures.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">Loading your stories...</div>
            </div>
          ) : stories.length === 0 ? (
            /* Empty State */
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="max-w-2xl mx-auto p-12 shadow-story">
                <div className="bg-gradient-primary rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-story font-bold text-foreground mb-4">
                  Your library is empty!
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Start your storytelling journey by creating your first magical kahani.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/create">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Your First Kahani
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Filters and Search */}
              <Card className="p-6 shadow-card">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search your stories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>

                    {/* Genre Filter */}
                    <select
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      className="px-3 py-2 border border-input rounded-xl bg-background text-foreground"
                    >
                      <option value="">All Genres</option>
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>

                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-input rounded-xl bg-background text-foreground"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="title">By Title</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {filteredStories.length} stories
                    </span>
                    <div className="flex border border-input rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stories Grid/List */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden story-card">
                        <div className="aspect-video bg-gradient-hero flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-primary-foreground opacity-80" />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-story font-bold text-lg text-foreground line-clamp-2">
                              {story.title}
                            </h3>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {story.genre && <Badge variant="outline" className="text-xs">{story.genre}</Badge>}
                            {story.tone && <Badge variant="outline" className="text-xs">{story.tone}</Badge>}
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(story.created_at).toLocaleDateString()}
                          </div>

                          <div className="flex gap-2">
                            <Button variant="default" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              Read
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => shareStory(story)}>
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteStory(story.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-6 hover:shadow-card transition-magical">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="bg-gradient-primary rounded-xl p-3">
                              <BookOpen className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-story font-bold text-lg text-foreground mb-1">
                                {story.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(story.created_at).toLocaleDateString()}
                                </span>
                                <span>{story.scenes.length} scenes</span>
                                {story.genre && <Badge variant="outline" className="text-xs">{story.genre}</Badge>}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="default" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Read
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => shareStory(story)}>
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteStory(story.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Create New Story Button */}
              <div className="text-center pt-8">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/create">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Kahani
                  </Link>
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

export default Library;