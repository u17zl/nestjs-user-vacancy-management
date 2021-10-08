export default () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 27018
    },
    jwt_secret: 'jwt_secret_key'
  });