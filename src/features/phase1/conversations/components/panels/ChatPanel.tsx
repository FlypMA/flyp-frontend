// 🎯 Chat Panel Component
// Location: src/features/phase1/conversations/components/panels/ChatPanel.tsx
// Purpose: Middle panel for chat messages with business details toggle

import { Button } from '@/shared/components/buttons';
import { ChevronLeft, Info } from 'lucide-react';
import React, { useRef } from 'react';
import { useContextPanel } from '../../hooks/useContextPanel';
import { Conversation, ConversationMessage } from '../../types';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface ChatPanelProps {
  conversation: Conversation | null;
  messages: ConversationMessage[];
  newMessage: string;
  currentUserId: string;
  onMessageChange: (_message: string) => void;
  onSendMessage: () => void;
  onQuickAction?: (_actionId: string) => void;
  onNavigateToBusiness?: () => void;
  className?: string;
}

// =============================================================================
// CHAT PANEL COMPONENT
// =============================================================================

const ChatPanel: React.FC<ChatPanelProps> = ({
  conversation,
  messages,
  newMessage,
  currentUserId,
  onMessageChange,
  onSendMessage,
  onQuickAction,
  onNavigateToBusiness,
  className = '',
}) => {
  // Suppress unused parameter warnings for optional callbacks
  void onQuickAction;
  void onNavigateToBusiness;
  const { isVisible, toggleVisibility, togglePanel, currentBreakpoint } = useContextPanel();
  const messageInputRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  const isMobile = currentBreakpoint === 'mobile';

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage();
      // Clear the contentEditable div
      if (messageInputRef.current) {
        messageInputRef.current.textContent = '';
      }
    }
  };

  if (!conversation) {
    return (
      <div className={`chat-panel flex flex-col bg-white h-full ${className}`}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">No conversation selected</h2>
            <p className="text-gray-600">Select a conversation to start messaging</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-panel flex flex-col bg-white h-full ${className}`}>
      {/* Chat Header - Mobile Optimized with Navigation */}
      <div className="border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
          {/* Mobile Back Button + Participant Info */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            {/* Mobile: Back to conversations button */}
            {isMobile && (
              <button
                onClick={() => togglePanel('left')}
                className="flex-shrink-0 p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center lg:hidden"
                aria-label="Back to conversations"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
            )}

            {/* Participant Avatar */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
              {conversation.participant.avatar ? (
                <img
                  src={conversation.participant.avatar}
                  alt={conversation.participant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm sm:text-base font-medium text-gray-600">
                  {conversation.participant.name?.charAt(0)}
                </span>
              )}
            </div>

            {/* Participant Info */}
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {conversation.participant.name}
              </h2>
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <span className="truncate">{conversation.participant.company}</span>
                <div
                  className="shrink-0 bg-divider border-none w-divider mx-1 sm:mx-2 h-3 sm:h-4 hidden sm:block"
                  role="separator"
                  data-orientation="vertical"
                  aria-orientation="vertical"
                ></div>
                <span className="capitalize hidden sm:inline">{conversation.participant.role}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Touch Optimized */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Mobile: Info/Details button */}
            {isMobile ? (
              <button
                onClick={toggleVisibility}
                className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Show business details"
              >
                <Info className="w-6 h-6 text-gray-700" />
              </button>
            ) : (
              // Desktop: Show details button only if not visible
              !isVisible && (
                <Button
                  variant="tertiary"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm px-3 sm:px-4"
                  onPress={toggleVisibility}
                >
                  Show business details
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start the conversation</h3>
              <p className="text-gray-600">
                Send a message to begin discussing the business opportunity
              </p>
            </div>
          </div>
        ) : (
          messages.map(message => {
            const isCurrentUser = message.senderId === currentUserId;
            const messageTime = new Date(message.sentAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            if (isCurrentUser) {
              // User's own messages - right aligned
              return (
                <div key={message.id} className="flex justify-end mb-4">
                  <div className="max-w-[70%]">
                    {/* Message bubble */}
                    <div className="bg-gray-800 text-white rounded-2xl px-4 py-3 mb-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>

                    {/* Timestamp and actions */}
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-xs text-gray-500">{messageTime}</span>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          aria-label="React to message"
                        >
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="m8 0c4.418278 0 8 3.581722 8 8s-3.581722 8-8 8-8-3.581722-8-8 3.581722-8 8-8zm0 1.5c-3.58985087 0-6.5 2.91014913-6.5 6.5 0 3.5898509 2.91014913 6.5 6.5 6.5 3.5898509 0 6.5-2.9101491 6.5-6.5 0-3.58985087-2.9101491-6.5-6.5-6.5zm-2.25 7.5c0 1.2426407 1.00735931 2.25 2.25 2.25s2.25-1.0073593 2.25-2.25h1.5c0 2.0710678-1.6789322 3.75-3.75 3.75-2.07106781 0-3.75-1.6789322-3.75-3.75zm5.25-4c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1-1-.44771525-1-1 .4477153-1 1-1zm-6 0c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1-1-.44771525-1-1 .44771525-1 1-1z"></path>
                          </svg>
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          aria-label="More actions"
                        >
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="m3 9.5c.82842712 0 1.5-.67157288 1.5-1.5s-.67157288-1.5-1.5-1.5-1.5.67157288-1.5 1.5.67157288 1.5 1.5 1.5zm5 0c.82842712 0 1.5-.67157288 1.5-1.5s-.67157288-1.5-1.5-1.5-1.5.67157288-1.5 1.5.67157288 1.5 1.5 1.5zm5 0c.8284271 0 1.5-.67157288 1.5-1.5s-.6715729-1.5-1.5-1.5-1.5.67157288-1.5 1.5.6715729 1.5 1.5 1.5z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              // Other person's messages - left aligned with avatar
              return (
                <div key={message.id} className="flex items-start space-x-3 mb-4 group">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {conversation.participant.avatar ? (
                        <img
                          src={conversation.participant.avatar}
                          alt={conversation.participant.name || 'User'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">
                          {conversation.participant.name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message content */}
                  <div className="flex-1 min-w-0">
                    {/* Name and timestamp */}
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {conversation.participant.name || 'User'}
                      </span>
                      <span className="text-xs text-gray-500">{messageTime}</span>
                    </div>

                    {/* Message bubble */}
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 mb-1">
                      <p className="text-sm text-gray-900 leading-relaxed">{message.content}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="React to message"
                      >
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 0c4.418278 0 8 3.581722 8 8s-3.581722 8-8 8-8-3.581722-8-8 3.581722-8 8-8zm0 1.5c-3.58985087 0-6.5 2.91014913-6.5 6.5 0 3.5898509 2.91014913 6.5 6.5 6.5 3.5898509 0 6.5-2.9101491 6.5-6.5 0-3.58985087-2.9101491-6.5-6.5-6.5zm-2.25 7.5c0 1.2426407 1.00735931 2.25 2.25 2.25s2.25-1.0073593 2.25-2.25h1.5c0 2.0710678-1.6789322 3.75-3.75 3.75-2.07106781 0-3.75-1.6789322-3.75-3.75zm5.25-4c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1-1-.44771525-1-1 .4477153-1 1-1zm-6 0c.55228475 0 1 .44771525 1 1s-.44771525 1-1 1-1-.44771525-1-1 .44771525-1 1-1z"></path>
                        </svg>
                      </button>
                      <button
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="More actions"
                      >
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="m3 9.5c.82842712 0 1.5-.67157288 1.5-1.5s-.67157288-1.5-1.5-1.5-1.5.67157288-1.5 1.5.67157288 1.5 1.5 1.5zm5 0c.82842712 0 1.5-.67157288 1.5-1.5s-.67157288-1.5-1.5-1.5-1.5.67157288-1.5 1.5.67157288 1.5 1.5 1.5zm5 0c.8284271 0 1.5-.67157288 1.5-1.5s-.6715729-1.5-1.5-1.5-1.5.67157288-1.5 1.5.6715729 1.5 1.5 1.5z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>

      {/* Message Input - Mobile-Optimized Compose Bar */}
      <div className="border-t border-gray-200 bg-white flex-shrink-0 sticky bottom-0 z-10">
        {/* Main Compose Container */}
        <div className="p-3 sm:p-4">
          {/* Input Section */}
          <div className="mb-3 sm:mb-4">
            <div className="relative">
              <label className="sr-only" htmlFor="message_input">
                Type a message
              </label>
              <div className="relative">
                <div
                  ref={messageInputRef}
                  role="textbox"
                  aria-label="Type a message"
                  contentEditable="plaintext-only"
                  className="w-full min-h-[44px] max-h-32 px-3 py-3 sm:px-4 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 overflow-y-auto"
                  id="message_input"
                  data-testid="messaging-composebar"
                  tabIndex={0}
                  style={
                    {
                      '--messaging-composebar-placeholder': 'Type a message',
                    } as React.CSSProperties
                  }
                  onInput={e => {
                    const target = e.target as HTMLDivElement;
                    onMessageChange(target.textContent || '');
                  }}
                  onKeyPress={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                >
                  {!newMessage && (
                    <span className="absolute inset-0 px-3 py-3 sm:px-4 text-gray-500 pointer-events-none text-sm sm:text-base">
                      Type a message
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Section - Mobile Optimized */}
          <div className="flex items-center justify-between gap-2">
            {/* Photo Upload Button - Touch-Friendly */}
            <div className="flex items-center">
              <button
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Add photo or video"
                data-testid="compose-bar-button-messaging__open_image_upload_dialog"
                type="button"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-6 h-6 sm:w-5 sm:h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M27 3a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM8.89 19.04l-.1.08L3 24.92V25a2 2 0 0 0 1.85 2H18.1l-7.88-7.88a1 1 0 0 0-1.32-.08zm12.5-6-.1.08-7.13 7.13L20.92 27H27a2 2 0 0 0 2-1.85v-5.73l-6.3-6.3a1 1 0 0 0-1.31-.08zM27 5H5a2 2 0 0 0-2 2v15.08l4.38-4.37a3 3 0 0 1 4.1-.14l.14.14 1.13 1.13 7.13-7.13a3 3 0 0 1 4.1-.14l.14.14L29 16.59V7a2 2 0 0 0-1.85-2zM8 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Send Button - Touch-Friendly */}
            <div className="flex items-center">
              <button
                disabled={!newMessage.trim()}
                className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-3 sm:p-3.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  newMessage.trim()
                    ? 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 cursor-pointer scale-100 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed focus:ring-gray-500'
                }`}
                aria-label="Send"
                data-testid="messaging_compose_bar_send_button"
                type="button"
                onClick={handleSendMessage}
              >
                <svg
                  className="w-4 h-4 sm:w-3 sm:h-3 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="m1 7.41 1.41 1.42 4.6-4.6v10.79h2V4.2l4.63 4.63 1.41-1.42-5.94-5.94a1.53 1.53 0 0 0-2.05-.1l-.11.1z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
