import React from 'react';

const ProfileLoadingState = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-muted rounded animate-pulse" />
          <div className="w-32 h-6 bg-muted rounded animate-pulse" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Image Gallery Skeleton */}
        <div className="w-full h-80 bg-muted rounded-xl animate-pulse" />

        {/* Profile Header Skeleton */}
        <div className="space-y-4">
          <div className="text-center md:text-left space-y-2">
            <div className="w-48 h-8 bg-muted rounded animate-pulse mx-auto md:mx-0" />
            <div className="w-32 h-4 bg-muted rounded animate-pulse mx-auto md:mx-0" />
            <div className="w-40 h-4 bg-muted rounded animate-pulse mx-auto md:mx-0" />
          </div>

          {/* Compatibility Score Skeleton */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="w-32 h-4 bg-background rounded animate-pulse" />
                <div className="w-48 h-3 bg-background rounded animate-pulse" />
              </div>
              <div className="w-16 h-8 bg-background rounded animate-pulse" />
            </div>
          </div>

          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-muted rounded-lg p-3 space-y-2">
                <div className="w-16 h-4 bg-background rounded animate-pulse mx-auto" />
                <div className="w-12 h-3 bg-background rounded animate-pulse mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Details Sections Skeleton */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-muted rounded animate-pulse" />
                  <div className="w-32 h-4 bg-muted rounded animate-pulse" />
                </div>
                <div className="w-5 h-5 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Bar Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="flex space-x-3">
          <div className="flex-1 h-10 bg-muted rounded-lg animate-pulse" />
          <div className="flex-1 h-10 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProfileLoadingState;