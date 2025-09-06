import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Story {
  id: string;
  title: string;
  description?: string;
  genre?: string;
  tone?: string;
  audience?: string;
  art_style?: string;
  scenes: any[];
  thumbnail_url?: string;
  created_at: string;
  user_id?: string;
}

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchStories = async () => {
    if (!user) {
      setStories([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories((data || []).map(story => ({
        ...story,
        scenes: Array.isArray(story.scenes) ? story.scenes : []
      })));
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [user]);

  const saveStory = async (storyData: Omit<Story, 'id' | 'created_at'>) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { data, error } = await supabase
        .from('stories')
        .insert([{
          ...storyData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      const formattedData = {
        ...data,
        scenes: Array.isArray(data.scenes) ? data.scenes : []
      };
      
      setStories(prev => [formattedData, ...prev]);
      return formattedData;
    } catch (error) {
      console.error('Error saving story:', error);
      throw error;
    }
  };

  const deleteStory = async (storyId: string) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', storyId);

      if (error) throw error;
      
      setStories(prev => prev.filter(story => story.id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  };

  return {
    stories,
    loading,
    saveStory,
    deleteStory,
    refetch: fetchStories
  };
};