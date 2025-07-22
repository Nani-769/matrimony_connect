import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesForm = ({ formData, onFieldChange, errors }) => {
  const ageRangeOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 18).toString(),
    label: `${i + 18} years`
  }));

  const heightRangeOptions = Array.from({ length: 24 }, (_, i) => {
    const feet = Math.floor((i + 48) / 12);
    const inches = (i + 48) % 12;
    return {
      value: `${feet}'${inches}"`,
      label: `${feet}'${inches}"`
    };
  });

  const religionOptions = [
    { value: 'hindu', label: 'Hindu' },
    { value: 'muslim', label: 'Muslim' },
    { value: 'christian', label: 'Christian' },
    { value: 'sikh', label: 'Sikh' },
    { value: 'buddhist', label: 'Buddhist' },
    { value: 'jain', label: 'Jain' },
    { value: 'any', label: 'Any Religion' }
  ];

  const educationOptions = [
    { value: 'high_school', label: 'High School & Above' },
    { value: 'diploma', label: 'Diploma & Above' },
    { value: 'bachelors', label: "Bachelor\'s & Above" },
    { value: 'masters', label: "Master\'s & Above" },
    { value: 'phd', label: 'PhD' },
    { value: 'any', label: 'Any Education' }
  ];

  const incomeOptions = [
    { value: 'below_2', label: 'Below ₹2 Lakhs' },
    { value: '2_5', label: '₹2-5 Lakhs & Above' },
    { value: '5_10', label: '₹5-10 Lakhs & Above' },
    { value: '10_15', label: '₹10-15 Lakhs & Above' },
    { value: '15_25', label: '₹15-25 Lakhs & Above' },
    { value: '25_50', label: '₹25-50 Lakhs & Above' },
    { value: 'above_50', label: 'Above ₹50 Lakhs' },
    { value: 'any', label: 'Any Income' }
  ];

  const maritalStatusOptions = [
    { value: 'never_married', label: 'Never Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'any', label: 'Any Marital Status' }
  ];

  const handlePreferenceChange = (field, value) => {
    const currentPreferences = formData.preferences || {};
    onFieldChange('preferences', {
      ...currentPreferences,
      [field]: value
    });
  };

  const preferences = formData.preferences || {};

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold mb-6">Partner Preferences</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Minimum Age"
          options={ageRangeOptions}
          value={preferences.minAge || ''}
          onChange={(value) => handlePreferenceChange('minAge', value)}
          error={errors.minAge}
        />

        <Select
          label="Maximum Age"
          options={ageRangeOptions}
          value={preferences.maxAge || ''}
          onChange={(value) => handlePreferenceChange('maxAge', value)}
          error={errors.maxAge}
        />

        <Select
          label="Minimum Height"
          options={heightRangeOptions}
          value={preferences.minHeight || ''}
          onChange={(value) => handlePreferenceChange('minHeight', value)}
          error={errors.minHeight}
        />

        <Select
          label="Maximum Height"
          options={heightRangeOptions}
          value={preferences.maxHeight || ''}
          onChange={(value) => handlePreferenceChange('maxHeight', value)}
          error={errors.maxHeight}
        />

        <Select
          label="Preferred Religion"
          options={religionOptions}
          value={preferences.religion || ''}
          onChange={(value) => handlePreferenceChange('religion', value)}
          error={errors.religion}
          multiple
        />

        <Select
          label="Preferred Education"
          options={educationOptions}
          value={preferences.education || ''}
          onChange={(value) => handlePreferenceChange('education', value)}
          error={errors.education}
        />

        <Select
          label="Preferred Income"
          options={incomeOptions}
          value={preferences.income || ''}
          onChange={(value) => handlePreferenceChange('income', value)}
          error={errors.income}
        />

        <Select
          label="Marital Status"
          options={maritalStatusOptions}
          value={preferences.maritalStatus || ''}
          onChange={(value) => handlePreferenceChange('maritalStatus', value)}
          error={errors.maritalStatus}
          multiple
        />

        <Input
          label="Preferred Location"
          type="text"
          placeholder="Enter preferred locations (comma separated)"
          value={preferences.location || ''}
          onChange={(e) => handlePreferenceChange('location', e.target.value)}
          error={errors.location}
          className="md:col-span-2"
        />
      </div>

      {/* Additional Preferences */}
      <div className="mt-6 space-y-4">
        <h4 className="text-md font-heading font-medium">Additional Preferences</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Willing to relocate after marriage"
            checked={preferences.willingToRelocate || false}
            onChange={(e) => handlePreferenceChange('willingToRelocate', e.target.checked)}
          />

          <Checkbox
            label="Prefer working partner"
            checked={preferences.preferWorking || false}
            onChange={(e) => handlePreferenceChange('preferWorking', e.target.checked)}
          />

          <Checkbox
            label="Manglik acceptable"
            checked={preferences.manglikAcceptable || false}
            onChange={(e) => handlePreferenceChange('manglikAcceptable', e.target.checked)}
          />

          <Checkbox
            label="Horoscope matching required"
            checked={preferences.horoscopeMatching || false}
            onChange={(e) => handlePreferenceChange('horoscopeMatching', e.target.checked)}
          />
        </div>
      </div>

      {/* Partner Expectations */}
      <div className="mt-6">
        <label className="block text-sm font-caption font-medium text-foreground mb-2">
          What are you looking for in a life partner?
        </label>
        <textarea
          placeholder="Describe your expectations, values you're looking for, lifestyle preferences, and any other important qualities..."
          value={preferences.expectations || ''}
          onChange={(e) => handlePreferenceChange('expectations', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body"
          maxLength={400}
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs font-caption text-muted-foreground">
            Share what qualities and values matter most to you
          </span>
          <span className="text-xs font-caption text-muted-foreground">
            {(preferences.expectations || '').length}/400
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;