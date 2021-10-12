export default () => ({
    port: parseInt(process.env.USER_SERVICE_PORT, 10) || 3001,
    database: {
      host: process.env.USER_DATABASE_HOST || 'localhost',
      port: parseInt(process.env.USER_DATABASE_PORT, 10) || 27018
    },
    jwt_secret: process.env.JWT_SECRET || 'jwt_secret_key',
    auth_check_service: {
      host: process.env.AUTH_MICROSERVICE_HOST || 'localhost',
      port: parseInt(process.env.AUTH_MICROSERVICE_PORT, 10) || 4000
    }
  });