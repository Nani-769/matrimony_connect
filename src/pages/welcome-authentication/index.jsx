import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import WelcomeHero from './components/WelcomeHero';
import AuthenticationForm from './components/AuthenticationForm';
import TestimonialsSection from './components/TestimonialsSection';
import TrustBadges from './components/TrustBadges';

const WelcomeAuthentication = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Check if user is already authenticated
    if (!loading && user) {
      navigate('/dashboard-match-discovery');
    }
  }, [user, loading, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10">
      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Left Column - Welcome & Authentication */}
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            <WelcomeHero />
            <AuthenticationForm />
          </div>

          {/* Right Column - Testimonials & Trust (Desktop Only) */}
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0 space-y-6">
            <TestimonialsSection />
          </div>
        </div>

        {/* Trust Badges Section (Mobile) */}
        <div className="lg:hidden mt-8 max-w-lg mx-auto">
          <TrustBadges />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm font-body text-muted-foreground">
              <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-smooth">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-smooth">Help Center</a>
            </div>
            <p className="text-xs font-caption text-muted-foreground">
              © {new Date().getFullYear()} Matrimony Connect. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default WelcomeAuthentication;