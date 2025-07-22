import React from 'react';

const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`
      bg-card border border-border rounded-xl overflow-hidden
      animate-pulse
      ${className}
    `}>
      {/* Image Skeleton */}
      <div className="aspect-[4/5] bg-muted" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Name and Age */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded w-32" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>

        {/* Info Lines */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded flex-1" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded flex-1" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded flex-1" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded-full w-16" />
          <div className="h-6 bg-muted rounded-full w-20" />
        </div>

        {/* Compatibility */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-1 bg-muted rounded w-16" />
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 pt-2">
          <div className="h-8 bg-muted rounded flex-1" />
          <div className="h-8 bg-muted rounded flex-1" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;