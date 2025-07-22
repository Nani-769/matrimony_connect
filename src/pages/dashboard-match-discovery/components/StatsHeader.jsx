import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsHeader = ({ 
  totalMatches, 
  newMatches, 
  premiumMatches,
  className = '' 
}) => {
  const stats = [
    {
      label: 'Total Matches',
      value: totalMatches || 0,
      icon: 'Users',
      color: 'text-primary'
    },
    {
      label: 'New Today',
      value: newMatches || 0,
      icon: 'UserPlus',
      color: 'text-success'
    },
    {
      label: 'Premium',
      value: premiumMatches || 0,
      icon: 'Crown',
      color: 'text-secondary'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-2 ${stat.color}`}>
              <Icon name={stat.icon} size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-heading font-bold">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsHeader;