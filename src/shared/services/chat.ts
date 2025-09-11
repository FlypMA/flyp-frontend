/**
 * AI Chat Service
 * Connects to Python AI backend for chat functionality
 */

// import { API_CONFIG, getAuthHeaders, DEV_CONFIG } from '../api/apiConfig'; // TODO: Fix import
// import { ChatMessage, ChatResponse, ApiResponse } from '../../../types/api'; // TODO: Fix import
import apiClient from '../utils/APISendRequest';

export interface ChatQueryRequest {
  message: string;
  userType: 'creator' | 'business';
  userId?: string;
  context?: {
    previousMessages?: ChatMessage[];
    userProfile?: any;
    preferences?: any;
  };
}

export interface ChatQueryResponse {
  response: string;
  suggestions?: string[];
  insights?: {
    type: string;
    data: any;
  }[];
  metadata?: {
    confidence: number;
    sources: string[];
    processingTime: number;
  };
}

export class ChatService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.AI_BACKEND.baseURL;
  }

  /**
   * Send a chat query to the AI backend
   */
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      // Use the correct endpoint for chat messages
      const endpoint = API_CONFIG.AI_BACKEND.endpoints.chat.query;
      const response = await apiClient.post<ApiResponse<ChatResponse>>(
        `${this.baseURL}${endpoint}`,
        { message }
      );
      if (!response.data || !response.data.data) {
        throw new Error('Failed to send message');
      }
      return response.data.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Get creator-specific content analysis
   */
  async getCreatorInsights(userId: string, query: string): Promise<any> {
    if (DEV_CONFIG.enableMockData) {
      return this.getMockCreatorInsights();
    }

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(
        `${this.baseURL}${API_CONFIG.AI_BACKEND.endpoints.creator.content}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ userId, query }),
        }
      );

      return await response.json();
    } catch (error) {
      console.error('Creator insights error:', error);
      return this.getMockCreatorInsights();
    }
  }

  /**
   * Get business-specific market analysis
   */
  async getBusinessInsights(userId: string, query: string): Promise<any> {
    if (DEV_CONFIG.enableMockData) {
      return this.getMockBusinessInsights();
    }

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(
        `${this.baseURL}${API_CONFIG.AI_BACKEND.endpoints.business.market}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ userId, query }),
        }
      );

      return await response.json();
    } catch (error) {
      console.error('Business insights error:', error);
      return this.getMockBusinessInsights();
    }
  }

  /**
   * Get AI-powered suggestions for queries
   */
  async getSuggestions(userType: 'creator' | 'business'): Promise<string[]> {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(
        `${this.baseURL}${API_CONFIG.AI_BACKEND.endpoints.chat.suggestions}?userType=${userType}`,
        {
          headers,
        }
      );

      if (!response.ok) {
        return this.getMockSuggestions(userType);
      }

      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return this.getMockSuggestions(userType);
    }
  }

  /**
   * Mock response for development/fallback
   */
  private getMockResponse(request: ChatQueryRequest): ChatQueryResponse {
    const responses = {
      creator: [
        'Your Instagram engagement is up 32% this week! Your sustainable fashion content is resonating well with Gen Z audience. Consider posting more eco-friendly outfit guides during peak hours (7-9 PM).',
        'Based on your recent TikTok performance, dance content gets 3x more engagement than lifestyle posts. Try incorporating trending sounds with your personal style for maximum reach.',
        'Your audience demographic shows 68% female, 18-24 years old, primarily interested in fashion and lifestyle. Consider collaborating with eco-conscious brands that align with your values.',
      ],
      business: [
        '#SustainableFashion is showing 156% growth this quarter. This trend is perfect for your eco-friendly brand campaigns. Gen Z consumers are willing to pay 20% more for sustainable products.',
        'TikTok trends analysis shows that authentic, behind-the-scenes content performs 4x better than polished ads. Consider user-generated content campaigns with micro-influencers.',
        'Market analysis indicates that live shopping features are driving 300% more conversions. Integrate real-time shopping experiences with trending creators for maximum impact.',
      ],
    };

    const userResponses = responses[request.userType] || responses.creator;
    const randomResponse = userResponses[Math.floor(Math.random() * userResponses.length)];

    return {
      response: randomResponse,
      suggestions: this.getMockSuggestions(request.userType),
      insights: [
        {
          type: 'trend',
          data: { trending: true, growth: '+156%', category: 'sustainable fashion' },
        },
      ],
      metadata: {
        confidence: 0.92,
        sources: ['TikTok API', 'Instagram Insights', 'Market Research'],
        processingTime: 1.2,
      },
    };
  }

  private getMockCreatorInsights() {
    return {
      contentAnalysis: {
        bestPerformingContent: 'Sustainable fashion hauls',
        engagement: '+32%',
        recommendations: [
          'Post during 7-9 PM',
          'Use trending audio',
          'Add sustainability hashtags',
        ],
      },
      audienceInsights: {
        demographics: {
          age: '18-24',
          gender: '68% female',
          interests: ['fashion', 'sustainability'],
        },
        growth: '+15% this month',
      },
    };
  }

  private getMockBusinessInsights() {
    return {
      marketTrends: {
        trending: ['#SustainableFashion', '#GenZStyle', '#EcoFriendly'],
        growth: '+156%',
        opportunities: ['Micro-influencer partnerships', 'Live shopping', 'UGC campaigns'],
      },
      competitorAnalysis: {
        topPerformers: ['Eco Brand A', 'Sustainable Co.'],
        strategies: ['Authentic storytelling', 'Behind-the-scenes content'],
      },
    };
  }

  private getMockSuggestions(userType: 'creator' | 'business'): string[] {
    const suggestions = {
      creator: [
        'What are the latest trends in my niche?',
        'How can I improve my content engagement?',
        'What content should I create next?',
      ],
      business: [
        'What are the best performing creators in my industry?',
        'How can I optimize my creator partnerships?',
        'What content strategies are working best?',
      ],
    };

    return suggestions[userType] || suggestions.creator;
  }
}

export const chatService = new ChatService();
