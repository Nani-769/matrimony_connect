import React from 'react';
import Image from '../../../components/AppImage';

const WelcomeHero = () => {
  return (
    <div className="text-center space-y-6 mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-elevation-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-white"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">
            Matrimony Connect
          </h1>
          <p className="text-sm font-caption text-muted-foreground">
            Find Your Perfect Life Partner
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="relative rounded-2xl overflow-hidden shadow-elevation-2">
          <Image
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&h=300&fit=crop&crop=center"
            alt="Happy couple celebrating their wedding"
            className="w-full h-48 md:h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Welcome to Your Journey
        </h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-md mx-auto">
          Join thousands of families who found their perfect match through our trusted matrimonial platform
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 pt-4">
        <div className="text-center">
          <p className="text-lg font-heading font-bold text-primary">50K+</p>
          <p className="text-xs font-caption text-muted-foreground">Happy Couples</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="text-lg font-heading font-bold text-primary">1M+</p>
          <p className="text-xs font-caption text-muted-foreground">Verified Profiles</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="text-lg font-heading font-bold text-primary">15+</p>
          <p className="text-xs font-caption text-muted-foreground">Years Trusted</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;