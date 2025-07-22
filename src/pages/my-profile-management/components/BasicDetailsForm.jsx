import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicDetailsForm = ({ formData, onFieldChange, errors }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const maritalStatusOptions = [
    { value: 'never_married', label: 'Never Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' }
  ];

  const religionOptions = [
    { value: 'hindu', label: 'Hindu' },
    { value: 'muslim', label: 'Muslim' },
    { value: 'christian', label: 'Christian' },
    { value: 'sikh', label: 'Sikh' },
    { value: 'buddhist', label: 'Buddhist' },
    { value: 'jain', label: 'Jain' },
    { value: 'other', label: 'Other' }
  ];

  const casteOptions = [
    { value: 'brahmin', label: 'Brahmin' },
    { value: 'kshatriya', label: 'Kshatriya' },
    { value: 'vaishya', label: 'Vaishya' },
    { value: 'shudra', label: 'Shudra' },
    { value: 'other', label: 'Other' },
    { value: 'no_caste', label: 'No Caste' }
  ];

  const heightOptions = Array.from({ length: 24 }, (_, i) => {
    const feet = Math.floor((i + 48) / 12);
    const inches = (i + 48) % 12;
    const heightInCm = Math.round((i + 48) * 2.54);
    return {
      value: `${feet}'${inches}"`,
      label: `${feet}'${inches}" (${heightInCm} cm)`
    };
  });

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold mb-6">Basic Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName || ''}
          onChange={(e) => onFieldChange('fullName', e.target.value)}
          error={errors.fullName}
          required
          className="md:col-span-2"
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData.gender || ''}
          onChange={(value) => onFieldChange('gender', value)}
          error={errors.gender}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth || ''}
          onChange={(e) => onFieldChange('dateOfBirth', e.target.value)}
          error={errors.dateOfBirth}
          required
        />

        <Input
          label="Mobile Number"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.mobile || ''}
          onChange={(e) => onFieldChange('mobile', e.target.value)}
          error={errors.mobile}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email || ''}
          onChange={(e) => onFieldChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Select
          label="Marital Status"
          options={maritalStatusOptions}
          value={formData.maritalStatus || ''}
          onChange={(value) => onFieldChange('maritalStatus', value)}
          error={errors.maritalStatus}
          required
        />

        <Select
          label="Height"
          options={heightOptions}
          value={formData.height || ''}
          onChange={(value) => onFieldChange('height', value)}
          error={errors.height}
          searchable
        />

        <Select
          label="Religion"
          options={religionOptions}
          value={formData.religion || ''}
          onChange={(value) => onFieldChange('religion', value)}
          error={errors.religion}
          required
        />

        <Select
          label="Caste"
          options={casteOptions}
          value={formData.caste || ''}
          onChange={(value) => onFieldChange('caste', value)}
          error={errors.caste}
        />

        <Input
          label="Sub Caste"
          type="text"
          placeholder="Enter sub caste (optional)"
          value={formData.subCaste || ''}
          onChange={(e) => onFieldChange('subCaste', e.target.value)}
          error={errors.subCaste}
        />

        <Input
          label="Gothram"
          type="text"
          placeholder="Enter gothram (optional)"
          value={formData.gothram || ''}
          onChange={(e) => onFieldChange('gothram', e.target.value)}
          error={errors.gothram}
        />

        <Input
          label="Mother Tongue"
          type="text"
          placeholder="Enter mother tongue"
          value={formData.motherTongue || ''}
          onChange={(e) => onFieldChange('motherTongue', e.target.value)}
          error={errors.motherTongue}
        />
      </div>
    </div>
  );
};

export default BasicDetailsForm;