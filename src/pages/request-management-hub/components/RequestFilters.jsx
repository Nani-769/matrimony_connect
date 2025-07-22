import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const RequestFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = {
    status: [
      { value: 'all', label: 'All Status' },
      { value: 'sent', label: 'Sent' },
      { value: 'seen', label: 'Seen' },
      { value: 'accepted', label: 'Accepted' },
      { value: 'rejected', label: 'Rejected' }
    ],
    sort: [
      { value: 'newest', label: 'Newest First' },
      { value: 'oldest', label: 'Oldest First' },
      { value: 'name', label: 'Name A-Z' }
    ],
    membership: [
      { value: 'all', label: 'All Members' },
      { value: 'premium', label: 'Premium Only' },
      { value: 'regular', label: 'Regular Only' }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...activeFilters,
      [filterType]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      status: 'all',
      sort: 'newest',
      membership: 'all'
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (value, index) => {
      const defaultValues = ['all', 'newest', 'all'];
      return value !== defaultValues[index];
    }
  );

  return (
    <div className="space-y-4">
      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          iconName="Filter"
          iconPosition="left"
        >
          Filters
          {hasActiveFilters && (
            <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.status.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('status', option.value)}
                  className={`px-3 py-1 rounded-full text-sm font-caption transition-smooth ${
                    activeFilters.status === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-2">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.sort.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('sort', option.value)}
                  className={`px-3 py-1 rounded-full text-sm font-caption transition-smooth ${
                    activeFilters.sort === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Membership Filter */}
          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-2">
              Membership
            </label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.membership.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('membership', option.value)}
                  className={`px-3 py-1 rounded-full text-sm font-caption transition-smooth ${
                    activeFilters.membership === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestFilters;