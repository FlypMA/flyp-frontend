# 🔒 Backend Authentication Implementation Guide

## 🎯 **SECURE ARCHITECTURE: Frontend → Backend API → Supabase**

Your frontend now implements the secure HTTP-only cookie pattern. Here's exactly what your backend needs to implement.

## **🔧 Backend Requirements**

### **Environment Variables (Already Set)**
```bash
SUPABASE_URL="https://vrxsdtmsvdjpteynqnqc.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
JWT_SECRET="hosjepimmiesap"
CORS_ORIGIN="https://betweendeals-frontend.vercel.app"
```

### **Required Dependencies**
```bash
npm install @supabase/supabase-js jsonwebtoken cookie-parser cors
npm install --save-dev @types/jsonwebtoken @types/cookie-parser
```

## **🚀 API Endpoints to Implement**

### **1. POST /api/auth/register**
```typescript
// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Create user in Supabase
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name,
        role: role || 'buyer',
      },
      email_confirm: false, // Set to true if you want email verification
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: data.user.id, 
        email: data.user.email,
        role: role || 'buyer'
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.cookie('flyp_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user data (no sensitive info)
    res.json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: name,
          role: role || 'buyer',
          verified: data.user.email_confirmed_at !== null,
        },
        requiresVerification: !data.user.email_confirmed_at,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Registration failed',
    });
  }
});
```

### **2. POST /api/auth/login**
```typescript
// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        error: error.message,
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: data.user.id, 
        email: data.user.email,
        role: data.user.user_metadata?.role || 'buyer'
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.cookie('flyp_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user data
    res.json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email,
          role: data.user.user_metadata?.role || 'buyer',
          verified: data.user.email_confirmed_at !== null,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Login failed',
    });
  }
});
```

### **3. POST /api/auth/logout**
```typescript
// Logout user
app.post('/api/auth/logout', async (req, res) => {
  try {
    // Clear HTTP-only cookie
    res.clearCookie('flyp_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // Optional: Invalidate Supabase session if you have the token
    // const token = req.cookies.flyp_session;
    // if (token) {
    //   await supabase.auth.admin.signOut(token);
    // }

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Logout failed',
    });
  }
});
```

### **4. GET /api/auth/me**
```typescript
// Get current user (auth check)
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    // User data is attached by authenticateToken middleware
    const user = req.user;

    // Optionally verify with Supabase
    const { data, error } = await supabase.auth.admin.getUserById(user.userId);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email,
          role: data.user.user_metadata?.role || 'buyer',
          verified: data.user.email_confirmed_at !== null,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Auth check failed',
    });
  }
});
```

### **5. POST /api/auth/refresh**
```typescript
// Refresh session
app.post('/api/auth/refresh', authenticateToken, async (req, res) => {
  try {
    const user = req.user;

    // Create new JWT token
    const newToken = jwt.sign(
      { 
        userId: user.userId, 
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set new HTTP-only cookie
    res.cookie('flyp_session', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Get fresh user data from Supabase
    const { data, error } = await supabase.auth.admin.getUserById(user.userId);

    if (error) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email,
          role: data.user.user_metadata?.role || 'buyer',
          verified: data.user.email_confirmed_at !== null,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Session refresh failed',
    });
  }
});
```

### **6. POST /api/auth/forgot-password**
```typescript
// Request password reset
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.CORS_ORIGIN}/reset-password`,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Password reset failed',
    });
  }
});
```

### **7. POST /api/auth/reset-password**
```typescript
// Reset password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { password, token } = req.body;

    if (token) {
      // Reset with token (from email link)
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    } else {
      // Reset for authenticated user
      const authHeader = req.cookies.flyp_session;
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
      }

      // Verify token and update password
      const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
      const { error } = await supabase.auth.admin.updateUserById(
        decoded.userId,
        { password: password }
      );

      if (error) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    }

    res.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Password update failed',
    });
  }
});
```

### **8. POST /api/auth/verify-email**
```typescript
// Verify email
app.post('/api/auth/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    // Create JWT token for verified user
    const jwtToken = jwt.sign(
      { 
        userId: data.user.id, 
        email: data.user.email,
        role: data.user.user_metadata?.role || 'buyer'
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.cookie('flyp_session', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email,
          role: data.user.user_metadata?.role || 'buyer',
          verified: true,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Email verification failed',
    });
  }
});
```

## **🛡️ Authentication Middleware**

```typescript
// Middleware to authenticate JWT from HTTP-only cookie
function authenticateToken(req, res, next) {
  const token = req.cookies.flyp_session;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token',
    });
  }
}
```

## **🔧 Express Setup**

```typescript
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true, // CRITICAL: Allow cookies
}));

// Your auth routes here...
```

## **✅ Security Benefits**

- ✅ **HTTP-only cookies** (XSS protection)
- ✅ **Supabase credentials on server only**
- ✅ **CSRF protection via SameSite**
- ✅ **JWT tokens not accessible to JavaScript**
- ✅ **Secure cookie flags in production**

## **🚀 Testing**

After implementation, test with:
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User","role":"buyer"}' \
  -c cookies.txt

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Check auth
curl -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt

# Logout
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

**This architecture provides enterprise-grade security for your authentication system!**
