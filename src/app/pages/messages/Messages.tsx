import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Input, Avatar } from '@heroui/react';
import { Search, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import { User } from '../../types/api/users/user';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const authResult = await authService.checkAuthentication();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <div className="text-gray-600 font-medium">Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              isIconOnly
              variant="ghost"
              onPress={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-1">Your conversations with buyers and sellers</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              classNames={{
                input: "pl-10",
                inputWrapper: "bg-white border border-gray-200 hover:border-gray-300"
              }}
            />
          </div>
        </div>

        {/* Messages Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardBody className="p-0">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Conversations</h2>
                </div>
                
                {/* Empty State */}
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations yet</h3>
                  <p className="text-gray-600 text-sm mb-6 max-w-xs">
                    Start connecting with buyers and sellers on BetweenDeals. Your messages will appear here.
                  </p>
                  <Button
                    color="primary"
                    onPress={() => navigate('/search')}
                    startContent={<Search className="w-4 h-4" />}
                  >
                    Browse Businesses
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Message Area */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardBody className="p-0 h-full">
                {/* Empty Chat State */}
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600 max-w-sm">
                    Choose a conversation from the sidebar to start messaging, or browse businesses to connect with new opportunities.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
