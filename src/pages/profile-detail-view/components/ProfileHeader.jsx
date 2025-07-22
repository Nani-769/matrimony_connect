import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileHeader = ({ profile }) => {
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getCompatibilityScore = () => {
    // Mock compatibility calculation
    return Math.floor(Math.random() * 20) + 80; // 80-99%
  };

  return (
    <div className="space-y-4">
      {/* Name and Basic Info */}
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
          <h1 className="text-2xl md:text-3xl font-heading font-bold">
            {profile.name}
          </h1>
          {profile.isPremium && (
            <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
              <Icon name="Crown" size={16} />
            </div>
          )}
          {profile.isVerified && (
            <div className="bg-success text-success-foreground p-1 rounded-full">
              <Icon name="CheckCircle" size={16} />
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-muted-foreground font-body">
          <span>{calculateAge(profile.dateOfBirth)} years</span>
          <span>•</span>
          <span>{profile.height}</span>
          <span>•</span>
          <span>{profile.location}</span>
        </div>
      </div>

      {/* Professional Info */}
      <div className="text-center md:text-left">
        <p className="text-lg font-body font-medium mb-1">{profile.profession}</p>
        <p className="text-muted-foreground font-body">{profile.education}</p>
        {profile.company && (
          <p className="text-sm text-muted-foreground font-body mt-1">
            at {profile.company}
          </p>
        )}
      </div>

      {/* Compatibility Score */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-medium mb-1">Compatibility Score</h3>
            <p className="text-sm text-muted-foreground font-body">
              Based on preferences and profile match
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-heading font-bold text-success">
              {getCompatibilityScore()}%
            </div>
            <div className="flex items-center space-x-1 text-success">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < 4 ? 'fill-current' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-heading font-semibold">{profile.religion}</div>
          <div className="text-sm text-muted-foreground font-caption">Religion</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-heading font-semibold">{profile.caste}</div>
          <div className="text-sm text-muted-foreground font-caption">Caste</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-heading font-semibold">{profile.motherTongue}</div>
          <div className="text-sm text-muted-foreground font-caption">Language</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;