import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfileActionBar = ({ profile, requestStatus, onRequestSend }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onRequestSend(profile.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCall = () => {
    if (profile.phone) {
      window.location.href = `tel:${profile.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (profile.phone) {
      const message = encodeURIComponent(`Hi ${profile.name}, I found your profile on Matrimony Connect and would like to connect with you.`);
      window.open(`https://api.whatsapp.com/send?phone=${profile.phone}&text=${message}`, '_blank');
    }
  };

  const handleBack = () => {
    navigate('/dashboard-match-discovery');
  };

  const getRequestButtonContent = () => {
    switch (requestStatus) {
      case 'sent':
        return {
          text: 'Request Sent',
          icon: 'Clock',
          variant: 'outline',
          disabled: true
        };
      case 'accepted':
        return {
          text: 'Connected',
          icon: 'CheckCircle',
          variant: 'success',
          disabled: true
        };
      case 'rejected':
        return {
          text: 'Request Declined',
          icon: 'X',
          variant: 'outline',
          disabled: true
        };
      default:
        return {
          text: 'Send Interest',
          icon: 'Heart',
          variant: 'default',
          disabled: false
        };
    }
  };

  const requestButton = getRequestButtonContent();
  const isConnected = requestStatus === 'accepted';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 md:relative md:border-0 md:bg-transparent md:p-0">
      <div className="flex flex-col space-y-3 md:space-y-4">
        {/* Communication Buttons (only show if connected) */}
        {isConnected && profile.phone && (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleCall}
              iconName="Phone"
              iconPosition="left"
              className="flex-1 text-success border-success hover:bg-success hover:text-success-foreground"
            >
              Call Now
            </Button>
            <Button
              variant="outline"
              onClick={handleWhatsApp}
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1 text-success border-success hover:bg-success hover:text-success-foreground"
            >
              WhatsApp
            </Button>
          </div>
        )}

        {/* Primary Actions */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleBack}
            iconName="ArrowLeft"
            iconPosition="left"
            className="flex-1 md:flex-none"
          >
            Back to Matches
          </Button>
          
          <Button
            variant={requestButton.variant}
            onClick={handleSendRequest}
            disabled={requestButton.disabled || isLoading}
            loading={isLoading}
            iconName={requestButton.icon}
            iconPosition="left"
            className="flex-1"
          >
            {requestButton.text}
          </Button>
        </div>

        {/* Premium Upgrade Prompt (if not premium) */}
        {!profile.isPremium && requestStatus === 'none' && (
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
            <div className="flex items-start space-x-3">
              <Icon name="Crown" size={20} className="text-secondary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-heading font-medium text-sm mb-1">
                  Upgrade to Premium
                </h4>
                <p className="text-xs text-muted-foreground font-body mb-2">
                  Get priority visibility and unlimited requests for just ₹100
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/premium-upgrade')}
                  iconName="Sparkles"
                  iconPosition="left"
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileActionBar;