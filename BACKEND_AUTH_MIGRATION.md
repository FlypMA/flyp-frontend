# 🔒 Backend Authentication Migration Guide

## 🎯 **SECURITY UPGRADE: Frontend → Backend → Supabase**

Your frontend now authenticates through your backend API instead of directly with Supabase for enhanced security.

## **New Architecture:**
- ✅ **Frontend** → **Backend API** → **Supabase** (Secure)
- ❌ ~~Frontend → Direct Supabase~~ (Less secure)

## **🚀 Backend API Endpoints Required**

Your backend needs to implement these authentication endpoints:

### **1. POST /api/auth/login**
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": { /* User object */ },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

### **2. POST /api/auth/register**
```json
Request:
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "buyer"
}

Response:
{
  "success": true,
  "data": {
    "user": { /* User object */ },
    "token": "jwt_token_here", // Optional if email verification required
    "requiresVerification": true
  }
}
```

### **3. POST /api/auth/logout**
```json
Request: (with Authorization header)

Response:
{
  "success": true
}
```

### **4. GET /api/auth/profile**
```json
Request: (with Authorization header)

Response:
{
  "success": true,
  "data": {
    "user": { /* User object */ }
  }
}
```

### **5. POST /api/auth/refresh**
```json
Request:
{
  "refreshToken": "refresh_token_here"
}

Response:
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

### **6. POST /api/auth/reset-password**
```json
Request:
{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "Password reset email sent"
}
```

### **7. PUT /api/auth/update-password**
```json
Request: (with Authorization header)
{
  "password": "new_password123"
}

Response:
{
  "success": true
}
```

### **8. POST /api/auth/verify-email**
```json
Request:
{
  "token": "verification_token"
}

Response:
{
  "success": true,
  "data": {
    "user": { /* User object */ },
    "token": "jwt_token_here"
  }
}
```

### **9. POST /api/auth/resend-verification**
```json
Request:
{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "Verification email sent"
}
```

## **🔧 Backend Implementation Notes**

### **Authentication Flow:**
1. **Frontend** sends credentials to **Backend**
2. **Backend** validates with **Supabase**
3. **Backend** generates JWT token
4. **Backend** returns user + token to **Frontend**
5. **Frontend** stores token and uses for API calls

### **Security Benefits:**
- ✅ **Supabase credentials stay on server**
- ✅ **Custom JWT tokens with your secret**
- ✅ **Rate limiting on backend**
- ✅ **Request validation on backend**
- ✅ **Audit logging on backend**

### **Environment Variables:**
Your backend already has the correct Supabase credentials:
```bash
SUPABASE_URL="https://vrxsdtmsvdjpteynqnqc.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **Frontend Environment Variables:**
Your frontend now only needs:
```bash
VITE_NODE_BACKEND_URL=https://web-production-8d00b.up.railway.app
VITE_API_URL=https://web-production-8d00b.up.railway.app
```

**No more direct Supabase credentials needed in frontend!**

## **🎯 Next Steps**

1. **Implement the backend endpoints above**
2. **Test each endpoint with Postman/curl**
3. **Update frontend to use new AuthService**
4. **Remove VITE_SUPABASE_* environment variables from frontend**
5. **Test complete authentication flow**

## **🔍 Testing the New Flow**

After implementation, test:
- ✅ **Registration** → Backend → Supabase
- ✅ **Login** → Backend → Supabase → JWT
- ✅ **Profile access** → JWT validation
- ✅ **Token refresh** → New JWT
- ✅ **Logout** → Token invalidation

**This architecture is much more secure and follows industry best practices!**
