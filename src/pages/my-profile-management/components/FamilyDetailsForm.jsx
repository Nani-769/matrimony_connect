import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FamilyDetailsForm = ({ formData, onFieldChange, errors }) => {
  const familyTypeOptions = [
    { value: 'nuclear', label: 'Nuclear Family' },
    { value: 'joint', label: 'Joint Family' },
    { value: 'extended', label: 'Extended Family' }
  ];

  const occupationOptions = [
    { value: 'government', label: 'Government Service' },
    { value: 'private', label: 'Private Service' },
    { value: 'business', label: 'Business' },
    { value: 'professional', label: 'Professional' },
    { value: 'retired', label: 'Retired' },
    { value: 'homemaker', label: 'Homemaker' },
    { value: 'other', label: 'Other' }
  ];

  const familyStatusOptions = [
    { value: 'middle_class', label: 'Middle Class' },
    { value: 'upper_middle_class', label: 'Upper Middle Class' },
    { value: 'rich', label: 'Rich' },
    { value: 'affluent', label: 'Affluent' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold mb-6">Family Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Family Type"
          options={familyTypeOptions}
          value={formData.familyType || ''}
          onChange={(value) => onFieldChange('familyType', value)}
          error={errors.familyType}
        />

        <Select
          label="Family Status"
          options={familyStatusOptions}
          value={formData.familyStatus || ''}
          onChange={(value) => onFieldChange('familyStatus', value)}
          error={errors.familyStatus}
        />

        <Input
          label="Father's Name"
          type="text"
          placeholder="Enter father's name"
          value={formData.fatherName || ''}
          onChange={(e) => onFieldChange('fatherName', e.target.value)}
          error={errors.fatherName}
        />

        <Select
          label="Father's Occupation"
          options={occupationOptions}
          value={formData.fatherOccupation || ''}
          onChange={(value) => onFieldChange('fatherOccupation', value)}
          error={errors.fatherOccupation}
        />

        <Input
          label="Mother's Name"
          type="text"
          placeholder="Enter mother's name"
          value={formData.motherName || ''}
          onChange={(e) => onFieldChange('motherName', e.target.value)}
          error={errors.motherName}
        />

        <Select
          label="Mother's Occupation"
          options={occupationOptions}
          value={formData.motherOccupation || ''}
          onChange={(value) => onFieldChange('motherOccupation', value)}
          error={errors.motherOccupation}
        />

        <Input
          label="Number of Brothers"
          type="number"
          placeholder="0"
          min="0"
          max="10"
          value={formData.brothers || ''}
          onChange={(e) => onFieldChange('brothers', e.target.value)}
          error={errors.brothers}
        />

        <Input
          label="Number of Sisters"
          type="number"
          placeholder="0"
          min="0"
          max="10"
          value={formData.sisters || ''}
          onChange={(e) => onFieldChange('sisters', e.target.value)}
          error={errors.sisters}
        />

        <Input
          label="Brothers Married"
          type="number"
          placeholder="0"
          min="0"
          value={formData.brothersMarried || ''}
          onChange={(e) => onFieldChange('brothersMarried', e.target.value)}
          error={errors.brothersMarried}
        />

        <Input
          label="Sisters Married"
          type="number"
          placeholder="0"
          min="0"
          value={formData.sistersMarried || ''}
          onChange={(e) => onFieldChange('sistersMarried', e.target.value)}
          error={errors.sistersMarried}
        />

        <Input
          label="Family Location"
          type="text"
          placeholder="Enter family location"
          value={formData.familyLocation || ''}
          onChange={(e) => onFieldChange('familyLocation', e.target.value)}
          error={errors.familyLocation}
          className="md:col-span-2"
        />
      </div>

      {/* Family Values */}
      <div className="mt-6">
        <label className="block text-sm font-caption font-medium text-foreground mb-2">
          About Family
        </label>
        <textarea
          placeholder="Write about your family background, values, traditions, and any other relevant information..."
          value={formData.familyAbout || ''}
          onChange={(e) => onFieldChange('familyAbout', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body"
          maxLength={300}
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs font-caption text-muted-foreground">
            Share your family's background and values
          </span>
          <span className="text-xs font-caption text-muted-foreground">
            {(formData.familyAbout || '').length}/300
          </span>
        </div>
      </div>
    </div>
  );
};

export default FamilyDetailsForm;