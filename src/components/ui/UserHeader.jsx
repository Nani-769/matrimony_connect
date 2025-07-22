import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';


const UserHeader = ({ 
  // ... keep existing props ...
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock user data
  const user = {
    name: 'Priya Sharma',
    avatar: '/assets/images/user-avatar.jpg',
    email: 'priya.sharma@email.com'
  };

  // Add logout handler
  const handleLogout = async () => {
    try {
      const { signOut } = await import('../../contexts/AuthContext');
      await signOut();
      // Redirect will be handled by auth context
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleNotificationClick = () => {
    navigate('/request-management-hub');
  };

  const handleProfileClick = () => {
    navigate('/my-profile-management');
  };

  // Don't show header on authentication pages
  if (location.pathname === '/welcome-authentication' || location.pathname === '/multi-step-registration') {
    return null;
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-semibold text-primary hidden sm:block">
                Matrimony Connect
              </span>
            </div>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNotificationClick}
                className="relative"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-medium">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </Button>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <Icon name="ChevronDown" size={14} />
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-elevation-2 py-2 z-50">
                  <div className="p-3 border-b border-border">
                    <p className="font-body font-medium text-sm">{user.name}</p>
                    <p className="font-caption text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body hover:bg-muted transition-smooth"
                    >
                      <Icon name="User" size={16} />
                      <span>My Profile</span>
                    </button>
                    
                    <button
                      onClick={() => navigate('/request-management-hub')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body hover:bg-muted transition-smooth"
                    >
                      <Icon name="MessageCircle" size={16} />
                      <span>Requests</span>
                    </button>
                    
                    <button
                      onClick={() => {/* Handle settings */}}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body hover:bg-muted transition-smooth"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                  </div>
                  
                  <div className="border-t border-border py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2 text-error"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-90"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default UserHeader;