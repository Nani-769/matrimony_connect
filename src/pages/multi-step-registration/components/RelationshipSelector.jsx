import React from 'react';
import Icon from '../../../components/AppIcon';

const RelationshipSelector = ({ selectedRelationship, onSelect }) => {
  const relationships = [
    { 
      id: 'myself', 
      label: 'Myself', 
      icon: 'User',
      description: 'Creating profile for myself'
    },
    { 
      id: 'daughter', 
      label: 'Daughter', 
      icon: 'Heart',
      description: 'Creating profile for my daughter'
    },
    { 
      id: 'son', 
      label: 'Son', 
      icon: 'UserCheck',
      description: 'Creating profile for my son'
    },
    { 
      id: 'sister', 
      label: 'Sister', 
      icon: 'Users',
      description: 'Creating profile for my sister'
    },
    { 
      id: 'brother', 
      label: 'Brother', 
      icon: 'UserPlus',
      description: 'Creating profile for my brother'
    },
    { 
      id: 'friend', 
      label: 'Friend', 
      icon: 'UserHeart',
      description: 'Creating profile for my friend'
    },
    { 
      id: 'neighbor', 
      label: 'Neighbor', 
      icon: 'Home',
      description: 'Creating profile for my neighbor'
    },
    { 
      id: 'relative', 
      label: 'Relative', 
      icon: 'Users2',
      description: 'Creating profile for my relative'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Who are you creating this profile for?
        </h2>
        <p className="text-muted-foreground font-body">
          Select the relationship to personalize the registration process
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relationships.map((relationship) => (
          <button
            key={relationship.id}
            onClick={() => onSelect(relationship.id)}
            className={`
              p-6 rounded-xl border-2 transition-all duration-200
              hover:shadow-elevation-2 hover:scale-105
              ${selectedRelationship === relationship.id
                ? 'border-primary bg-primary/5 shadow-elevation-1'
                : 'border-border bg-card hover:border-primary/30'
              }
            `}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center
                ${selectedRelationship === relationship.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon name={relationship.icon} size={24} />
              </div>
              
              <div>
                <h3 className={`
                  font-heading font-medium text-lg
                  ${selectedRelationship === relationship.id
                    ? 'text-primary' :'text-foreground'
                  }
                `}>
                  {relationship.label}
                </h3>
                <p className="text-sm text-muted-foreground font-body mt-1">
                  {relationship.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RelationshipSelector;