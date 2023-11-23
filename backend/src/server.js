import config from './config/config.js';
import app from './app.js';
import connectDB from './config/db.js';
import logger from './config/logger.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';

const serverPort = config.server.port || 3000;

// Connect database
connectDB();

// Add route
app.use('/v1/auth', authRoute);
app.use('/v1/users', userRoute);

// Listen port
const server = app.listen(serverPort, () => {
  logger.info(`
    #########################################
     Server listening on port: ${serverPort}
    #########################################
  `);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
