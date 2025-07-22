import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'sent', onActionClick }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'sent':
        return {
          icon: 'Send',
          title: 'No Requests Sent Yet',
          description: `You haven't sent any connection requests yet. Start exploring profiles and send requests to potential matches.`,
          actionText: 'Discover Matches',
          actionIcon: 'Heart'
        };
      case 'received':
        return {
          icon: 'Inbox',
          title: 'No Requests Received',
          description: `You haven't received any connection requests yet. Make sure your profile is complete and attractive to get more requests.`,
          actionText: 'Complete Profile',
          actionIcon: 'User'
        };
      case 'filtered':
        return {
          icon: 'Search',
          title: 'No Requests Found',
          description: 'No requests match your current filter criteria. Try adjusting your filters or clearing them to see more results.',
          actionText: 'Clear Filters',
          actionIcon: 'X'
        };
      default:
        return {
          icon: 'MessageCircle',
          title: 'No Requests',
          description: 'No requests available at the moment.',
          actionText: 'Refresh',
          actionIcon: 'RefreshCw'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={content.icon} size={32} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
        {content.title}
      </h3>
      
      <p className="text-muted-foreground font-body max-w-md mb-8 leading-relaxed">
        {content.description}
      </p>
      
      {onActionClick && (
        <Button
          variant="default"
          onClick={onActionClick}
          iconName={content.actionIcon}
          iconPosition="left"
        >
          {content.actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;