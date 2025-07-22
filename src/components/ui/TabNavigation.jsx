import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items based on the provided routes
  const navigationItems = [
    {
      label: 'Matches',
      path: '/dashboard-match-discovery',
      icon: 'Heart',
      badge: null
    },
    {
      label: 'Requests',
      path: '/request-management-hub',
      icon: 'MessageCircle',
      badge: 3 // Mock request count
    },
    {
      label: 'Profile',
      path: '/my-profile-management',
      icon: 'User',
      badge: null
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  // Don't show navigation on authentication pages
  if (location.pathname === '/welcome-authentication' || location.pathname === '/multi-step-registration') {
    return null;
  }

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-90 bg-background border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16 px-4">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => handleTabClick(item.path)}
                className={`flex flex-col items-center justify-center space-y-1 min-w-0 flex-1 py-2 transition-smooth ${
                  isActive 
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-medium">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-caption ${
                  isActive ? 'font-medium' : 'font-normal'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-90 bg-background border-b border-border">
        <div className="flex items-center justify-center h-14 px-6">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleTabClick(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      name={item.icon} 
                      size={18} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-medium">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-body ${
                    isActive ? 'font-medium' : 'font-normal'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TabNavigation;