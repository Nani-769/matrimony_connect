import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserHeader from '../../components/ui/UserHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import ProfileImageGallery from './components/ProfileImageGallery';
import ProfileHeader from './components/ProfileHeader';
import ProfileDetailsSection from './components/ProfileDetailsSection';
import ProfileActionBar from './components/ProfileActionBar';
import ProfileLoadingState from './components/ProfileLoadingState';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProfileDetailView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get('id');
  
  const [profile, setProfile] = useState(null);
  const [requestStatus, setRequestStatus] = useState('none'); // none, sent, accepted, rejected
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock profile data
  const mockProfiles = {
    '1': {
      id: '1',
      name: 'Priya Sharma',
      dateOfBirth: '1995-03-15',
      height: '5\'4"',
      weight: '55 kg',
      location: 'Mumbai, Maharashtra',
      profession: 'Software Engineer',
      education: 'B.Tech Computer Science',
      company: 'Tech Solutions Pvt Ltd',
      religion: 'Hindu',
      caste: 'Brahmin',
      motherTongue: 'Hindi',
      maritalStatus: 'Never Married',
      isPremium: true,
      isVerified: true,
      phone: '+919876543210',
      images: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
      ],
      about: `I am a passionate software engineer with 4+ years of experience in developing web applications. I love traveling, reading books, and exploring new technologies. I believe in maintaining a balance between professional growth and personal happiness.\n\nI am looking for a life partner who shares similar values and interests, someone who is understanding, caring, and supportive. Family is very important to me, and I would love to build a beautiful future together.`,
      bodyType: 'Slim',
      complexion: 'Fair',
      physicalStatus: 'Normal',
      gothram: 'Bharadwaj',
      manglik: 'No',
      star: 'Rohini',
      raasi: 'Vrishabha',
      educationDetails: 'B.Tech from IIT Delhi',
      professionDetails: 'Senior Software Developer',
      income: '₹8-12 Lakhs',
      workLocation: 'Mumbai',
      diet: 'Vegetarian',
      smoking: 'No',
      drinking: 'No',
      hobbies: 'Reading, Traveling, Photography',
      interests: 'Technology, Music, Cooking',
      music: 'Classical, Bollywood',
      movies: 'Drama, Comedy',
      sports: 'Badminton, Swimming',
      books: 'Fiction, Self-help',
      family: {
        type: 'Nuclear',
        status: 'Middle Class',
        fatherName: 'Rajesh Sharma',
        fatherOccupation: 'Business',
        motherName: 'Sunita Sharma',
        motherOccupation: 'Teacher',
        brothers: '1 (Younger)',
        sisters: '0',
        location: 'Delhi',
        about: 'We are a close-knit family with traditional values and modern outlook. We believe in supporting each other and maintaining strong family bonds.'
      },
      preferences: {
        ageRange: '26-32 years',
        heightRange: '5\'6" - 6\'0"',
        maritalStatus: 'Never Married',
        religion: 'Hindu',
        caste: 'Any',
        motherTongue: 'Hindi, English',
        education: 'Graduate or above',
        profession: 'Any',
        incomeRange: '₹6+ Lakhs',
        location: 'Mumbai, Delhi, Bangalore',
        diet: 'Vegetarian',
        smoking: 'No',
        drinking: 'Occasionally acceptable'
      }
    },
    '2': {
      id: '2',
      name: 'Arjun Patel',
      dateOfBirth: '1992-08-22',
      height: '5\'10"',
      weight: '75 kg',
      location: 'Bangalore, Karnataka',
      profession: 'Marketing Manager',
      education: 'MBA Marketing',
      company: 'Global Marketing Solutions',
      religion: 'Hindu',
      caste: 'Patel',
      motherTongue: 'Gujarati',
      maritalStatus: 'Never Married',
      isPremium: false,
      isVerified: true,
      phone: '+919876543211',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
      ],
      about: `I am a dedicated marketing professional with a passion for creative campaigns and brand building. I enjoy playing cricket, watching movies, and spending time with family and friends.\n\nI am seeking a life partner who is independent, family-oriented, and shares similar values. I believe in mutual respect and understanding in a relationship.`,
      bodyType: 'Athletic',
      complexion: 'Wheatish',
      physicalStatus: 'Normal',
      gothram: 'Kashyap',
      manglik: 'Yes',
      star: 'Pushya',
      raasi: 'Karka',
      educationDetails: 'MBA from IIM Ahmedabad',
      professionDetails: 'Marketing Manager with 6+ years experience',
      income: '₹12-15 Lakhs',
      workLocation: 'Bangalore',
      diet: 'Vegetarian',
      smoking: 'No',
      drinking: 'Socially',
      hobbies: 'Cricket, Movies, Traveling',
      interests: 'Sports, Business, Technology',
      music: 'Bollywood, Pop',
      movies: 'Action, Thriller',
      sports: 'Cricket, Football',
      books: 'Business, Biographies',
      family: {
        type: 'Joint',
        status: 'Upper Middle Class',
        fatherName: 'Kiran Patel',
        fatherOccupation: 'Businessman',
        motherName: 'Meera Patel',
        motherOccupation: 'Homemaker',
        brothers: '0',
        sisters: '1 (Elder)',
        location: 'Ahmedabad',
        about: 'We are a traditional Gujarati family with strong values and business background. We believe in hard work and maintaining family traditions.'
      },
      preferences: {
        ageRange: '24-30 years',
        heightRange: '5\'2" - 5\'8"',
        maritalStatus: 'Never Married',
        religion: 'Hindu',
        caste: 'Patel preferred',
        motherTongue: 'Gujarati, Hindi',
        education: 'Graduate or above',
        profession: 'Any',
        incomeRange: '₹4+ Lakhs',
        location: 'Bangalore, Ahmedabad, Mumbai',
        diet: 'Vegetarian',
        smoking: 'No',
        drinking: 'No'
      }
    }
  };

  // Mock request statuses
  const mockRequestStatuses = {
    '1': 'none',
    '2': 'sent'
  };

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!profileId) {
          throw new Error('Profile ID is required');
        }

        const profileData = mockProfiles[profileId];
        if (!profileData) {
          throw new Error('Profile not found');
        }

        setProfile(profileData);
        setRequestStatus(mockRequestStatuses[profileId] || 'none');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [profileId]);

  const handleRequestSend = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequestStatus('sent');
      
      // Show success message (you can implement toast notification here)
      console.log('Interest sent successfully!');
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  const handleBack = () => {
    navigate('/dashboard-match-discovery');
  };

  if (isLoading) {
    return <ProfileLoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
          <h2 className="text-xl font-heading font-semibold">Profile Not Found</h2>
          <p className="text-muted-foreground font-body">{error}</p>
          <Button
            variant="default"
            onClick={handleBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Matches
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <UserHeader />
      <TabNavigation />
      
      {/* Main Content */}
      <div className="pt-16 md:pt-30 pb-24 md:pb-8">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-16 z-40 bg-background border-b border-border p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-lg font-heading font-semibold">Profile Details</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Desktop Header */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="mb-4"
            >
              Back to Matches
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Images and Header */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileImageGallery 
                images={profile.images} 
                name={profile.name} 
              />
              <ProfileHeader profile={profile} />
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2">
              <ProfileDetailsSection profile={profile} />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <ProfileActionBar
        profile={profile}
        requestStatus={requestStatus}
        onRequestSend={handleRequestSend}
      />
    </div>
  );
};

export default ProfileDetailView;