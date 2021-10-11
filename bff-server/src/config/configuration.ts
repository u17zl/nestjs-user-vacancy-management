export default () => ({
  bff_server_port: parseInt(process.env.BFF_SERVER_PORT, 10) || 3000,
  user_microservice_base_url: `http://${
    process.env.USER_MICROSERVICE_HOST
  }:${parseInt(process.env.USER_MICROSERVICE_PORT, 10) || 3001}`,
  company_microservice_base_url: `http://${
    process.env.COMPANY_MICROSERVICE_HOST
  }:${parseInt(process.env.COMPANY_MICROSERVICE_PORT, 10) || 3002}`,
  vacancy_microservice_base_url: `http://${
    process.env.VACANCY_MICROSERVICE_HOST
  }:${parseInt(process.env.VACANCY_MICROSERVICE_PORT, 10) || 3003}`,
});
