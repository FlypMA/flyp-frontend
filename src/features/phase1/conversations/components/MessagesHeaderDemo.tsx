// 🎯 Messages Header Demo Component
// Location: src/features/phase1/conversations/components/MessagesHeaderDemo.tsx
// Purpose: Demo component to showcase the MessagesHeader in isolation

import React, { useState } from 'react';
import MessagesHeader, { MessageCategory, MessageStatus } from './MessagesHeader';

// =============================================================================
// MESSAGES HEADER DEMO COMPONENT
// =============================================================================

const MessagesHeaderDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<MessageCategory>('all');
  const [statusFilter, setStatusFilter] = useState<MessageStatus>('all');
  const [unreadCount] = useState(5); // Mock unread count

  const handleSettingsClick = () => {
    alert('Settings clicked! This would open a settings modal.');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Messages Header Demo</h2>
        <p className="text-sm text-gray-600">
          This demonstrates the enhanced messages header with search, filters, and actions.
        </p>
      </div>

      <MessagesHeader
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        unreadCount={unreadCount}
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
        onSettingsClick={handleSettingsClick}
      />

      <div className="p-4 bg-gray-50">
        <div className="text-sm text-gray-600">
          <p>
            <strong>Current Search:</strong> "{searchQuery || 'None'}"
          </p>
          <p>
            <strong>Category Filter:</strong> {categoryFilter}
          </p>
          <p>
            <strong>Status Filter:</strong> {statusFilter}
          </p>
          <p>
            <strong>Unread Count:</strong> {unreadCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagesHeaderDemo;
