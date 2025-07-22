import { supabase } from './supabase';

const userService = {
  // Get all user profiles for matching (public access)
  async getUserProfiles(filters = {}) {
    try {
      let query = supabase
        .from('user_profiles')
        .select('*')
        .eq('profile_status', 'active');

      // Apply filters
      if (filters.gender) {
        query = query.eq('gender', filters.gender);
      }

      if (filters.ageMin && filters.ageMax) {
        query = query.gte('age', filters.ageMin).lte('age', filters.ageMax);
      }

      if (filters.religion) {
        query = query.eq('religion', filters.religion);
      }

      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      if (filters.education) {
        query = query.ilike('education', `%${filters.education}%`);
      }

      if (filters.profession) {
        query = query.ilike('profession', `%${filters.profession}%`);
      }

      // Order by last seen for better user experience
      query = query.order('last_seen', { ascending: false });

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      
      return { success: false, error: 'Failed to load profiles' };
    }
  },

  // Get single user profile
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      
      return { success: false, error: 'Failed to load profile' };
    }
  },

  // Update user profile
  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      
      return { success: false, error: 'Failed to update profile' };
    }
  },

  // Update online status
  async updateOnlineStatus(userId, isOnline = true) {
    try {
      const updates = {
        is_online: isOnline,
        last_seen: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update online status' };
    }
  },

  // Search users
  async searchUsers(searchTerm, filters = {}) {
    try {
      let query = supabase
        .from('user_profiles')
        .select('*')
        .eq('profile_status', 'active');

      // Text search in name, profession, location
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,profession.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`);
      }

      // Apply filters
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          query = query.eq(key, filters[key]);
        }
      });

      const { data, error } = await query.limit(50);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to search users' };
    }
  }
};

export default userService;