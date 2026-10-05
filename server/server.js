import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { SECURITY_CONFIG } from './config/security.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';

// Route handlers
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import securityRoutes from './routes/securityRoutes.js';

const app = express();

// 1. Strict Transport Security & Security Headers via Helmet
app.use(helmet(SECURITY_CONFIG.HELMET));

// 2. CORS configuration with credentials whitelist
app.use(cors(SECURITY_CONFIG.CORS));

// 3. Cookie parser for HttpOnly session / refresh cookies
app.use(cookieParser());

// 4. JSON body parsing with strict payload size limiter (100kb to mitigate memory DOS)
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// 5. Global API Rate Limiting
app.use('/api', apiRateLimiter);

// 6. Root Health & Security Gateway Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'CareGuard Clinical Security Gateway',
    timestamp: new Date().toISOString(),
    securityHeaders: 'Enforced',
    zeroTrustMode: 'Active'
  });
});

// 7. Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/security', securityRoutes);

// 8. 404 Route Fallback
app.use((req, res) => {
  res.status(404).json({
    error: 'The requested API endpoint does not exist or has been restricted.',
    code: 'NOT_FOUND'
  });
});

// 9. Centralized Error Handling Middleware (Section 19: Error Handling)
// Never exposes internal stack traces, DB connection strings, or system paths
app.use((err, req, res, next) => {
  console.error('[CareGuard Security Daemon Error]', err.message);

  // Sanitized generic response
  res.status(err.status || 500).json({
    error: 'Something went wrong. Please try again later.',
    code: 'SEC_INTERNAL_ERROR'
  });
});

const PORT = SECURITY_CONFIG.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[CareGuard Security Gateway] Running on http://localhost:${PORT}`);
  console.log(`[CareGuard Security Gateway] Zero-Trust Enclave Active • Port: ${PORT}`);
});

export default app;
