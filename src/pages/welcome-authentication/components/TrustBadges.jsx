import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Verified Profiles',
      description: 'All profiles are manually verified for authenticity'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'Your personal information is completely secure'
    },
    {
      icon: 'Users',
      title: 'Family Approved',
      description: 'Trusted by families across India for 15+ years'
    },
    {
      icon: 'Award',
      title: 'Success Rate',
      description: '95% of our users find their life partner'
    }
  ];

  return (
    <div className="w-full">
      <div className="bg-muted/30 rounded-2xl p-6 border border-border">
        <div className="text-center mb-6">
          <h3 className="text-lg font-heading font-semibold mb-2">Why Choose Us?</h3>
          <p className="text-sm text-muted-foreground font-body">
            India's most trusted matrimonial platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-medium text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-6 text-center">
            <div>
              <p className="text-lg font-heading font-bold text-primary">4.8★</p>
              <p className="text-xs font-caption text-muted-foreground">App Rating</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="text-lg font-heading font-bold text-primary">24/7</p>
              <p className="text-xs font-caption text-muted-foreground">Support</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="text-lg font-heading font-bold text-primary">SSL</p>
              <p className="text-xs font-caption text-muted-foreground">Secured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;