import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserHeader from '../../components/ui/UserHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import ProfileCompletionIndicator from './components/ProfileCompletionIndicator';
import BasicDetailsForm from './components/BasicDetailsForm';
import EducationCareerForm from './components/EducationCareerForm';
import FamilyDetailsForm from './components/FamilyDetailsForm';
import PreferencesForm from './components/PreferencesForm';
import ProfilePreviewModal from './components/ProfilePreviewModal';

const MyProfileManagement = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock profile data - in real app, this would come from Supabase
  const [profileData, setProfileData] = useState({
    fullName: "Priya Sharma",
    gender: "female",
    dateOfBirth: "1995-08-15",
    mobile: "+91 98765 43210",
    email: "priya.sharma@email.com",
    maritalStatus: "never_married",
    height: "5\'4\"",
    religion: "hindu",
    caste: "brahmin",
    subCaste: "Iyer",
    gothram: "Bharadwaja",
    motherTongue: "Tamil",
    education: "masters",
    college: "Anna University",
    employment: "employed",
    occupation: "Software Engineer",
    company: "Tech Solutions Pvt Ltd",
    workLocation: "Chennai",
    income: "10_15",
    experience: "5 years",
    about: `I am a software engineer with a passion for technology and innovation. I enjoy reading, traveling, and spending time with family. I believe in maintaining a balance between personal and professional life and am looking for a life partner who shares similar values and interests.`,
    familyType: "nuclear",
    familyStatus: "middle_class",
    fatherName: "Rajesh Sharma",
    fatherOccupation: "government",
    motherName: "Lakshmi Sharma",
    motherOccupation: "homemaker",
    brothers: "1",
    sisters: "0",
    brothersMarried: "0",
    sistersMarried: "0",
    familyLocation: "Chennai",
    familyAbout: "We are a close-knit family with traditional values and modern outlook. We believe in education, hard work, and maintaining strong family bonds.",
    preferences: {
      minAge: "26",
      maxAge: "32",
      minHeight: "5\'6\"",
      maxHeight: "6\'2\"",
      religion: "hindu",
      education: "bachelors",
      income: "10_15",
      maritalStatus: "never_married",
      location: "Chennai, Bangalore, Hyderabad",
      willingToRelocate: true,
      preferWorking: false,
      manglikAcceptable: true,
      horoscopeMatching: true,
      expectations: `I am looking for a life partner who is understanding, caring, and family-oriented. Someone who respects traditions while being open to modern ideas. Professional stability and shared values are important to me.`
    },
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  });

  // Calculate profile completion
  const calculateCompletion = () => {
    const requiredFields = [
      'fullName', 'gender', 'dateOfBirth', 'mobile', 'email', 
      'maritalStatus', 'religion', 'education', 'occupation'
    ];
    
    const optionalFields = [
      'height', 'caste', 'subCaste', 'gothram', 'motherTongue',
      'college', 'company', 'workLocation', 'income', 'about',
      'familyType', 'fatherName', 'motherName', 'profilePhoto'
    ];

    const allFields = [...requiredFields, ...optionalFields];
    const completedFields = allFields.filter(field => 
      profileData[field] && profileData[field].toString().trim() !== ''
    ).length;

    const missingFields = optionalFields.filter(field => 
      !profileData[field] || profileData[field].toString().trim() === ''
    ).map(field => {
      const fieldLabels = {
        height: 'Height',
        caste: 'Caste',
        subCaste: 'Sub Caste',
        gothram: 'Gothram',
        motherTongue: 'Mother Tongue',
        college: 'College/University',
        company: 'Company Name',
        workLocation: 'Work Location',
        income: 'Annual Income',
        about: 'About Yourself',
        familyType: 'Family Type',
        fatherName: "Father\'s Name",
        motherName: "Mother\'s Name",
        profilePhoto: 'Profile Photo'
      };
      return fieldLabels[field] || field;
    });

    return {
      percentage: Math.round((completedFields / allFields.length) * 100),
      completedFields,
      totalFields: allFields.length,
      missingFields
    };
  };

  const completionData = calculateCompletion();

  const sections = [
    { id: 'basic', label: 'Basic Details', icon: 'User' },
    { id: 'education', label: 'Education & Career', icon: 'GraduationCap' },
    { id: 'family', label: 'Family Details', icon: 'Users' },
    { id: 'preferences', label: 'Partner Preferences', icon: 'Heart' }
  ];

  const handleFieldChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handlePhotoUpdate = (photoUrl) => {
    handleFieldChange('profilePhoto', photoUrl);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!profileData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!profileData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!profileData.mobile?.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setHasUnsavedChanges(false);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-20 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-elevation-2 z-110 animate-slide-in-right';
      successMessage.textContent = 'Profile updated successfully!';
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-20 right-4 bg-error text-error-foreground px-4 py-2 rounded-lg shadow-elevation-2 z-110 animate-slide-in-right';
      errorMessage.textContent = 'Failed to update profile. Please try again.';
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'basic':
        return (
          <BasicDetailsForm
            formData={profileData}
            onFieldChange={handleFieldChange}
            errors={errors}
          />
        );
      case 'education':
        return (
          <EducationCareerForm
            formData={profileData}
            onFieldChange={handleFieldChange}
            errors={errors}
          />
        );
      case 'family':
        return (
          <FamilyDetailsForm
            formData={profileData}
            onFieldChange={handleFieldChange}
            errors={errors}
          />
        );
      case 'preferences':
        return (
          <PreferencesForm
            formData={profileData}
            onFieldChange={handleFieldChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleSave();
      }, 30000); // Auto-save after 30 seconds of inactivity

      return () => clearTimeout(autoSaveTimer);
    }
  }, [hasUnsavedChanges, profileData]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div className="min-h-screen bg-background">
      <UserHeader />
      <TabNavigation />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-30 pb-20 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard-match-discovery')}
                className="md:hidden"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-heading font-bold">My Profile</h1>
            </div>
            <p className="text-muted-foreground font-body">
              Manage your matrimonial profile and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 space-y-4">
                {/* Profile Photo Upload */}
                <ProfilePhotoUpload
                  currentPhoto={profileData.profilePhoto}
                  onPhotoUpdate={handlePhotoUpdate}
                />

                {/* Profile Completion */}
                <ProfileCompletionIndicator completionData={completionData} />

                {/* Section Navigation */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <nav className="space-y-1 p-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth ${
                          activeSection === section.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={section.icon} size={18} />
                        <span className="font-body text-sm">{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Section Tabs */}
              <div className="lg:hidden mb-6">
                <div className="bg-card rounded-xl border border-border p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-body transition-smooth ${
                          activeSection === section.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={section.icon} size={16} />
                        <span className="hidden sm:inline">{section.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Profile Photo & Completion */}
              <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <ProfilePhotoUpload
                  currentPhoto={profileData.profilePhoto}
                  onPhotoUpdate={handlePhotoUpdate}
                />
                <ProfileCompletionIndicator completionData={completionData} />
              </div>

              {/* Form Section */}
              <div className="space-y-6">
                {renderActiveSection()}

                {/* Action Buttons */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      {hasUnsavedChanges && (
                        <div className="flex items-center space-x-2 text-warning">
                          <Icon name="AlertCircle" size={16} />
                          <span className="text-sm font-caption">Unsaved changes</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        onClick={handlePreview}
                        iconName="Eye"
                        iconPosition="left"
                        className="flex-1 sm:flex-none"
                      >
                        Preview
                      </Button>
                      
                      <Button
                        variant="default"
                        onClick={handleSave}
                        loading={isSaving}
                        iconName="Save"
                        iconPosition="left"
                        className="flex-1 sm:flex-none"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Profile Preview Modal */}
      <ProfilePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        profileData={profileData}
      />
    </div>
  );
};

export default MyProfileManagement;