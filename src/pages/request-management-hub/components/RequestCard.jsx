import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RequestCard = ({ 
  request, 
  type = 'sent', 
  onAccept, 
  onDecline, 
  onCall, 
  onWhatsApp,
  onViewProfile 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'text-success bg-success/10 border-success/20';
      case 'rejected': case'declined':
        return 'text-error bg-error/10 border-error/20';
      case 'seen':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'sent':
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return 'CheckCircle';
      case 'rejected': case'declined':
        return 'XCircle';
      case 'seen':
        return 'Eye';
      case 'sent':
      default:
        return 'Clock';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleCall = () => {
    if (onCall && request.profile.phone) {
      onCall(request.profile.phone);
    }
  };

  const handleWhatsApp = () => {
    if (onWhatsApp && request.profile.phone) {
      onWhatsApp(request.profile.phone);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-elevation-1 transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-16 h-16 rounded-xl overflow-hidden border-2 border-border cursor-pointer hover:border-primary/30 transition-smooth"
            onClick={() => onViewProfile && onViewProfile(request.profile)}
          >
            <Image
              src={request.profile.avatar}
              alt={request.profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 
              className="font-heading font-semibold text-foreground cursor-pointer hover:text-primary transition-smooth"
              onClick={() => onViewProfile && onViewProfile(request.profile)}
            >
              {request.profile.name}
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              {request.profile.age} years • {request.profile.location}
            </p>
            <p className="text-sm text-muted-foreground font-body">
              {request.profile.profession}
            </p>
          </div>
        </div>

        {/* Premium Badge */}
        {request.profile.isPremium && (
          <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full">
            <Icon name="Crown" size={12} />
            <span className="text-xs font-caption font-medium">Premium</span>
          </div>
        )}
      </div>

      {/* Status and Timestamp */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(request.status)}`}>
          <Icon name={getStatusIcon(request.status)} size={14} />
          <span className="text-xs font-caption font-medium capitalize">
            {request.status === 'declined' ? 'Declined' : request.status}
          </span>
        </div>
        
        <span className="text-xs text-muted-foreground font-caption">
          {formatTimestamp(request.timestamp)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {type === 'received' && request.status === 'sent' && (
          <div className="flex items-center space-x-2 flex-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDecline && onDecline(request.id)}
              className="flex-1 text-error border-error hover:bg-error hover:text-error-foreground"
            >
              Decline
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onAccept && onAccept(request.id)}
              className="flex-1"
            >
              Accept
            </Button>
          </div>
        )}

        {request.status === 'accepted' && (
          <div className="flex items-center space-x-2 flex-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCall}
              iconName="Phone"
              iconPosition="left"
              className="flex-1 text-success border-success hover:bg-success hover:text-success-foreground"
            >
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsApp}
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1 text-success border-success hover:bg-success hover:text-success-foreground"
            >
              WhatsApp
            </Button>
          </div>
        )}

        {(request.status === 'rejected' || request.status === 'declined' || request.status === 'seen') && (
          <div className="flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewProfile && onViewProfile(request.profile)}
              className="w-full"
            >
              View Profile
            </Button>
          </div>
        )}

        {type === 'sent' && request.status === 'sent' && (
          <div className="flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewProfile && onViewProfile(request.profile)}
              className="w-full"
            >
              View Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;