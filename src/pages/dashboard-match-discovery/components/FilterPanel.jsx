import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  onClearFilters,
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'North India' },
    { value: 'south', label: 'South India' },
    { value: 'east', label: 'East India' },
    { value: 'west', label: 'West India' },
    { value: 'central', label: 'Central India' },
    { value: 'northeast', label: 'Northeast India' }
  ];

  const incomeOptions = [
    { value: 'all', label: 'Any Income' },
    { value: '0-3', label: 'Up to ₹3 Lakhs' },
    { value: '3-5', label: '₹3-5 Lakhs' },
    { value: '5-10', label: '₹5-10 Lakhs' },
    { value: '10-15', label: '₹10-15 Lakhs' },
    { value: '15-25', label: '₹15-25 Lakhs' },
    { value: '25+', label: '₹25+ Lakhs' }
  ];

  const ageOptions = [
    { value: 'all', label: 'Any Age' },
    { value: '21-25', label: '21-25 years' },
    { value: '26-30', label: '26-30 years' },
    { value: '31-35', label: '31-35 years' },
    { value: '36-40', label: '36-40 years' },
    { value: '40+', label: '40+ years' }
  ];

  const educationOptions = [
    { value: 'all', label: 'Any Education' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'postgraduate', label: 'Post Graduate' },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'professional', label: 'Professional Degree' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      region: 'all',
      income: 'all',
      age: 'all',
      education: 'all',
      horoscope: false,
      verified: false,
      premium: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.region !== 'all') count++;
    if (localFilters.income !== 'all') count++;
    if (localFilters.age !== 'all') count++;
    if (localFilters.education !== 'all') count++;
    if (localFilters.horoscope) count++;
    if (localFilters.verified) count++;
    if (localFilters.premium) count++;
    return count;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div className={`
        fixed lg:static top-0 right-0 h-full lg:h-auto
        w-80 lg:w-full max-w-sm lg:max-w-none
        bg-background border-l lg:border-l-0 lg:border border-border
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        z-50 lg:z-auto overflow-y-auto lg:overflow-visible
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <h3 className="font-heading font-semibold">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-caption font-medium">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} />
            <h3 className="font-heading font-medium">Filter Matches</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-caption font-medium">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Region Filter */}
          <div>
            <Select
              label="Region"
              options={regionOptions}
              value={localFilters.region}
              onChange={(value) => handleFilterChange('region', value)}
              className="w-full"
            />
          </div>

          {/* Income Filter */}
          <div>
            <Select
              label="Annual Income"
              options={incomeOptions}
              value={localFilters.income}
              onChange={(value) => handleFilterChange('income', value)}
              className="w-full"
            />
          </div>

          {/* Age Filter */}
          <div>
            <Select
              label="Age Range"
              options={ageOptions}
              value={localFilters.age}
              onChange={(value) => handleFilterChange('age', value)}
              className="w-full"
            />
          </div>

          {/* Education Filter */}
          <div>
            <Select
              label="Education"
              options={educationOptions}
              value={localFilters.education}
              onChange={(value) => handleFilterChange('education', value)}
              className="w-full"
            />
          </div>

          {/* Preference Checkboxes */}
          <div className="space-y-4">
            <h4 className="font-heading font-medium text-sm">Preferences</h4>
            
            <Checkbox
              label="Horoscope Match"
              description="Show only horoscope compatible profiles"
              checked={localFilters.horoscope}
              onChange={(e) => handleFilterChange('horoscope', e.target.checked)}
            />

            <Checkbox
              label="Verified Profiles"
              description="Show only verified profiles"
              checked={localFilters.verified}
              onChange={(e) => handleFilterChange('verified', e.target.checked)}
            />

            <Checkbox
              label="Premium Members"
              description="Show only premium members"
              checked={localFilters.premium}
              onChange={(e) => handleFilterChange('premium', e.target.checked)}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-muted/30 lg:hidden">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Desktop Apply Button */}
        <div className="hidden lg:block p-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleApplyFilters}
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;