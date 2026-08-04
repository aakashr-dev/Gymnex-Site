import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Pre-configure DNS resolution for MongoDB Atlas URIs on Windows
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if unsupported
}

export const connectDB = async () => {
  const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gymnex_db';

  if (!connUri) {
    console.warn('⚠️ [MONGODB WARNING] MONGO_URI is undefined in .env. Running with hybrid fallback memory mode.');
    return false;
  }

  const isAtlas = connUri.includes('mongodb+srv');

  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000
    });
    console.log(`🍃 [MONGODB ${isAtlas ? 'ATLAS CLOUD' : 'LOCAL'}] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [MONGODB WARNING] Connection failed (${error.message}). Running with hybrid fallback memory mode.`);
    return false;
  }
};

