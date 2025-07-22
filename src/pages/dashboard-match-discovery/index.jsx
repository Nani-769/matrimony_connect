import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/ui/UserHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import ProfileModal from '../../components/ui/ProfileModal';
import FilterPanel from './components/FilterPanel';
import FilterChips from './components/FilterChips';
import MatchGrid from './components/MatchGrid';
import StatsHeader from './components/StatsHeader';

import Button from '../../components/ui/Button';

const DashboardMatchDiscovery = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [requestStatuses, setRequestStatuses] = useState({});
  const [filters, setFilters] = useState({
    region: 'all',
    income: 'all',
    age: 'all',
    education: 'all',
    horoscope: false,
    verified: false,
    premium: false
  });

  // Mock profiles data
  const mockProfiles = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 26,
      height: "5\'4\"",
      profession: "Software Engineer",
      location: "Mumbai, Maharashtra",
      education: "B.Tech Computer Science",
      religion: "Hindu",
      caste: "Brahmin",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop",
      isPremium: true,
      isVerified: true,
      isOnline: true,
      phone: "+919876543210",
      about: `I am a passionate software engineer working at a leading tech company in Mumbai. I love traveling, reading books, and exploring new technologies. Looking for a life partner who shares similar values and interests.`,
      family: {
        fatherOccupation: "Business Owner",
        motherOccupation: "Teacher",
        siblings: "1 Sister",
        type: "Nuclear Family"
      },
      motherTongue: "Hindi",
      maritalStatus: "Never Married",
      diet: "Vegetarian",
      smoking: "No"
    },
    {
      id: 2,
      name: "Rahul Patel",
      age: 29,
      height: "5\'8\"",
      profession: "Doctor",
      location: "Ahmedabad, Gujarat",
      education: "MBBS, MD",
      religion: "Hindu",
      caste: "Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      isPremium: false,
      isVerified: true,
      isOnline: false,
      phone: "+919876543211",
      about: `I am a dedicated doctor working in a government hospital. I believe in serving society and helping people. Looking for a caring and understanding life partner.`,
      family: {
        fatherOccupation: "Farmer",
        motherOccupation: "Housewife",
        siblings: "2 Brothers",
        type: "Joint Family"
      },
      motherTongue: "Gujarati",
      maritalStatus: "Never Married",
      diet: "Vegetarian",
      smoking: "No"
    },
    {
      id: 3,
      name: "Anita Singh",
      age: 24,
      height: "5\'3\"",
      profession: "Teacher",
      location: "Delhi, NCR",
      education: "M.Ed",
      religion: "Hindu",
      caste: "Rajput",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
      isPremium: true,
      isVerified: false,
      isOnline: true,
      phone: "+919876543212",
      about: `I am a passionate teacher who loves working with children. I enjoy classical music, dancing, and cooking. Looking for someone who values family traditions.`,
      family: {
        fatherOccupation: "Government Officer",
        motherOccupation: "Housewife",
        siblings: "1 Brother",
        type: "Nuclear Family"
      },
      motherTongue: "Hindi",
      maritalStatus: "Never Married",
      diet: "Vegetarian",
      smoking: "No"
    },
    {
      id: 4,
      name: "Vikram Kumar",
      age: 31,
      height: "5\'10\"",
      profession: "Business Analyst",
      location: "Bangalore, Karnataka",
      education: "MBA Finance",
      religion: "Hindu",
      caste: "Brahmin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
      isPremium: false,
      isVerified: true,
      isOnline: false,
      phone: "+919876543213",
      about: `I work as a business analyst in a multinational company. I love playing cricket, traveling, and spending time with family. Looking for a supportive life partner.`,
      family: {
        fatherOccupation: "Retired Bank Manager",
        motherOccupation: "Housewife",
        siblings: "1 Sister",
        type: "Nuclear Family"
      },
      motherTongue: "Kannada",
      maritalStatus: "Never Married",
      diet: "Non-Vegetarian",
      smoking: "No"
    },
    {
      id: 5,
      name: "Meera Reddy",
      age: 27,
      height: "5\'5\"",
      profession: "Chartered Accountant",
      location: "Hyderabad, Telangana",
      education: "CA, B.Com",
      religion: "Hindu",
      caste: "Reddy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
      isPremium: true,
      isVerified: true,
      isOnline: true,
      phone: "+919876543214",
      about: `I am a qualified chartered accountant working with a reputed firm. I enjoy reading, yoga, and classical music. Looking for an understanding and caring partner.`,
      family: {
        fatherOccupation: "Businessman",
        motherOccupation: "Doctor",
        siblings: "No Siblings",
        type: "Nuclear Family"
      },
      motherTongue: "Telugu",
      maritalStatus: "Never Married",
      diet: "Vegetarian",
      smoking: "No"
    },
    {
      id: 6,
      name: "Arjun Nair",
      age: 28,
      height: "5\'9\"",
      profession: "Marketing Manager",
      location: "Kochi, Kerala",
      education: "MBA Marketing",
      religion: "Hindu",
      caste: "Nair",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
      isPremium: false,
      isVerified: false,
      isOnline: false,
      phone: "+919876543215",
      about: `I work in marketing for a leading FMCG company. I love photography, traveling, and trying new cuisines. Looking for someone who shares similar interests.`,
      family: {
        fatherOccupation: "Engineer",
        motherOccupation: "Nurse",
        siblings: "1 Sister",
        type: "Nuclear Family"
      },
      motherTongue: "Malayalam",
      maritalStatus: "Never Married",
      diet: "Non-Vegetarian",
      smoking: "Occasionally"
    }
  ];

  useEffect(() => {
    // Simulate loading profiles
    const loadProfiles = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProfiles(mockProfiles);
      setFilteredProfiles(mockProfiles);
      setLoading(false);
    };

    loadProfiles();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...profiles];

    if (filters.region !== 'all') {
      const regionMap = {
        'north': ['Delhi', 'Punjab', 'Haryana', 'Uttar Pradesh'],
        'south': ['Karnataka', 'Tamil Nadu', 'Kerala', 'Telangana', 'Andhra Pradesh'],
        'west': ['Maharashtra', 'Gujarat', 'Rajasthan'],
        'east': ['West Bengal', 'Odisha', 'Jharkhand'],
        'central': ['Madhya Pradesh', 'Chhattisgarh'],
        'northeast': ['Assam', 'Meghalaya', 'Manipur']
      };
      
      const regionStates = regionMap[filters.region] || [];
      filtered = filtered.filter(profile => 
        regionStates.some(state => profile.location.includes(state))
      );
    }

    if (filters.income !== 'all') {
      // Mock income filtering (in real app, this would be based on actual income data)
      filtered = filtered.filter(profile => {
        const professionIncomeMap = {
          'Doctor': 15,
          'Software Engineer': 12,
          'Chartered Accountant': 10,
          'Business Analyst': 8,
          'Marketing Manager': 7,
          'Teacher': 4
        };
        const estimatedIncome = professionIncomeMap[profile.profession] || 5;
        
        switch (filters.income) {
          case '0-3': return estimatedIncome <= 3;
          case '3-5': return estimatedIncome > 3 && estimatedIncome <= 5;
          case '5-10': return estimatedIncome > 5 && estimatedIncome <= 10;
          case '10-15': return estimatedIncome > 10 && estimatedIncome <= 15;
          case '15-25': return estimatedIncome > 15 && estimatedIncome <= 25;
          case '25+': return estimatedIncome > 25;
          default: return true;
        }
      });
    }

    if (filters.age !== 'all') {
      const [minAge, maxAge] = filters.age.includes('+') 
        ? [parseInt(filters.age), 100] 
        : filters.age.split('-').map(Number);
      
      filtered = filtered.filter(profile => 
        profile.age >= minAge && profile.age <= maxAge
      );
    }

    if (filters.education !== 'all') {
      const educationLevels = {
        'graduate': ['B.Tech', 'B.Com', 'BA', 'BSc'],
        'postgraduate': ['MBA', 'M.Ed', 'MSc', 'MA'],
        'doctorate': ['PhD', 'MD'],
        'diploma': ['Diploma'],
        'professional': ['CA', 'MBBS', 'LLB']
      };
      
      const requiredEducations = educationLevels[filters.education] || [];
      filtered = filtered.filter(profile =>
        requiredEducations.some(edu => profile.education.includes(edu))
      );
    }

    if (filters.horoscope) {
      // Mock horoscope compatibility (in real app, this would be based on actual horoscope data)
      filtered = filtered.filter(profile => profile.religion === 'Hindu');
    }

    if (filters.verified) {
      filtered = filtered.filter(profile => profile.isVerified);
    }

    if (filters.premium) {
      filtered = filtered.filter(profile => profile.isPremium);
    }

    // Sort premium profiles first
    filtered.sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;
      return 0;
    });

    setFilteredProfiles(filtered);
  }, [profiles, filters]);

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const handleSendRequest = async (profileId) => {
    // Simulate sending request
    setRequestStatuses(prev => ({
      ...prev,
      [profileId]: 'sent'
    }));

    // Show success feedback
    // In real app, this would make an API call
    console.log(`Request sent to profile ${profileId}`);
  };

  const handleLoadMore = async () => {
    // Simulate loading more profiles
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, this would load more profiles from API
    setHasMore(false);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterRemove = (filterKey) => {
    const updatedFilters = { ...filters };
    
    if (filterKey === 'region' || filterKey === 'income' || filterKey === 'age' || filterKey === 'education') {
      updatedFilters[filterKey] = 'all';
    } else {
      updatedFilters[filterKey] = false;
    }
    
    setFilters(updatedFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      region: 'all',
      income: 'all',
      age: 'all',
      education: 'all',
      horoscope: false,
      verified: false,
      premium: false
    });
  };

  const handleCallClick = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsAppClick = (phone) => {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}`, '_blank');
  };

  const getStats = () => {
    const total = filteredProfiles.length;
    const newToday = filteredProfiles.filter(p => p.isOnline).length;
    const premium = filteredProfiles.filter(p => p.isPremium).length;
    
    return { total, newToday, premium };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-background">
      <UserHeader />
      <TabNavigation />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-30 pb-20 md:pb-8">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearAllFilters}
                />
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
                      Discover Your Perfect Match
                    </h1>
                    <p className="text-muted-foreground font-body">
                      Find compatible life partners based on your preferences
                    </p>
                  </div>
                  
                  {/* Premium Upgrade CTA */}
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/premium-upgrade')}
                    iconName="Crown"
                    iconPosition="left"
                    className="hidden md:flex"
                  >
                    Upgrade to Premium
                  </Button>
                </div>

                {/* Stats Header */}
                <StatsHeader
                  totalMatches={stats.total}
                  newMatches={stats.newToday}
                  premiumMatches={stats.premium}
                  className="mb-6"
                />

                {/* Filter Chips */}
                <FilterChips
                  filters={filters}
                  onFilterRemove={handleFilterRemove}
                  onClearAll={handleClearAllFilters}
                  onOpenFilters={() => setShowFilterPanel(true)}
                />
              </div>

              {/* Matches Grid */}
              <MatchGrid
                profiles={filteredProfiles}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onViewProfile={handleViewProfile}
                onSendRequest={handleSendRequest}
                requestStatuses={requestStatuses}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearAllFilters}
      />

      {/* Profile Modal */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onRequestSend={handleSendRequest}
        onCallClick={handleCallClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* Mobile Premium CTA */}
      <div className="fixed bottom-20 left-4 right-4 md:hidden z-30">
        <Button
          variant="secondary"
          onClick={() => navigate('/premium-upgrade')}
          iconName="Crown"
          iconPosition="left"
          className="w-full shadow-elevation-2"
        >
          Upgrade to Premium - ₹100
        </Button>
      </div>
    </div>
  );
};

export default DashboardMatchDiscovery;