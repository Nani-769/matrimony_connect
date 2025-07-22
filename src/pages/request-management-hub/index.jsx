import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/ui/UserHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import ProfileModal from '../../components/ui/ProfileModal';
import RequestCard from './components/RequestCard';
import RequestTabs from './components/RequestTabs';
import RequestFilters from './components/RequestFilters';
import EmptyState from './components/EmptyState';
import ConfirmationModal from './components/ConfirmationModal';

const RequestManagementHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('received');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    sort: 'newest',
    membership: 'all'
  });

  // Mock data for sent requests
  const [sentRequests, setSentRequests] = useState([
    {
      id: 1,
      profile: {
        id: 101,
        name: 'Priya Sharma',
        age: 26,
        location: 'Mumbai, Maharashtra',
        profession: 'Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        phone: '+91 9876543210',
        isPremium: true,
        height: "5\'4\"",
        education: 'B.Tech Computer Science',
        religion: 'Hindu',
        caste: 'Brahmin',
        motherTongue: 'Hindi',
        about: `I am a passionate software engineer working in Mumbai. I love traveling, reading books, and exploring new technologies. Looking for a life partner who shares similar values and interests.`
      },
      status: 'accepted',
      timestamp: new Date('2025-01-18T10:30:00')
    },
    {
      id: 2,
      profile: {
        id: 102,
        name: 'Anita Patel',
        age: 24,
        location: 'Ahmedabad, Gujarat',
        profession: 'Doctor',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        phone: '+91 9876543211',
        isPremium: false,
        height: "5\'2\"",
        education: 'MBBS',
        religion: 'Hindu',
        caste: 'Patel',
        motherTongue: 'Gujarati',
        about: `I am a dedicated doctor working in Ahmedabad. I believe in helping others and making a positive impact on society. Looking for someone who values family and has a good sense of humor.`
      },
      status: 'seen',
      timestamp: new Date('2025-01-17T14:20:00')
    },
    {
      id: 3,
      profile: {
        id: 103,
        name: 'Kavya Reddy',
        age: 25,
        location: 'Hyderabad, Telangana',
        profession: 'Teacher',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
        phone: '+91 9876543212',
        isPremium: true,
        height: "5\'3\"",
        education: 'M.Ed',
        religion: 'Hindu',
        caste: 'Reddy',
        motherTongue: 'Telugu',
        about: `I am a passionate teacher who loves working with children. I enjoy classical music, cooking, and spending time with family. Seeking a caring and understanding life partner.`
      },
      status: 'rejected',
      timestamp: new Date('2025-01-16T09:15:00')
    },
    {
      id: 4,
      profile: {
        id: 104,
        name: 'Meera Singh',
        age: 27,
        location: 'Delhi, India',
        profession: 'Marketing Manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        phone: '+91 9876543213',
        isPremium: false,
        height: "5\'5\"",
        education: 'MBA Marketing',
        religion: 'Hindu',
        caste: 'Rajput',
        motherTongue: 'Hindi',
        about: `I work as a marketing manager in Delhi and love creative challenges. I enjoy traveling, photography, and trying new cuisines. Looking for someone ambitious and family-oriented.`
      },
      status: 'sent',
      timestamp: new Date('2025-01-19T16:45:00')
    }
  ]);

  // Mock data for received requests
  const [receivedRequests, setReceivedRequests] = useState([
    {
      id: 5,
      profile: {
        id: 105,
        name: 'Rahul Kumar',
        age: 28,
        location: 'Bangalore, Karnataka',
        profession: 'Data Scientist',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        phone: '+91 9876543214',
        isPremium: true,
        height: "5\'8\"",
        education: 'M.Tech Data Science',
        religion: 'Hindu',
        caste: 'Brahmin',
        motherTongue: 'Hindi',
        about: `I am a data scientist working in Bangalore's tech industry. I love solving complex problems and working with cutting-edge technology. Looking for an intelligent and supportive life partner.`
      },
      status: 'sent',timestamp: new Date('2025-01-19T11:30:00')
    },
    {
      id: 6,
      profile: {
        id: 106,
        name: 'Arjun Nair',age: 29,location: 'Kochi, Kerala',profession: 'Architect',avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',phone: '+91 9876543215',isPremium: false,height: "5\'10\"",education: 'B.Arch',religion: 'Hindu',caste: 'Nair',motherTongue: 'Malayalam',
        about: `I am an architect passionate about sustainable design and green buildings. I love art, music, and spending time in nature. Seeking someone who appreciates creativity and has strong values.`
      },
      status: 'sent',timestamp: new Date('2025-01-18T08:20:00')
    },
    {
      id: 7,
      profile: {
        id: 107,
        name: 'Vikram Joshi',age: 30,location: 'Pune, Maharashtra',profession: 'Business Analyst',avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',phone: '+91 9876543216',isPremium: true,height: "5\'9\"",education: 'MBA Finance',religion: 'Hindu',caste: 'Brahmin',motherTongue: 'Marathi',
        about: `I work as a business analyst in Pune and enjoy strategic thinking and problem-solving. I love cricket, reading, and traveling. Looking for someone who values both career and family.`
      },
      status: 'sent',timestamp: new Date('2025-01-17T15:10:00')
    }
  ]);

  // Filter and sort requests
  const getFilteredRequests = (requests) => {
    let filtered = [...requests];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(request => request.status === filters.status);
    }

    // Filter by membership
    if (filters.membership !== 'all') {
      if (filters.membership === 'premium') {
        filtered = filtered.filter(request => request.profile.isPremium);
      } else if (filters.membership === 'regular') {
        filtered = filtered.filter(request => !request.profile.isPremium);
      }
    }

    // Sort requests
    switch (filters.sort) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'name':
        filtered.sort((a, b) => a.profile.name.localeCompare(b.profile.name));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
    }

    return filtered;
  };

  const filteredSentRequests = getFilteredRequests(sentRequests);
  const filteredReceivedRequests = getFilteredRequests(receivedRequests);

  const handleAcceptRequest = (requestId) => {
    setConfirmAction({
      type: 'accept',
      requestId,
      title: 'Accept Connection Request',
      message: 'Are you sure you want to accept this connection request? You will be able to communicate with this person.',
      confirmText: 'Accept'
    });
    setShowConfirmModal(true);
  };

  const handleDeclineRequest = (requestId) => {
    setConfirmAction({
      type: 'decline',
      requestId,
      title: 'Decline Connection Request',
      message: 'Are you sure you want to decline this connection request? This action cannot be undone.',
      confirmText: 'Decline'
    });
    setShowConfirmModal(true);
  };

  const handleConfirmAction = () => {
    if (confirmAction) {
      if (confirmAction.type === 'accept') {
        setReceivedRequests(prev => 
          prev.map(request => 
            request.id === confirmAction.requestId 
              ? { ...request, status: 'accepted' }
              : request
          )
        );
      } else if (confirmAction.type === 'decline') {
        setReceivedRequests(prev => 
          prev.map(request => 
            request.id === confirmAction.requestId 
              ? { ...request, status: 'declined' }
              : request
          )
        );
      }
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsApp = (phoneNumber) => {
    const message = encodeURIComponent('Hi! I found your profile on Matrimony Connect and would like to connect.');
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber.replace(/[^0-9]/g, '')}&text=${message}`, '_blank');
  };

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleEmptyStateAction = () => {
    if (activeTab === 'sent') {
      navigate('/dashboard-match-discovery');
    } else {
      navigate('/my-profile-management');
    }
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      sort: 'newest',
      membership: 'all'
    });
  };

  const currentRequests = activeTab === 'sent' ? filteredSentRequests : filteredReceivedRequests;
  const hasActiveFilters = filters.status !== 'all' || filters.sort !== 'newest' || filters.membership !== 'all';
  const isEmpty = currentRequests.length === 0;
  const emptyStateType = hasActiveFilters ? 'filtered' : activeTab;

  return (
    <div className="min-h-screen bg-background">
      <UserHeader />
      <TabNavigation />
      
      <main className="pt-32 md:pt-28 pb-20 md:pb-8 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
              Request Management
            </h1>
            <p className="text-muted-foreground font-body">
              Manage your connection requests and communicate with matches
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <RequestTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              sentCount={sentRequests.length}
              receivedCount={receivedRequests.filter(r => r.status === 'sent').length}
            />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <RequestFilters
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
          </div>

          {/* Content */}
          {isEmpty ? (
            <EmptyState
              type={emptyStateType}
              onActionClick={hasActiveFilters ? clearFilters : handleEmptyStateAction}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {currentRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  type={activeTab}
                  onAccept={handleAcceptRequest}
                  onDecline={handleDeclineRequest}
                  onCall={handleCall}
                  onWhatsApp={handleWhatsApp}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Profile Modal */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onCallClick={handleCall}
        onWhatsAppClick={handleWhatsApp}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmAction}
        title={confirmAction?.title}
        message={confirmAction?.message}
        confirmText={confirmAction?.confirmText}
        type={confirmAction?.type === 'decline' ? 'danger' : 'success'}
      />
    </div>
  );
};

export default RequestManagementHub;