import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePreviewModal = ({ isOpen, onClose, profileData }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
      
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!isOpen || !profileData) {
    return null;
  }

  const modalContent = (
    <div 
      className="fixed inset-0 z-200 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-xl shadow-elevation-3 overflow-hidden animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold">Profile Preview</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-caption text-muted-foreground">
              How others see your profile
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Profile Header */}
          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-border">
                {profileData.profilePhoto ? (
                  <Image
                    src={profileData.profilePhoto}
                    alt={profileData.fullName || 'Profile photo'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Icon name="User" size={48} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-heading font-semibold mb-2">
                  {profileData.fullName || 'Your Name'}
                </h3>
                <div className="space-y-1 text-muted-foreground font-body">
                  <p>{calculateAge(profileData.dateOfBirth)} years • {profileData.height || 'Height not specified'}</p>
                  <p>{profileData.occupation || 'Occupation not specified'}</p>
                  <p>{profileData.workLocation || profileData.familyLocation || 'Location not specified'}</p>
                  <p>{profileData.education || 'Education not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-6">
            {/* About */}
            {profileData.about && (
              <div>
                <h4 className="text-lg font-heading font-medium mb-3">About</h4>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {profileData.about}
                </p>
              </div>
            )}

            {/* Personal Details */}
            <div>
              <h4 className="text-lg font-heading font-medium mb-3">Personal Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Religion</span>
                    <p className="font-body">{profileData.religion || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Caste</span>
                    <p className="font-body">{profileData.caste || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Mother Tongue</span>
                    <p className="font-body">{profileData.motherTongue || 'Not specified'}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Marital Status</span>
                    <p className="font-body">{profileData.maritalStatus || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Education</span>
                    <p className="font-body">{profileData.education || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Occupation</span>
                    <p className="font-body">{profileData.occupation || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Details */}
            {(profileData.familyType || profileData.fatherName || profileData.motherName) && (
              <div>
                <h4 className="text-lg font-heading font-medium mb-3">Family Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {profileData.fatherName && (
                      <div>
                        <span className="text-sm font-caption text-muted-foreground">Father's Name</span>
                        <p className="font-body">{profileData.fatherName}</p>
                      </div>
                    )}
                    {profileData.motherName && (
                      <div>
                        <span className="text-sm font-caption text-muted-foreground">Mother's Name</span>
                        <p className="font-body">{profileData.motherName}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {profileData.familyType && (
                      <div>
                        <span className="text-sm font-caption text-muted-foreground">Family Type</span>
                        <p className="font-body">{profileData.familyType}</p>
                      </div>
                    )}
                    {(profileData.brothers || profileData.sisters) && (
                      <div>
                        <span className="text-sm font-caption text-muted-foreground">Siblings</span>
                        <p className="font-body">
                          {profileData.brothers || 0} Brothers, {profileData.sisters || 0} Sisters
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {profileData.familyAbout && (
                  <div className="mt-4">
                    <span className="text-sm font-caption text-muted-foreground">About Family</span>
                    <p className="font-body mt-1">{profileData.familyAbout}</p>
                  </div>
                )}
              </div>
            )}

            {/* Partner Preferences */}
            {profileData.preferences && (
              <div>
                <h4 className="text-lg font-heading font-medium mb-3">Partner Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {(profileData.preferences.minAge || profileData.preferences.maxAge) && (
                      <div>
                        <span className="text-sm font-caption text-muted-foreground">Age Range</span>
                        <p className="font-body">
                          {profileData.preferences.minAge || '18'} - {profileData.preferences.maxAge || '50'} years
                        </p>
                      </div>
                    )}
                    {profileData.preferences.religion && (
                      <div>
                        <span className="text-sm font-caption text-muted-foreground">Religion</span>
                        <p className="font-body">{profileData.preferences.religion}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {(profileData.preferences.minHeight || profileData.preferences.maxHeight) && (
                      <div>
                        <span className="text-sm font-caption text-muted-foreground">Height Range</span>
                        <p className="font-body">
                          {profileData.preferences.minHeight || "4'0\""} - {profileData.preferences.maxHeight || "7'0\""}
                        </p>
                      </div>
                    )}
                    {profileData.preferences.education && (
                      <div>
                        <span className="text-sm font-caption text-muted-foreground">Education</span>
                        <p className="font-body">{profileData.preferences.education}</p>
                      </div>
                    )}
                  </div>
                </div>
                {profileData.preferences.expectations && (
                  <div className="mt-4">
                    <span className="text-sm font-caption text-muted-foreground">Partner Expectations</span>
                    <p className="font-body mt-1">{profileData.preferences.expectations}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-center">
            <Button
              variant="default"
              onClick={onClose}
              iconName="Edit"
              iconPosition="left"
            >
              Continue Editing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProfilePreviewModal;