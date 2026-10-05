import dotenv from 'dotenv';
dotenv.config();

export const SECURITY_CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // JWT Cryptographic Parameters
  JWT: {
    SECRET: process.env.JWT_SECRET || 'careguard_default_clinical_jwt_secret_token_key_2026',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'careguard_default_clinical_refresh_secret_vault_2026',
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    ALGORITHM: 'HS256'
  },

  // Password Security Guidelines
  BCRYPT_SALT_ROUNDS: 12,

  // Rate Limiting Settings
  RATE_LIMITS: {
    GLOBAL_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    GLOBAL_MAX: 200,
    AUTH_WINDOW_MS: 15 * 60 * 1000,
    AUTH_MAX: 10,
    PASSWORD_RESET_MAX: 5
  },

  // Cookie Security
  COOKIE: {
    HTTP_ONLY: true,
    SECURE: process.env.NODE_ENV === 'production',
    SAME_SITE: 'lax',
    MAX_AGE: 7 * 24 * 60 * 60 * 1000 // 7 days for refresh token
  },

  // CORS Whitelist
  CORS: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token']
  },

  // HTTP Strict Transport Security & Content Security Policy
  HELMET: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
        connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5000"]
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: { action: 'sameorigin' },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  }
};
