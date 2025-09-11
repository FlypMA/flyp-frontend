// 🔗 Shared Types - Single Source of Truth
// Location: src/shared/types/index.ts
// Purpose: Unified export for all shared types

// Core Platform Entities
export * from './entities';

// API Communication Types
export * from './api';

// Common utility types
export type Currency = 'EUR' | 'USD' | 'GBP';
export type UUID = string;
export type Timestamp = string;
