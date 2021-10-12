export default () => ({
    port: parseInt(process.env.VACANCY_SERVICE_PORT, 10) || 3003,
    database: {
      host: process.env.VACANCY_DATABASE_HOST || 'localhost',
      port: parseInt(process.env.VACANCY_DATABASE_PORT, 10) || 27020
    },
    auth_check_service: {
      host: process.env.AUTH_MICROSERVICE_HOST || 'localhost',
      port: parseInt(process.env.AUTH_MICROSERVICE_PORT, 10) || 4000
    }
  });