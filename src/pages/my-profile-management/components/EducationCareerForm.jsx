import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EducationCareerForm = ({ formData, onFieldChange, errors }) => {
  const educationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelors', label: "Bachelor\'s Degree" },
    { value: 'masters', label: "Master\'s Degree" },
    { value: 'phd', label: 'PhD' },
    { value: 'professional', label: 'Professional Degree' },
    { value: 'other', label: 'Other' }
  ];

  const employmentOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'self_employed', label: 'Self Employed' },
    { value: 'business', label: 'Business Owner' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'student', label: 'Student' },
    { value: 'retired', label: 'Retired' },
    { value: 'homemaker', label: 'Homemaker' }
  ];

  const incomeOptions = [
    { value: 'below_2', label: 'Below ₹2 Lakhs' },
    { value: '2_5', label: '₹2-5 Lakhs' },
    { value: '5_10', label: '₹5-10 Lakhs' },
    { value: '10_15', label: '₹10-15 Lakhs' },
    { value: '15_25', label: '₹15-25 Lakhs' },
    { value: '25_50', label: '₹25-50 Lakhs' },
    { value: 'above_50', label: 'Above ₹50 Lakhs' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold mb-6">Education & Career</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Highest Education"
          options={educationOptions}
          value={formData.education || ''}
          onChange={(value) => onFieldChange('education', value)}
          error={errors.education}
          required
        />

        <Input
          label="College/University"
          type="text"
          placeholder="Enter college or university name"
          value={formData.college || ''}
          onChange={(e) => onFieldChange('college', e.target.value)}
          error={errors.college}
        />

        <Select
          label="Employment Status"
          options={employmentOptions}
          value={formData.employment || ''}
          onChange={(value) => onFieldChange('employment', value)}
          error={errors.employment}
          required
        />

        <Input
          label="Occupation"
          type="text"
          placeholder="Enter your occupation"
          value={formData.occupation || ''}
          onChange={(e) => onFieldChange('occupation', e.target.value)}
          error={errors.occupation}
        />

        <Input
          label="Company Name"
          type="text"
          placeholder="Enter company name"
          value={formData.company || ''}
          onChange={(e) => onFieldChange('company', e.target.value)}
          error={errors.company}
        />

        <Input
          label="Work Location"
          type="text"
          placeholder="Enter work location"
          value={formData.workLocation || ''}
          onChange={(e) => onFieldChange('workLocation', e.target.value)}
          error={errors.workLocation}
        />

        <Select
          label="Annual Income"
          options={incomeOptions}
          value={formData.income || ''}
          onChange={(value) => onFieldChange('income', value)}
          error={errors.income}
        />

        <Input
          label="Work Experience"
          type="text"
          placeholder="e.g., 5 years"
          value={formData.experience || ''}
          onChange={(e) => onFieldChange('experience', e.target.value)}
          error={errors.experience}
        />
      </div>

      {/* About Section */}
      <div className="mt-6">
        <label className="block text-sm font-caption font-medium text-foreground mb-2">
          About Yourself
        </label>
        <textarea
          placeholder="Write a brief description about yourself, your interests, and what you're looking for in a life partner..."
          value={formData.about || ''}
          onChange={(e) => onFieldChange('about', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body"
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs font-caption text-muted-foreground">
            Tell others about your personality, hobbies, and expectations
          </span>
          <span className="text-xs font-caption text-muted-foreground">
            {(formData.about || '').length}/500
          </span>
        </div>
      </div>
    </div>
  );
};

export default EducationCareerForm;