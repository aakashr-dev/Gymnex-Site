import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

import { connectDB } from './config/db.js';
import { seedDatabase } from './config/seed.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import { apiRateLimiter } from './middlewares/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import branchRoutes from './routes/branchRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import programRoutes from './routes/programRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import classRoutes from './routes/classRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import corporateRoutes from './routes/corporateRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Global Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(xss());
app.use('/api', apiRateLimiter);

// API Documentation Endpoint
app.use('/api/docs', serveSwagger, setupSwagger);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/dashboard', analyticsRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/corporate-wellness', corporateRoutes);

// Server Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'GYMNEX Enterprise REST API Server',
    database: 'MongoDB / Mongoose',
    docs: 'http://localhost:5000/api/docs',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

// 404 & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server & Connect MongoDB
const startServer = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    await seedDatabase();
  }

  const listenWithFallback = (portToTry) => {
    const server = app.listen(portToTry, () => {
      console.log(`⚡ [GYMNEX BACKEND] Enterprise REST API Server running on port ${portToTry}`);
      console.log(`🌐 Health check endpoint: http://localhost:${portToTry}/api/health`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${portToTry} is in use. Automatically trying port ${portToTry + 1}...`);
        listenWithFallback(portToTry + 1);
      } else {
        console.error('Server Listen Error:', err);
      }
    });
  };

  listenWithFallback(Number(PORT));
};

startServer();

