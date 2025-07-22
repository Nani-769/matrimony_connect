import React from 'react';
import Icon from '../../../components/AppIcon';

const RequestTabs = ({ activeTab, onTabChange, sentCount = 0, receivedCount = 0 }) => {
  const tabs = [
    {
      id: 'sent',
      label: 'My Requests',
      icon: 'Send',
      count: sentCount
    },
    {
      id: 'received',
      label: 'Requests to Me',
      icon: 'Inbox',
      count: receivedCount
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-1">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-smooth ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={18} />
            <span className="font-body font-medium">{tab.label}</span>
            {tab.count > 0 && (
              <span className={`text-xs px-2 py-1 rounded-full font-caption font-medium ${
                activeTab === tab.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}>
                {tab.count > 99 ? '99+' : tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RequestTabs;