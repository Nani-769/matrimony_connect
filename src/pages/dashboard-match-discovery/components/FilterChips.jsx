import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  filters, 
  onFilterRemove, 
  onClearAll, 
  onOpenFilters,
  className = '' 
}) => {
  const getActiveFilters = () => {
    const active = [];
    
    if (filters.region && filters.region !== 'all') {
      active.push({
        key: 'region',
        label: getRegionLabel(filters.region),
        value: filters.region
      });
    }
    
    if (filters.income && filters.income !== 'all') {
      active.push({
        key: 'income',
        label: getIncomeLabel(filters.income),
        value: filters.income
      });
    }
    
    if (filters.age && filters.age !== 'all') {
      active.push({
        key: 'age',
        label: `${filters.age} years`,
        value: filters.age
      });
    }
    
    if (filters.education && filters.education !== 'all') {
      active.push({
        key: 'education',
        label: getEducationLabel(filters.education),
        value: filters.education
      });
    }
    
    if (filters.horoscope) {
      active.push({
        key: 'horoscope',
        label: 'Horoscope Match',
        value: true
      });
    }
    
    if (filters.verified) {
      active.push({
        key: 'verified',
        label: 'Verified Only',
        value: true
      });
    }
    
    if (filters.premium) {
      active.push({
        key: 'premium',
        label: 'Premium Only',
        value: true
      });
    }
    
    return active;
  };

  const getRegionLabel = (value) => {
    const labels = {
      'north': 'North India',
      'south': 'South India',
      'east': 'East India',
      'west': 'West India',
      'central': 'Central India',
      'northeast': 'Northeast India'
    };
    return labels[value] || value;
  };

  const getIncomeLabel = (value) => {
    const labels = {
      '0-3': 'Up to ₹3L',
      '3-5': '₹3-5L',
      '5-10': '₹5-10L',
      '10-15': '₹10-15L',
      '15-25': '₹15-25L',
      '25+': '₹25L+'
    };
    return labels[value] || value;
  };

  const getEducationLabel = (value) => {
    const labels = {
      'graduate': 'Graduate',
      'postgraduate': 'Post Graduate',
      'doctorate': 'Doctorate',
      'diploma': 'Diploma',
      'professional': 'Professional'
    };
    return labels[value] || value;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <span className="text-muted-foreground font-body text-sm">
            No filters applied
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenFilters}
          iconName="Filter"
          iconPosition="left"
          className="lg:hidden"
        >
          Filters
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} />
          <span className="font-body font-medium text-sm">
            Active Filters ({activeFilters.length})
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFilters}
            iconName="Filter"
            iconPosition="left"
            className="lg:hidden"
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <div
            key={filter.key}
            className="flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-sm font-caption"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => onFilterRemove(filter.key)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;