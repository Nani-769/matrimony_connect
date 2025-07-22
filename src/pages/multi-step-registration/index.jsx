import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RelationshipSelector from './components/RelationshipSelector';
import ProgressIndicator from './components/ProgressIndicator';
import BasicDetailsForm from './components/BasicDetailsForm';
import AdvancedDetailsForm from './components/AdvancedDetailsForm';
import ProfilePictureUpload from './components/ProfilePictureUpload';
import ReviewAndSubmit from './components/ReviewAndSubmit';

const MultiStepRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRelationship, setSelectedRelationship] = useState('');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: 'Relationship', component: 'relationship' },
    { id: 2, title: 'Basic Details', component: 'basic' },
    { id: 3, title: 'Additional Info', component: 'advanced' },
    { id: 4, title: 'Profile Picture', component: 'picture' },
    { id: 5, title: 'Review', component: 'review' }
  ];

  const totalSteps = steps.length;

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('matrimony_registration_data');
    const savedStep = localStorage.getItem('matrimony_registration_step');
    const savedRelationship = localStorage.getItem('matrimony_registration_relationship');

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
    if (savedRelationship) {
      setSelectedRelationship(savedRelationship);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('matrimony_registration_data', JSON.stringify(formData));
    }
    if (currentStep > 1) {
      localStorage.setItem('matrimony_registration_step', currentStep.toString());
    }
    if (selectedRelationship) {
      localStorage.setItem('matrimony_registration_relationship', selectedRelationship);
    }
  }, [formData, currentStep, selectedRelationship]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!selectedRelationship) {
          newErrors.relationship = 'Please select who you are creating this profile for';
        }
        break;

      case 2:
        if (!formData.fullName?.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData.gender) {
          newErrors.gender = 'Gender is required';
        }
        if (!formData.mobile?.trim()) {
          newErrors.mobile = 'Mobile number is required';
        } else if (!/^[+]?[0-9]{10,15}$/.test(formData.mobile.replace(/\s/g, ''))) {
          newErrors.mobile = 'Please enter a valid mobile number';
        }
        if (!formData.dateOfBirth) {
          newErrors.dateOfBirth = 'Date of birth is required';
        } else {
          const birthDate = new Date(formData.dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18) {
            newErrors.dateOfBirth = 'Must be at least 18 years old';
          }
        }
        if (!formData.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.religion) {
          newErrors.religion = 'Religion is required';
        }
        if (!formData.caste) {
          newErrors.caste = 'Caste is required';
        }
        if (!formData.maritalStatus) {
          newErrors.maritalStatus = 'Marital status is required';
        }
        break;

      case 3:
        // Advanced details are optional, no validation required
        break;

      case 4:
        // Profile picture is optional, no validation required
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRelationshipSelect = (relationship) => {
    setSelectedRelationship(relationship);
    setErrors({});
  };

  const handleFormUpdate = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const registrationData = {
        ...formData,
        relationship: selectedRelationship,
        registrationDate: new Date().toISOString(),
        profileId: `MAT${Date.now()}`,
        status: 'active'
      };

      // Clear saved registration data
      localStorage.removeItem('matrimony_registration_data');
      localStorage.removeItem('matrimony_registration_step');
      localStorage.removeItem('matrimony_registration_relationship');

      // Save user session
      localStorage.setItem('matrimony_user_session', JSON.stringify({
        isLoggedIn: true,
        profileId: registrationData.profileId,
        name: registrationData.fullName,
        email: registrationData.email,
        loginTime: new Date().toISOString()
      }));

      // Navigate to dashboard
      navigate('/dashboard-match-discovery', { 
        state: { 
          message: 'Profile created successfully! Welcome to Matrimony Connect.',
          newUser: true 
        }
      });

    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RelationshipSelector
            selectedRelationship={selectedRelationship}
            onSelect={handleRelationshipSelect}
          />
        );

      case 2:
        return (
          <BasicDetailsForm
            formData={formData}
            onUpdate={handleFormUpdate}
            relationship={selectedRelationship}
            errors={errors}
          />
        );

      case 3:
        return (
          <AdvancedDetailsForm
            formData={formData}
            onUpdate={handleFormUpdate}
            relationship={selectedRelationship}
            errors={errors}
          />
        );

      case 4:
        return (
          <ProfilePictureUpload
            formData={formData}
            onUpdate={handleFormUpdate}
            relationship={selectedRelationship}
            errors={errors}
          />
        );

      case 5:
        return (
          <ReviewAndSubmit
            formData={formData}
            relationship={selectedRelationship}
            onEdit={handleEditStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold text-primary">
                Matrimony Connect
              </span>
            </div>

            <Button
              variant="ghost"
              onClick={() => navigate('/welcome-authentication')}
              iconName="ArrowLeft"
              iconPosition="left"
              size="sm"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          steps={steps}
        />

        {/* Step Content */}
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-elevation-1">
          {renderStepContent()}

          {/* Error Display */}
          {errors.submit && (
            <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2 text-error">
                <Icon name="AlertCircle" size={16} />
                <span className="text-sm font-caption">{errors.submit}</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep !== 5 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-border space-y-4 sm:space-y-0">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Previous
              </Button>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground font-caption">
                <Icon name="Save" size={14} />
                <span>Progress saved automatically</span>
              </div>

              <Button
                variant="default"
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedRelationship}
                iconName="ChevronRight"
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                {currentStep === totalSteps - 1 ? 'Review' : 'Next'}
              </Button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-muted/30 rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="HelpCircle" size={16} />
              <span className="text-sm font-caption">
                Need help? Contact support at{' '}
                <a href="mailto:support@matrimonyconnect.com" className="text-primary hover:underline">
                  support@matrimonyconnect.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MultiStepRegistration;