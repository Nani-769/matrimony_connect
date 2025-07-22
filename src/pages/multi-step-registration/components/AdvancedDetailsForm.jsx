import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const AdvancedDetailsForm = ({ formData, onUpdate, relationship, errors = {} }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const getFormTitle = () => {
    return relationship === 'myself' ? 'Your Additional Details' : 'His/Her Additional Details';
  };

  const heightOptions = [
    { value: '4_6', label: '4\'6" (137 cm)' },
    { value: '4_7', label: '4\'7" (140 cm)' },
    { value: '4_8', label: '4\'8" (142 cm)' },
    { value: '4_9', label: '4\'9" (145 cm)' },
    { value: '4_10', label: '4\'10" (147 cm)' },
    { value: '4_11', label: '4\'11" (150 cm)' },
    { value: '5_0', label: '5\'0" (152 cm)' },
    { value: '5_1', label: '5\'1" (155 cm)' },
    { value: '5_2', label: '5\'2" (157 cm)' },
    { value: '5_3', label: '5\'3" (160 cm)' },
    { value: '5_4', label: '5\'4" (163 cm)' },
    { value: '5_5', label: '5\'5" (165 cm)' },
    { value: '5_6', label: '5\'6" (168 cm)' },
    { value: '5_7', label: '5\'7" (170 cm)' },
    { value: '5_8', label: '5\'8" (173 cm)' },
    { value: '5_9', label: '5\'9" (175 cm)' },
    { value: '5_10', label: '5\'10" (178 cm)' },
    { value: '5_11', label: '5\'11" (180 cm)' },
    { value: '6_0', label: '6\'0" (183 cm)' },
    { value: '6_1', label: '6\'1" (185 cm)' },
    { value: '6_2', label: '6\'2" (188 cm)' },
    { value: '6_3', label: '6\'3" (191 cm)' },
    { value: '6_4', label: '6\'4" (193 cm)' }
  ];

  const educationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelors', label: 'Bachelor\'s Degree' },
    { value: 'masters', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate/PhD' },
    { value: 'professional', label: 'Professional Degree' },
    { value: 'other', label: 'Other' }
  ];

  const employmentOptions = [
    { value: 'private_job', label: 'Private Job' },
    { value: 'government_job', label: 'Government Job' },
    { value: 'business', label: 'Business/Self Employed' },
    { value: 'professional', label: 'Professional (Doctor/Lawyer/CA)' },
    { value: 'student', label: 'Student' },
    { value: 'homemaker', label: 'Homemaker' },
    { value: 'retired', label: 'Retired' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'other', label: 'Other' }
  ];

  const incomeOptions = [
    { value: 'below_2', label: 'Below ₹2 Lakhs' },
    { value: '2_5', label: '₹2-5 Lakhs' },
    { value: '5_10', label: '₹5-10 Lakhs' },
    { value: '10_15', label: '₹10-15 Lakhs' },
    { value: '15_25', label: '₹15-25 Lakhs' },
    { value: '25_50', label: '₹25-50 Lakhs' },
    { value: '50_75', label: '₹50-75 Lakhs' },
    { value: '75_100', label: '₹75 Lakhs - 1 Crore' },
    { value: 'above_100', label: 'Above ₹1 Crore' },
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
          Optional details to enhance the profile (can be filled later)
        </p>
      </div>

      {/* Basic Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Height */}
        <Select
          label="Height"
          options={heightOptions}
          value={formData.height || ''}
          onChange={(value) => handleInputChange('height', value)}
          placeholder="Select height"
          error={errors.height}
        />

        {/* Education */}
        <Select
          label="Education"
          options={educationOptions}
          value={formData.education || ''}
          onChange={(value) => handleInputChange('education', value)}
          placeholder="Select education level"
          error={errors.education}
        />

        {/* Employment */}
        <Select
          label="Employment"
          options={employmentOptions}
          value={formData.employment || ''}
          onChange={(value) => handleInputChange('employment', value)}
          placeholder="Select employment type"
          error={errors.employment}
        />

        {/* Annual Income */}
        <Select
          label="Annual Income"
          options={incomeOptions}
          value={formData.income || ''}
          onChange={(value) => handleInputChange('income', value)}
          placeholder="Select income range"
          error={errors.income}
        />
      </div>

      {/* Advanced Details Toggle */}
      <div className="border-t border-border pt-6">
        <Button
          variant="ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="w-full justify-center"
        >
          {showAdvanced ? 'Hide Advanced Details' : 'Show Advanced Details'}
        </Button>

        {showAdvanced && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gothram */}
            <Input
              label="Gothram"
              type="text"
              placeholder="Enter gothram"
              value={formData.gothram || ''}
              onChange={(e) => handleInputChange('gothram', e.target.value)}
              error={errors.gothram}
            />

            {/* Sub Caste */}
            <Input
              label="Sub Caste"
              type="text"
              placeholder="Enter sub caste"
              value={formData.subCaste || ''}
              onChange={(e) => handleInputChange('subCaste', e.target.value)}
              error={errors.subCaste}
            />

            {/* Occupation */}
            <Input
              label="Occupation"
              type="text"
              placeholder="Enter occupation/job title"
              value={formData.occupation || ''}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              error={errors.occupation}
            />

            {/* Company */}
            <Input
              label="Company/Organization"
              type="text"
              placeholder="Enter company name"
              value={formData.company || ''}
              onChange={(e) => handleInputChange('company', e.target.value)}
              error={errors.company}
            />

            {/* Location */}
            <div className="md:col-span-2">
              <Input
                label="Current Location"
                type="text"
                placeholder="Enter city, state"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                error={errors.location}
              />
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <Input
                label="About"
                type="text"
                placeholder="Brief description about yourself/them"
                value={formData.about || ''}
                onChange={(e) => handleInputChange('about', e.target.value)}
                error={errors.about}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedDetailsForm;