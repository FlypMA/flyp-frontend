import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Avatar,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from '@heroui/react';
import {
  Send,
  Paperclip,
  Shield,
  CheckCircle,
  Clock,
  User,
  Building2,
  AlertTriangle,
  FileText,
  Download,
} from 'lucide-react';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'document' | 'system';
  sent_at: string;
  read_at?: string;
  sender_name: string;
  sender_role: 'buyer' | 'seller';
}

interface Conversation {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  listing_title: string;
  nda_signed: boolean;
  confidential_access_granted: boolean;
  status: 'active' | 'archived' | 'completed';
  last_message_at?: string;
  participant_name: string;
}

interface ConversationInterfaceProps {
  conversation: Conversation;
  currentUserId: string;
  currentUserRole: 'buyer' | 'seller';
  onClose: () => void;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({
  conversation,
  currentUserId,
  currentUserRole,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showNDAModal, setShowNDAModal] = useState(false);
  const [ndaContent, setNdaContent] = useState('');
  const [isSigningNDA, setIsSigningNDA] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, [conversation.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Mock messages for demonstration
      setMessages([
        {
          id: '1',
          sender_id: conversation.buyer_id,
          content:
            "Hello, I'm very interested in your business listing. Could we schedule a call to discuss the opportunity in more detail?",
          message_type: 'text',
          sent_at: '2024-01-22T10:30:00Z',
          read_at: '2024-01-22T10:45:00Z',
          sender_name: 'John Smith',
          sender_role: 'buyer',
        },
        {
          id: '2',
          sender_id: conversation.seller_id,
          content:
            "Thank you for your interest! I'd be happy to discuss the business with you. Before we can share detailed financials, you'll need to sign our NDA.",
          message_type: 'text',
          sent_at: '2024-01-22T11:15:00Z',
          read_at: '2024-01-22T11:30:00Z',
          sender_name: 'Marie Dubois',
          sender_role: 'seller',
        },
        {
          id: '3',
          sender_id: 'system',
          content: 'NDA has been signed by John Smith. Confidential documents are now accessible.',
          message_type: 'system',
          sent_at: '2024-01-22T12:00:00Z',
          sender_name: 'System',
          sender_role: 'buyer',
        },
      ]);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const messageData = {
        conversation_id: conversation.id,
        content: newMessage.trim(),
        message_type: 'text' as const,
      };

      // TODO: Replace with actual API call
      const newMsg: Message = {
        id: Date.now().toString(),
        sender_id: currentUserId,
        content: newMessage.trim(),
        message_type: 'text',
        sent_at: new Date().toISOString(),
        sender_name: 'You',
        sender_role: currentUserRole,
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');

      console.log('Sending message:', messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleSignNDA = async () => {
    setIsSigningNDA(true);
    try {
      // TODO: Replace with actual API call
      console.log('Signing NDA for conversation:', conversation.id);

      // Mock success
      const systemMessage: Message = {
        id: Date.now().toString(),
        sender_id: 'system',
        content:
          'NDA has been successfully signed. You now have access to confidential business information.',
        message_type: 'system',
        sent_at: new Date().toISOString(),
        sender_name: 'System',
        sender_role: currentUserRole,
      };

      setMessages(prev => [...prev, systemMessage]);
      setShowNDAModal(false);

      // Update conversation state
      conversation.nda_signed = true;
      conversation.confidential_access_granted = true;
    } catch (error) {
      console.error('Error signing NDA:', error);
    } finally {
      setIsSigningNDA(false);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return (
        date.toLocaleDateString() +
        ' ' +
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }
  };

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.sender_id === currentUserId;
    const isSystemMessage = message.message_type === 'system';

    if (isSystemMessage) {
      return (
        <div key={message.id} className="flex justify-center my-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" />
            {message.content}
          </div>
        </div>
      );
    }

    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
          <div className="flex items-center gap-2 mb-1">
            {!isOwnMessage && (
              <Avatar size="sm" name={message.sender_name} className="w-6 h-6 text-xs" />
            )}
            <span className="text-xs text-gray-600 font-medium">
              {isOwnMessage ? 'You' : message.sender_name}
            </span>
            <span className="text-xs text-gray-500">{formatMessageTime(message.sent_at)}</span>
          </div>

          <div
            className={`p-3 rounded-lg ${
              isOwnMessage
                ? 'bg-blue-500 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-900 rounded-bl-sm'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>

          {message.read_at && isOwnMessage && (
            <div className="flex items-center justify-end gap-1 mt-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-500">Read</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Header */}
      <CardHeader className="flex justify-between items-center pb-4">
        <div className="flex items-center gap-3">
          <Avatar name={conversation.participant_name} className="w-10 h-10" />
          <div>
            <h3 className="font-semibold text-gray-900">{conversation.participant_name}</h3>
            <p className="text-sm text-gray-600">{conversation.listing_title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {conversation.nda_signed && (
            <Chip color="success" variant="flat" size="sm">
              <Shield className="w-3 h-3 mr-1" />
              NDA Signed
            </Chip>
          )}
          <Chip color="primary" variant="flat" size="sm">
            <Clock className="w-3 h-3 mr-1" />
            {conversation.status}
          </Chip>
          <Button size="sm" variant="light" onPress={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>

      <Divider />

      {/* NDA Notice */}
      {!conversation.nda_signed && currentUserRole === 'buyer' && (
        <div className="p-4 bg-orange-50 border-l-4 border-orange-400">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-orange-900 mb-1">NDA Required</h4>
              <p className="text-sm text-orange-700 mb-3">
                To access detailed business information and continue this conversation, you need to
                sign a Non-Disclosure Agreement.
              </p>
              <Button
                size="sm"
                color="warning"
                variant="flat"
                onPress={() => setShowNDAModal(true)}
                startContent={<FileText className="w-4 h-4" />}
              >
                Review & Sign NDA
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder={
              conversation.nda_signed || currentUserRole === 'seller'
                ? 'Type your message...'
                : 'Sign NDA to send messages...'
            }
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            isDisabled={!conversation.nda_signed && currentUserRole === 'buyer'}
            endContent={
              <Button
                size="sm"
                variant="light"
                isIconOnly
                isDisabled={!conversation.nda_signed && currentUserRole === 'buyer'}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
            }
          />
          <Button
            color="primary"
            onPress={sendMessage}
            isLoading={isSending}
            isDisabled={
              !newMessage.trim() || (!conversation.nda_signed && currentUserRole === 'buyer')
            }
            startContent={!isSending ? <Send className="w-4 h-4" /> : null}
          >
            Send
          </Button>
        </div>
      </div>

      {/* NDA Modal */}
      <Modal
        isOpen={showNDAModal}
        onClose={() => setShowNDAModal(false)}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-xl font-bold">Non-Disclosure Agreement</h2>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Business Information Protection
                </h3>
                <p className="text-sm text-blue-700">
                  This NDA ensures that sensitive business information shared during your
                  conversation remains confidential and is only used for evaluation purposes.
                </p>
              </div>

              <div className="prose prose-sm max-w-none">
                <h4 className="font-semibold">Terms and Conditions:</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    • All shared financial data, operational details, and business strategies must
                    remain confidential
                  </li>
                  <li>
                    • Information can only be used for the purpose of evaluating this acquisition
                    opportunity
                  </li>
                  <li>• No information may be shared with third parties without written consent</li>
                  <li>• This agreement remains in effect for 2 years from the date of signing</li>
                  <li>• Violation of this agreement may result in legal action and damages</li>
                </ul>
              </div>

              <Textarea
                label="Additional Terms (if any)"
                placeholder="Any additional terms specific to this transaction will appear here..."
                value={ndaContent}
                onChange={e => setNdaContent(e.target.value)}
                isReadOnly
                minRows={3}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setShowNDAModal(false)}
              isDisabled={isSigningNDA}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSignNDA}
              isLoading={isSigningNDA}
              startContent={!isSigningNDA ? <Shield className="w-4 h-4" /> : null}
            >
              Accept & Sign NDA
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConversationInterface;
