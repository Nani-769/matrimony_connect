import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicDetailsForm = ({ formData, onUpdate, relationship, errors = {} }) => {
  const getFormTitle = () => {
    return relationship === 'myself' ? 'Your Basic Details' : 'His/Her Basic Details';
  };

  const getFieldLabel = (baseLabel) => {
    if (relationship === 'myself') return baseLabel;
    return baseLabel.replace('Your', 'Their').replace('you', 'them');
  };

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
    { value: 'parsi', label: 'Parsi' },
    { value: 'jewish', label: 'Jewish' },
    { value: 'other', label: 'Other' }
  ];

  const casteOptions = [
    { value: 'brahmin', label: 'Brahmin' },
    { value: 'kshatriya', label: 'Kshatriya' },
    { value: 'vaishya', label: 'Vaishya' },
    { value: 'shudra', label: 'Shudra' },
    { value: 'scheduled_caste', label: 'Scheduled Caste' },
    { value: 'scheduled_tribe', label: 'Scheduled Tribe' },
    { value: 'other_backward_class', label: 'Other Backward Class' },
    { value: 'no_caste', label: 'No Caste' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          {getFormTitle()}
        </h2>
        <p className="text-muted-foreground font-body">
          Please provide the basic information required for the profile
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <Input
            label={getFieldLabel("Full Name")}
            type="text"
            placeholder="Enter full name"
            value={formData.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            error={errors.fullName}
            required
          />
        </div>

        {/* Gender */}
        <Select
          label="Gender"
          options={genderOptions}
          value={formData.gender || ''}
          onChange={(value) => handleInputChange('gender', value)}
          placeholder="Select gender"
          error={errors.gender}
          required
        />

        {/* Mobile Number */}
        <Input
          label="Mobile Number"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.mobile || ''}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          error={errors.mobile}
          required
        />

        {/* Date of Birth */}
        <Input
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth || ''}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          error={errors.dateOfBirth}
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="example@email.com"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        {/* Religion */}
        <Select
          label="Religion"
          options={religionOptions}
          value={formData.religion || ''}
          onChange={(value) => handleInputChange('religion', value)}
          placeholder="Select religion"
          error={errors.religion}
          required
        />

        {/* Caste */}
        <Select
          label="Caste"
          options={casteOptions}
          value={formData.caste || ''}
          onChange={(value) => handleInputChange('caste', value)}
          placeholder="Select caste"
          error={errors.caste}
          required
        />

        {/* Marital Status */}
        <Select
          label="Marital Status"
          options={maritalStatusOptions}
          value={formData.maritalStatus || ''}
          onChange={(value) => handleInputChange('maritalStatus', value)}
          placeholder="Select marital status"
          error={errors.maritalStatus}
          required
        />
      </div>
    </div>
  );
};

export default BasicDetailsForm;