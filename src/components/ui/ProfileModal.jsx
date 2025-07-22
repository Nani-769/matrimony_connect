import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ProfileModal = ({ 
  profile, 
  isOpen, 
  onClose, 
  onRequestSend,
  onCallClick,
  onWhatsAppClick 
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      
      // Focus the modal for accessibility
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
      
      // Return focus to previous element
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

  const handleRequestSend = () => {
    if (onRequestSend) {
      onRequestSend(profile?.id);
    }
  };

  const handleCall = () => {
    if (onCallClick && profile?.phone) {
      onCallClick(profile.phone);
    }
  };

  const handleWhatsApp = () => {
    if (onWhatsAppClick && profile?.phone) {
      onWhatsAppClick(profile.phone);
    }
  };

  if (!isOpen || !profile) {
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
        className="relative w-full max-w-2xl max-h-[90vh] bg-background rounded-xl shadow-elevation-3 overflow-hidden animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold">Profile Details</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Profile Header */}
          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-border">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-heading font-semibold mb-2">{profile.name}</h3>
                <div className="space-y-1 text-muted-foreground font-body">
                  <p>{profile.age} years • {profile.height}</p>
                  <p>{profile.profession}</p>
                  <p>{profile.location}</p>
                  <p>{profile.education}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-6">
            {/* About */}
            {profile.about && (
              <div>
                <h4 className="text-lg font-heading font-medium mb-3">About</h4>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {profile.about}
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
                    <p className="font-body">{profile.religion || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Caste</span>
                    <p className="font-body">{profile.caste || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Mother Tongue</span>
                    <p className="font-body">{profile.motherTongue || 'Not specified'}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Marital Status</span>
                    <p className="font-body">{profile.maritalStatus || 'Never Married'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Diet</span>
                    <p className="font-body">{profile.diet || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-caption text-muted-foreground">Smoking</span>
                    <p className="font-body">{profile.smoking || 'No'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Details */}
            {profile.family && (
              <div>
                <h4 className="text-lg font-heading font-medium mb-3">Family Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-caption text-muted-foreground">Father's Occupation</span>
                      <p className="font-body">{profile.family.fatherOccupation || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-caption text-muted-foreground">Mother's Occupation</span>
                      <p className="font-body">{profile.family.motherOccupation || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-caption text-muted-foreground">Siblings</span>
                      <p className="font-body">{profile.family.siblings || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-caption text-muted-foreground">Family Type</span>
                      <p className="font-body">{profile.family.type || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Communication Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCall}
                iconName="Phone"
                iconPosition="left"
                className="text-success border-success hover:bg-success hover:text-success-foreground"
              >
                Call
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleWhatsApp}
                iconName="MessageCircle"
                iconPosition="left"
                className="text-success border-success hover:bg-success hover:text-success-foreground"
              >
                WhatsApp
              </Button>
            </div>

            {/* Primary Action */}
            <Button
              variant="default"
              onClick={handleRequestSend}
              iconName="Heart"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Send Interest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProfileModal;