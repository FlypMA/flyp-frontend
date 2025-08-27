'use strict';
// =============================================================================
// ERROR TYPES
// =============================================================================
// Comprehensive error handling types for the entire application
// =============================================================================
Object.defineProperty(exports, '__esModule', { value: true });
exports.ErrorSeverity = void 0;
// =============================================================================
// ERROR SEVERITY LEVELS
// =============================================================================
var ErrorSeverity;
(function (ErrorSeverity) {
  ErrorSeverity['LOW'] = 'low';
  ErrorSeverity['MEDIUM'] = 'medium';
  ErrorSeverity['HIGH'] = 'high';
  ErrorSeverity['CRITICAL'] = 'critical';
})(ErrorSeverity || (exports.ErrorSeverity = ErrorSeverity = {}));
