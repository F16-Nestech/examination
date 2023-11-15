import mongoose from 'mongoose';
import config from './config.js';

// connect database
const connectDB = async () => {
  const DB = `mongodb://${config.db.url}:${config.db.port}/`;

  mongoose.set('autoIndex', true);

  const con = await mongoose.connect(DB, {
    autoIndex: true,
  });

  console.log(`Mongodb Connected: ${con.connection.host}`);

  mongoose.connection.on('connecting', () => {
    console.info('Connecting to Database');
  });

  mongoose.connection.on('connected', () => {
    console.info('Connected to Database');
  });

  mongoose.connection.on('error', (err) => {
    console.error(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.info('Connection is disconnected');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default connectDB;
