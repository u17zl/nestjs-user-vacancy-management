export default () => ({
    port: parseInt(process.env.COMPANY_SERVICE_PORT, 10) || 3002,
    database: {
      host: process.env.COMPANY_DATABASE_HOST || 'localhost',
      port: parseInt(process.env.COMPANY_DATABASE_PORT, 10) || 27019
    },
    auth_check_service: {
      host: process.env.AUTH_MICROSERVICE_HOST || 'localhost',
      port: parseInt(process.env.AUTH_MICROSERVICE_PORT, 10) || 4000
    }
  });