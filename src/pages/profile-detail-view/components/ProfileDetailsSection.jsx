import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProfileDetailsSection = ({ profile }) => {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    family: false,
    education: false,
    lifestyle: false,
    preferences: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const DetailCard = ({ title, icon, sectionKey, children }) => {
    const isExpanded = expandedSections[sectionKey];
    
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 hover:bg-muted transition-smooth"
        >
          <div className="flex items-center space-x-3">
            <Icon name={icon} size={20} className="text-primary" />
            <h3 className="font-heading font-medium text-left">{title}</h3>
          </div>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-border">
            {children}
          </div>
        )}
      </div>
    );
  };

  const DetailRow = ({ label, value }) => {
    if (!value) return null;
    
    return (
      <div className="flex justify-between py-2 border-b border-border last:border-b-0">
        <span className="text-muted-foreground font-caption">{label}</span>
        <span className="font-body text-right">{value}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* About Section */}
      {profile.about && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-medium mb-3 flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-primary" />
            <span>About</span>
          </h3>
          <p className="text-muted-foreground font-body leading-relaxed">
            {profile.about}
          </p>
        </div>
      )}

      {/* Personal Details */}
      <DetailCard title="Personal Details" icon="User" sectionKey="personal">
        <div className="space-y-0 mt-3">
          <DetailRow label="Date of Birth" value={new Date(profile.dateOfBirth).toLocaleDateString('en-GB')} />
          <DetailRow label="Height" value={profile.height} />
          <DetailRow label="Weight" value={profile.weight} />
          <DetailRow label="Body Type" value={profile.bodyType} />
          <DetailRow label="Complexion" value={profile.complexion} />
          <DetailRow label="Marital Status" value={profile.maritalStatus} />
          <DetailRow label="Physical Status" value={profile.physicalStatus} />
          <DetailRow label="Gothram" value={profile.gothram} />
          <DetailRow label="Manglik" value={profile.manglik} />
          <DetailRow label="Star" value={profile.star} />
          <DetailRow label="Raasi" value={profile.raasi} />
        </div>
      </DetailCard>

      {/* Family Details */}
      <DetailCard title="Family Details" icon="Users" sectionKey="family">
        <div className="space-y-0 mt-3">
          <DetailRow label="Family Type" value={profile.family?.type} />
          <DetailRow label="Family Status" value={profile.family?.status} />
          <DetailRow label="Father's Name" value={profile.family?.fatherName} />
          <DetailRow label="Father's Occupation" value={profile.family?.fatherOccupation} />
          <DetailRow label="Mother's Name" value={profile.family?.motherName} />
          <DetailRow label="Mother's Occupation" value={profile.family?.motherOccupation} />
          <DetailRow label="Brothers" value={profile.family?.brothers} />
          <DetailRow label="Sisters" value={profile.family?.sisters} />
          <DetailRow label="Family Location" value={profile.family?.location} />
          <DetailRow label="About Family" value={profile.family?.about} />
        </div>
      </DetailCard>

      {/* Education & Career */}
      <DetailCard title="Education & Career" icon="GraduationCap" sectionKey="education">
        <div className="space-y-0 mt-3">
          <DetailRow label="Highest Education" value={profile.education} />
          <DetailRow label="Education Details" value={profile.educationDetails} />
          <DetailRow label="Profession" value={profile.profession} />
          <DetailRow label="Profession Details" value={profile.professionDetails} />
          <DetailRow label="Company" value={profile.company} />
          <DetailRow label="Annual Income" value={profile.income} />
          <DetailRow label="Work Location" value={profile.workLocation} />
        </div>
      </DetailCard>

      {/* Lifestyle */}
      <DetailCard title="Lifestyle" icon="Coffee" sectionKey="lifestyle">
        <div className="space-y-0 mt-3">
          <DetailRow label="Diet" value={profile.diet} />
          <DetailRow label="Smoking" value={profile.smoking} />
          <DetailRow label="Drinking" value={profile.drinking} />
          <DetailRow label="Hobbies" value={profile.hobbies} />
          <DetailRow label="Interests" value={profile.interests} />
          <DetailRow label="Music" value={profile.music} />
          <DetailRow label="Movies" value={profile.movies} />
          <DetailRow label="Sports" value={profile.sports} />
          <DetailRow label="Books" value={profile.books} />
        </div>
      </DetailCard>

      {/* Partner Preferences */}
      <DetailCard title="Partner Preferences" icon="Heart" sectionKey="preferences">
        <div className="space-y-0 mt-3">
          <DetailRow label="Age Range" value={profile.preferences?.ageRange} />
          <DetailRow label="Height Range" value={profile.preferences?.heightRange} />
          <DetailRow label="Marital Status" value={profile.preferences?.maritalStatus} />
          <DetailRow label="Religion" value={profile.preferences?.religion} />
          <DetailRow label="Caste" value={profile.preferences?.caste} />
          <DetailRow label="Mother Tongue" value={profile.preferences?.motherTongue} />
          <DetailRow label="Education" value={profile.preferences?.education} />
          <DetailRow label="Profession" value={profile.preferences?.profession} />
          <DetailRow label="Income Range" value={profile.preferences?.incomeRange} />
          <DetailRow label="Location" value={profile.preferences?.location} />
          <DetailRow label="Diet" value={profile.preferences?.diet} />
          <DetailRow label="Smoking" value={profile.preferences?.smoking} />
          <DetailRow label="Drinking" value={profile.preferences?.drinking} />
        </div>
      </DetailCard>
    </div>
  );
};

export default ProfileDetailsSection;