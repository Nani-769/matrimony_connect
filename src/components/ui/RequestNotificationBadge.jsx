import React, { useState, useEffect } from 'react';

const RequestNotificationBadge = ({ count = 0, className = '' }) => {
  const [animatedCount, setAnimatedCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (count !== animatedCount) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setAnimatedCount(count);
        setIsAnimating(false);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [count, animatedCount]);

  if (count === 0) {
    return null;
  }

  return (
    <span 
      className={`
        absolute -top-1 -right-1 
        bg-error text-error-foreground 
        text-xs rounded-full 
        w-5 h-5 
        flex items-center justify-center 
        font-caption font-medium
        transition-all duration-200 ease-out
        ${isAnimating ? 'scale-110' : 'scale-100'}
        ${className}
      `}
    >
      {animatedCount > 9 ? '9+' : animatedCount}
    </span>
  );
};

export default RequestNotificationBadge;