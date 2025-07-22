import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewAndSubmit = ({ formData, relationship, onEdit, onSubmit, isSubmitting }) => {
  const getDisplayValue = (value, fallback = 'Not provided') => {
    return value || fallback;
  };

  const getRelationshipText = () => {
    const relationshipMap = {
      'myself': 'Yourself',
      'daughter': 'Your Daughter',
      'son': 'Your Son',
      'sister': 'Your Sister',
      'brother': 'Your Brother',
      'friend': 'Your Friend',
      'neighbor': 'Your Neighbor',
      'relative': 'Your Relative'
    };
    return relationshipMap[relationship] || 'Profile';
  };

  const formatHeight = (height) => {
    if (!height) return 'Not provided';
    const heightMap = {
      '4_6': '4\'6" (137 cm)',
      '4_7': '4\'7" (140 cm)',
      '4_8': '4\'8" (142 cm)',
      '4_9': '4\'9" (145 cm)',
      '4_10': '4\'10" (147 cm)',
      '4_11': '4\'11" (150 cm)',
      '5_0': '5\'0" (152 cm)',
      '5_1': '5\'1" (155 cm)',
      '5_2': '5\'2" (157 cm)',
      '5_3': '5\'3" (160 cm)',
      '5_4': '5\'4" (163 cm)',
      '5_5': '5\'5" (165 cm)',
      '5_6': '5\'6" (168 cm)',
      '5_7': '5\'7" (170 cm)',
      '5_8': '5\'8" (173 cm)',
      '5_9': '5\'9" (175 cm)',
      '5_10': '5\'10" (178 cm)',
      '5_11': '5\'11" (180 cm)',
      '6_0': '6\'0" (183 cm)',
      '6_1': '6\'1" (185 cm)',
      '6_2': '6\'2" (188 cm)',
      '6_3': '6\'3" (191 cm)',
      '6_4': '6\'4" (193 cm)'
    };
    return heightMap[height] || height;
  };

  const formatIncome = (income) => {
    if (!income) return 'Not provided';
    const incomeMap = {
      'below_2': 'Below ₹2 Lakhs',
      '2_5': '₹2-5 Lakhs',
      '5_10': '₹5-10 Lakhs',
      '10_15': '₹10-15 Lakhs',
      '15_25': '₹15-25 Lakhs',
      '25_50': '₹25-50 Lakhs',
      '50_75': '₹50-75 Lakhs',
      '75_100': '₹75 Lakhs - 1 Crore',
      'above_100': 'Above ₹1 Crore',
      'prefer_not_to_say': 'Prefer not to say'
    };
    return incomeMap[income] || income;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const capitalizeFirst = (str) => {
    if (!str) return 'Not provided';
    return str.charAt(0).toUpperCase() + str.slice(1).replace('_', ' ');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Review Profile Details
        </h2>
        <p className="text-muted-foreground font-body">
          Please review all information for {getRelationshipText()} before submitting
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-card rounded-xl p-6 border border-border mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-border bg-muted flex items-center justify-center">
              {formData.profilePicture ? (
                <Image
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={48} className="text-muted-foreground" />
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-heading font-semibold mb-2">
                {getDisplayValue(formData.fullName)}
              </h3>
              <div className="space-y-1 text-muted-foreground font-body">
                <p>{capitalizeFirst(formData.gender)} • {formatDate(formData.dateOfBirth)}</p>
                <p>{getDisplayValue(formData.mobile)}</p>
                <p>{getDisplayValue(formData.email)}</p>
                <p>{capitalizeFirst(formData.religion)} • {capitalizeFirst(formData.caste)}</p>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(1)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit Basic Details
            </Button>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-heading font-medium">Personal Details</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(2)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Height:</span>
                <span className="font-body">{formatHeight(formData.height)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Marital Status:</span>
                <span className="font-body">{capitalizeFirst(formData.maritalStatus)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Education:</span>
                <span className="font-body">{capitalizeFirst(formData.education)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Employment:</span>
                <span className="font-body">{capitalizeFirst(formData.employment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Income:</span>
                <span className="font-body">{formatIncome(formData.income)}</span>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-heading font-medium">Additional Details</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(2)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Gothram:</span>
                <span className="font-body">{getDisplayValue(formData.gothram)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Sub Caste:</span>
                <span className="font-body">{getDisplayValue(formData.subCaste)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Occupation:</span>
                <span className="font-body">{getDisplayValue(formData.occupation)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Company:</span>
                <span className="font-body">{getDisplayValue(formData.company)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-caption">Location:</span>
                <span className="font-body">{getDisplayValue(formData.location)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        {formData.about && (
          <div className="bg-card rounded-xl p-6 border border-border mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-heading font-medium">About</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(2)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed">
              {formData.about}
            </p>
          </div>
        )}

        {/* Profile Picture Section */}
        <div className="bg-card rounded-xl p-6 border border-border mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-heading font-medium">Profile Picture</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(3)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
          <div className="text-center">
            {formData.profilePicture ? (
              <div className="inline-block">
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-success font-caption mt-2">
                  <Icon name="Check" size={14} className="inline mr-1" />
                  Picture uploaded
                </p>
              </div>
            ) : (
              <div className="text-muted-foreground">
                <Icon name="Camera" size={24} className="mx-auto mb-2" />
                <p className="text-sm font-caption">No picture uploaded</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Section */}
        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 mt-8">
          <div className="text-center space-y-4">
            <div>
              <h4 className="text-lg font-heading font-medium text-foreground mb-2">
                Ready to Create Profile?
              </h4>
              <p className="text-muted-foreground font-body">
                By submitting, you agree to our Terms of Service and Privacy Policy.
                You can edit these details anytime from your profile page.
              </p>
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={onSubmit}
              loading={isSubmitting}
              iconName="Check"
              iconPosition="left"
              className="w-full sm:w-auto px-8"
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmit;