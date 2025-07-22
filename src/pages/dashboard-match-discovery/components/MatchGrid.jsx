import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';
import SkeletonCard from './SkeletonCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MatchGrid = ({ 
  profiles, 
  loading, 
  hasMore, 
  onLoadMore, 
  onViewProfile, 
  onSendRequest,
  requestStatuses = {},
  className = '' 
}) => {
  const [visibleProfiles, setVisibleProfiles] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setVisibleProfiles(profiles);
  }, [profiles]);

  const handleLoadMore = async () => {
    if (onLoadMore && !loadingMore) {
      setLoadingMore(true);
      await onLoadMore();
      setLoadingMore(false);
    }
  };

  const handleSendRequest = async (profileId) => {
    if (onSendRequest) {
      await onSendRequest(profileId);
    }
  };

  if (loading && visibleProfiles.length === 0) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!loading && visibleProfiles.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-heading font-semibold mb-2">
          No Matches Found
        </h3>
        <p className="text-muted-foreground font-body mb-6 max-w-md">
          We couldn't find any profiles matching your current filters. Try adjusting your preferences to see more matches.
        </p>
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => window.location.reload()}
        >
          Refresh Matches
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleProfiles.map((profile) => (
          <MatchCard
            key={profile.id}
            profile={profile}
            onViewProfile={onViewProfile}
            onSendRequest={handleSendRequest}
            requestStatus={requestStatuses[profile.id]}
          />
        ))}
        
        {/* Loading More Skeletons */}
        {loadingMore && Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={`loading-${index}`} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            loading={loadingMore}
            iconName="ChevronDown"
            iconPosition="right"
            className="px-8"
          >
            {loadingMore ? 'Loading More...' : 'Load More Matches'}
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && visibleProfiles.length > 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Icon name="CheckCircle" size={24} className="text-success mb-2" />
          <p className="text-muted-foreground font-body text-sm">
            You've seen all available matches. Check back later for new profiles!
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchGrid;