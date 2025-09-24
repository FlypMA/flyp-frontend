# 🗨️ Conversations Feature

**Location**: `src/features/phase1/conversations/`  
**Purpose**: Conversation-centric transaction management system

## Overview

The Conversations feature provides a comprehensive messaging system that serves as the central hub for all transaction-related activities. Instead of separate pages for offers, due diligence, and transactions, everything happens within the conversation context.

## Architecture

### Core Principles

1. **Conversation-Driven**: All transaction activities happen within conversation context
2. **Contextual Actions**: Quick actions based on transaction stage and user role
3. **Real-time Updates**: Live transaction state updates
4. **Modal Integration**: Transaction actions open as modals within the conversation

### Directory Structure

```
conversations/
├── types/                    # Type definitions
│   └── index.ts             # Enhanced message types, conversation context
├── components/              # React components
│   ├── TransactionContextPanel.tsx    # Transaction progress and quick actions
│   ├── messages/            # Message rendering components
│   │   ├── TransactionMessage.tsx     # Enhanced message types
│   │   └── index.ts
│   ├── modals/              # Transaction action modals
│   │   ├── OfferCreationModal.tsx     # Create offers
│   │   ├── DueDiligenceRequestModal.tsx # Request due diligence
│   │   ├── DocumentSharingModal.tsx   # Share documents
│   │   └── index.ts
│   └── index.ts
├── hooks/                   # Custom hooks
│   ├── useConversationContext.ts      # Context management
│   └── index.ts
├── index.ts                 # Main feature export
└── README.md               # This file
```

## Key Components

### TransactionContextPanel

Shows transaction progress and provides quick actions based on:

- Current transaction stage
- User role (buyer/seller/advisor)
- Available actions for the stage

### TransactionMessage

Enhanced message component that renders different message types:

- **Text Messages**: Standard conversation messages
- **Offer Messages**: Formal offers with terms and conditions
- **Due Diligence Messages**: Document requests and responses
- **Document Messages**: File sharing with access controls
- **NDA Messages**: NDA signing and status updates
- **Transaction Messages**: Transaction progress updates
- **System Messages**: Automated notifications

### Transaction Modals

Modal components for transaction actions:

- **OfferCreationModal**: Create and submit formal offers
- **DueDiligenceRequestModal**: Request specific documents/information
- **DocumentSharingModal**: Upload and share documents with access controls

## Message Types

### Enhanced Message Interface

```typescript
interface TransactionMessage {
  type: 'text' | 'system' | 'offer' | 'due_diligence' | 'document' | 'nda' | 'transaction';

  // Offer-specific data
  offerDetails?: {
    amount: number;
    currency: string;
    terms: string;
    status: 'pending' | 'accepted' | 'rejected' | 'countered';
    conditions?: string[];
  };

  // Due diligence-specific data
  dueDiligenceDetails?: {
    processId: string;
    category: string;
    status: 'requested' | 'provided' | 'reviewed' | 'approved';
    priority: 'low' | 'medium' | 'high' | 'urgent';
  };

  // Document-specific data
  documentDetails?: {
    documentId: string;
    name: string;
    accessLevel: 'public' | 'nda_required' | 'due_diligence';
  };

  // ... other transaction-specific data
}
```

## Transaction Stages

1. **Inquiry**: Initial contact and interest
2. **NDA**: Non-disclosure agreement signing
3. **Offer**: Formal offer submission and negotiation
4. **Due Diligence**: Document review and verification
5. **Transaction**: Final transaction completion
6. **Completed**: Deal closed

## Quick Actions

Context-aware actions based on:

- **User Role**: Different actions for buyers vs sellers
- **Transaction Stage**: Relevant actions for current stage
- **Availability**: Actions only shown when applicable
- **Urgency**: Visual indicators for action priority

## Integration Points

### With Existing Messaging System

- Extends current `Messages.tsx` component
- Adds transaction context panel
- Integrates with existing conversation list
- Maintains backward compatibility

### With Transaction Pages

- Replaces standalone `/offers` page functionality
- Replaces standalone `/due-diligence` page functionality
- Replaces standalone `/transactions` page functionality
- Provides unified experience

## Usage Examples

### Creating an Offer

```typescript
import { OfferCreationModal } from '@/features/phase1/conversations';

const ConversationView = () => {
  const [showOfferModal, setShowOfferModal] = useState(false);

  return (
    <>
      <Button onPress={() => setShowOfferModal(true)}>
        Make an Offer
      </Button>

      <OfferCreationModal
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
        conversationId="conv-123"
        onSuccess={(offer) => {
          // Handle successful offer creation
          console.log('Offer created:', offer);
        }}
      />
    </>
  );
};
```

### Requesting Due Diligence

```typescript
import { DueDiligenceRequestModal } from '@/features/phase1/conversations';

const ConversationView = () => {
  const [showDDModal, setShowDDModal] = useState(false);

  return (
    <>
      <Button onPress={() => setShowDDModal(true)}>
        Request Due Diligence
      </Button>

      <DueDiligenceRequestModal
        isOpen={showDDModal}
        onClose={() => setShowDDModal(false)}
        conversationId="conv-123"
        category="financial"
        priority="high"
        onSuccess={(request) => {
          // Handle successful request
          console.log('DD request created:', request);
        }}
      />
    </>
  );
};
```

## Benefits

1. **Unified Experience**: Single interface for all transaction activities
2. **Context Preservation**: No loss of context when switching between actions
3. **Real-world Alignment**: Mirrors actual M&A communication patterns
4. **Reduced Complexity**: Fewer pages and navigation paths
5. **Enhanced UX**: Contextual actions and real-time updates

## Future Enhancements

1. **Real-time Collaboration**: Live editing and collaboration features
2. **AI Suggestions**: Smart message and action suggestions
3. **Advanced Analytics**: Transaction flow analytics and insights
4. **Mobile Optimization**: Enhanced mobile experience
5. **Integration APIs**: Third-party tool integrations
