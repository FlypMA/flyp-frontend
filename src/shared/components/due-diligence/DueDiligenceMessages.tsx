/**
 * Due Diligence Messages
 * Location: src/shared/components/due-diligence/DueDiligenceMessages.tsx
 * Purpose: Communication system for due diligence process
 */

import { Button } from '@/shared/components/buttons';
import { AnimatedTextarea } from '@/shared/components/forms';
import { DueDiligenceCommunication } from '@/shared/types/due-diligence';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { AlertTriangle, MessageSquare, Paperclip, Send, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DueDiligenceMessagesProps {
  processId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
}

const DueDiligenceMessages: React.FC<DueDiligenceMessagesProps> = ({ processId, userRole }) => {
  const [messages, setMessages] = useState<DueDiligenceCommunication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [messageSubject, setMessageSubject] = useState('');

  const teamMembers = [
    { id: 'buyer-1', name: 'Jane Buyer', role: 'Buyer' },
    { id: 'seller-1', name: 'John Seller', role: 'Seller' },
    { id: 'advisor-1', name: 'Mike Advisor', role: 'Advisor' },
  ];

  useEffect(() => {
    loadMessages();
  }, [processId]);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await dueDiligenceService.getMessages(processId);
      // setMessages(response.data);

      // Mock data for now
      const mockMessages: DueDiligenceCommunication[] = [
        {
          id: 'msg-1',
          processId,
          type: 'message',
          from: 'buyer-1',
          to: ['seller-1'],
          subject: 'Financial Statements Review',
          content:
            'I have reviewed the financial statements and everything looks good. I have a few questions about the cash flow projections for Q4.',
          timestamp: '2024-01-20T10:30:00Z',
          isRead: true,
          priority: 'medium',
          attachments: ['doc-1'],
          relatedItemId: 'fin-1',
        },
        {
          id: 'msg-2',
          processId,
          type: 'response',
          from: 'seller-1',
          to: ['buyer-1'],
          subject: 'Re: Financial Statements Review',
          content:
            'Thank you for the feedback. I will provide the Q4 cash flow projections by tomorrow. The numbers should be very positive based on our current pipeline.',
          timestamp: '2024-01-20T14:15:00Z',
          isRead: true,
          priority: 'medium',
          attachments: [],
          relatedItemId: 'fin-1',
        },
        {
          id: 'msg-3',
          processId,
          type: 'request',
          from: 'advisor-1',
          to: ['seller-1'],
          subject: 'Legal Documents Needed',
          content:
            'We need the following legal documents to complete the legal due diligence: 1) Corporate structure documents, 2) Material contracts, 3) IP portfolio documentation.',
          timestamp: '2024-01-19T16:45:00Z',
          isRead: false,
          priority: 'high',
          attachments: [],
          relatedItemId: 'leg-2',
          actionRequired: true,
          actionDeadline: '2024-01-25',
        },
        {
          id: 'msg-4',
          processId,
          type: 'alert',
          from: 'system',
          to: ['buyer-1', 'seller-1'],
          subject: 'Deadline Reminder',
          content: 'Reminder: Legal document review is due in 3 days (January 25, 2024).',
          timestamp: '2024-01-22T09:00:00Z',
          isRead: false,
          priority: 'high',
          attachments: [],
          relatedItemId: 'leg-2',
        },
      ];

      setMessages(mockMessages);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || selectedRecipients.length === 0) return;

    try {
      // TODO: Replace with actual API call
      // await dueDiligenceService.sendMessage(processId, {
      //   to: selectedRecipients,
      //   subject: messageSubject,
      //   content: newMessage,
      //   priority: 'medium',
      // });

      const newMsg: DueDiligenceCommunication = {
        id: `msg-${Date.now()}`,
        processId,
        type: 'message',
        from: userRole === 'buyer' ? 'buyer-1' : userRole === 'seller' ? 'seller-1' : 'advisor-1',
        to: selectedRecipients,
        subject: messageSubject || 'New Message',
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: false,
        priority: 'medium',
        attachments: [],
      };

      setMessages(prev => [newMsg, ...prev]);
      setNewMessage('');
      setMessageSubject('');
      setSelectedRecipients([]);
    } catch (error) {
      // TODO: Add proper error handling
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'primary';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'request':
        return '📋';
      case 'response':
        return '💬';
      case 'alert':
        return '⚠️';
      case 'reminder':
        return '⏰';
      default:
        return '💬';
    }
  };

  const getSenderName = (senderId: string) => {
    const member = teamMembers.find(m => m.id === senderId);
    return member ? member.name : senderId;
  };

  const getSenderRole = (senderId: string) => {
    const member = teamMembers.find(m => m.id === senderId);
    return member ? member.role : 'Unknown';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Messages ({messages.length})</h3>
          <p className="text-sm text-gray-600">Communicate with your due diligence team</p>
        </div>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Recent Messages</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                <p className="text-gray-600">Start a conversation with your team members.</p>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg ${
                    !message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-gray-900">
                            {getSenderName(message.from)}
                          </h5>
                          <Chip size="sm" color="default" variant="flat">
                            {getSenderRole(message.from)}
                          </Chip>
                          <span className="text-lg">{getTypeIcon(message.type)}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip size="sm" color={getPriorityColor(message.priority)} variant="flat">
                        {message.priority}
                      </Chip>
                      {message.actionRequired && (
                        <Chip size="sm" color="warning" variant="flat">
                          Action Required
                        </Chip>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="font-medium text-gray-900 mb-1">{message.subject}</h6>
                    <p className="text-sm text-gray-700">{message.content}</p>
                  </div>

                  {message.actionRequired && message.actionDeadline && (
                    <div className="flex items-center gap-2 p-2 bg-yellow-100 rounded-lg mb-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        Action required by: {new Date(message.actionDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>To: {message.to.map(id => getSenderName(id)).join(', ')}</span>
                      {message.attachments.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{message.attachments.length} attachment(s)</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {message.attachments.length > 0 && (
                        <Button size="sm" variant="secondary" isIconOnly>
                          <Paperclip className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="secondary">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>

      {/* Send Message */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Send Message</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <div className="flex flex-wrap gap-2">
                {teamMembers
                  .filter(
                    member =>
                      member.id !==
                      (userRole === 'buyer'
                        ? 'buyer-1'
                        : userRole === 'seller'
                          ? 'seller-1'
                          : 'advisor-1')
                  )
                  .map(member => (
                    <button
                      key={member.id}
                      onClick={() => {
                        setSelectedRecipients(prev =>
                          prev.includes(member.id)
                            ? prev.filter(id => id !== member.id)
                            : [...prev, member.id]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        selectedRecipients.includes(member.id)
                          ? 'bg-primary-100 border-primary-300 text-primary-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {member.name} ({member.role})
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={messageSubject}
                onChange={e => setMessageSubject(e.target.value)}
                placeholder="Message subject..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <AnimatedTextarea
              label="Message"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onBlur={() => {}}
              name="message"
              minRows={4}
            />

            <div className="flex justify-end">
              <Button
                variant="primary"
                onPress={handleSendMessage}
                isDisabled={!newMessage.trim() || selectedRecipients.length === 0}
                startContent={<Send className="w-4 h-4" />}
              >
                Send Message
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DueDiligenceMessages;
