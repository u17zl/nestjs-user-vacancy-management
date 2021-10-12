export default () => ({
  port: parseInt(process.env.BFF_SERVER_PORT, 10) || 3000,
  user_service_base_url: `http://${
    process.env.USER_SERVICE_HOST
  }:${parseInt(process.env.USER_SERVICE_PORT, 10) || 3001}`,
  company_service_base_url: `http://${
    process.env.COMPANY_SERVICE_HOST
  }:${parseInt(process.env.COMPANY_SERVICE_PORT, 10) || 3002}`,
  vacancy_service_base_url: `http://${
    process.env.VACANCY_SERVICE_HOST
  }:${parseInt(process.env.VACANCY_SERVICE_PORT, 10) || 3003}`,
});
