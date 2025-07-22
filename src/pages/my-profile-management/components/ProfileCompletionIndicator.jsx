import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileCompletionIndicator = ({ completionData }) => {
  const { percentage, completedFields, totalFields, missingFields } = completionData;

  const getCompletionColor = (percent) => {
    if (percent >= 80) return 'text-success';
    if (percent >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressBarColor = (percent) => {
    if (percent >= 80) return 'bg-success';
    if (percent >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold">Profile Completion</h3>
        <span className={`text-2xl font-heading font-bold ${getCompletionColor(percentage)}`}>
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-3 mb-4">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Completion Stats */}
      <div className="flex items-center justify-between text-sm font-body mb-4">
        <span className="text-muted-foreground">
          {completedFields} of {totalFields} fields completed
        </span>
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-success">Profile Active</span>
        </div>
      </div>

      {/* Missing Fields */}
      {missingFields.length > 0 && (
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-heading font-medium mb-2 text-muted-foreground">
            Complete your profile by adding:
          </h4>
          <div className="space-y-1">
            {missingFields.slice(0, 3).map((field, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Plus" size={14} className="text-primary" />
                <span className="text-sm font-body text-foreground">{field}</span>
              </div>
            ))}
            {missingFields.length > 3 && (
              <p className="text-xs font-caption text-muted-foreground mt-2">
                +{missingFields.length - 3} more fields
              </p>
            )}
          </div>
        </div>
      )}

      {/* Premium Upgrade Hint */}
      {percentage >= 80 && (
        <div className="mt-4 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Crown" size={16} className="text-secondary" />
            <span className="text-sm font-body text-secondary">
              Upgrade to Premium for better visibility
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionIndicator;