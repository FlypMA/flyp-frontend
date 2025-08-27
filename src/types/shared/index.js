'use strict';
// =============================================================================
// BETWEENDEALS SHARED TYPES
// =============================================================================
// Comprehensive type definitions shared between frontend and backend
// Designed by CTO for SME M&A platform architecture
// =============================================================================
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.API_VERSION = exports.SHARED_TYPES_VERSION = exports.ErrorSeverity = void 0;
// Core domain types
__exportStar(require('./entities'), exports);
__exportStar(require('./enums'), exports);
__exportStar(require('./requests'), exports);
// Validation schemas
__exportStar(require('./validation'), exports);
__exportStar(require('./database'), exports);
// Frontend-specific types
__exportStar(require('./frontend'), exports);
// Error handling - specific exports to avoid conflicts
var errors_1 = require('./errors');
Object.defineProperty(exports, 'ErrorSeverity', {
  enumerable: true,
  get: function () {
    return errors_1.ErrorSeverity;
  },
});
// =============================================================================
// VERSION INFO
// =============================================================================
exports.SHARED_TYPES_VERSION = '1.0.0';
exports.API_VERSION = 'v1';
