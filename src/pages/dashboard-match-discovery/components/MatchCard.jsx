import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MatchCard = ({ 
  profile, 
  onViewProfile, 
  onSendRequest, 
  requestStatus = null,
  className = '' 
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(requestStatus === 'sent');

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(profile);
    }
  };

  const handleSendRequest = async () => {
    if (onSendRequest && !requestSent) {
      setRequestSent(true);
      await onSendRequest(profile.id);
    }
  };

  const getCompatibilityScore = () => {
    // Mock compatibility calculation based on religion, caste, etc.
    let score = 0;
    if (profile.religion === 'Hindu') score += 30;
    if (profile.caste) score += 25;
    if (profile.education) score += 20;
    if (profile.profession) score += 15;
    if (profile.location) score += 10;
    return Math.min(score, 100);
  };

  const getStatusBadge = () => {
    if (requestSent || requestStatus === 'sent') {
      return (
        <div className="absolute top-3 right-3 bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
          Request Sent
        </div>
      );
    }
    if (requestStatus === 'accepted') {
      return (
        <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
          Connected
        </div>
      );
    }
    if (requestStatus === 'rejected') {
      return (
        <div className="absolute top-3 right-3 bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
          Not Interested
        </div>
      );
    }
    return null;
  };

  const compatibilityScore = getCompatibilityScore();

  return (
    <div className={`
      bg-card border border-border rounded-xl overflow-hidden
      hover:shadow-elevation-2 transition-all duration-300
      group cursor-pointer
      ${className}
    `}>
      {/* Profile Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <Image
          src={profile.avatar}
          alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setIsImageLoading(false)}
          onClick={handleViewProfile}
        />
        
        {/* Premium Badge */}
        {profile.isPremium && (
          <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-caption font-medium flex items-center space-x-1">
            <Icon name="Crown" size={12} />
            <span>Premium</span>
          </div>
        )}

        {/* Verification Badge */}
        {profile.isVerified && (
          <div className="absolute top-3 left-3 bg-success text-success-foreground p-1 rounded-full">
            <Icon name="CheckCircle" size={14} />
          </div>
        )}

        {/* Status Badge */}
        {getStatusBadge()}

        {/* Online Status */}
        {profile.isOnline && (
          <div className="absolute bottom-3 left-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-caption font-medium flex items-center space-x-1">
            <div className="w-2 h-2 bg-success-foreground rounded-full animate-pulse" />
            <span>Online</span>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-4 space-y-3">
        {/* Name and Age */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg truncate pr-2">
            {profile.name}
          </h3>
          <span className="text-muted-foreground font-body text-sm whitespace-nowrap">
            {profile.age} yrs
          </span>
        </div>

        {/* Basic Info */}
        <div className="space-y-1 text-sm text-muted-foreground font-body">
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={14} />
            <span className="truncate">{profile.profession}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} />
            <span className="truncate">{profile.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="GraduationCap" size={14} />
            <span className="truncate">{profile.education}</span>
          </div>
        </div>

        {/* Religion and Caste */}
        <div className="flex items-center justify-between text-xs font-caption">
          <span className="bg-muted px-2 py-1 rounded-full">
            {profile.religion}
          </span>
          {profile.caste && (
            <span className="bg-muted px-2 py-1 rounded-full">
              {profile.caste}
            </span>
          )}
        </div>

        {/* Compatibility Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={14} className="text-primary" />
            <span className="text-sm font-body">
              {compatibilityScore}% Match
            </span>
          </div>
          <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${compatibilityScore}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewProfile}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Profile
          </Button>
          
          {!requestSent && requestStatus !== 'sent' && requestStatus !== 'accepted' && (
            <Button
              variant="default"
              size="sm"
              onClick={handleSendRequest}
              iconName="Heart"
              iconPosition="left"
              className="flex-1"
            >
              Send Request
            </Button>
          )}

          {(requestSent || requestStatus === 'sent') && (
            <Button
              variant="secondary"
              size="sm"
              disabled
              iconName="Clock"
              iconPosition="left"
              className="flex-1"
            >
              Request Sent
            </Button>
          )}

          {requestStatus === 'accepted' && (
            <Button
              variant="success"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1"
              onClick={() => window.open(`https://api.whatsapp.com/send?phone=${profile.phone}`, '_blank')}
            >
              Chat
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;