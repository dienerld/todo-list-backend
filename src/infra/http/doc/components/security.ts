const securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  }
};

export { securitySchemes };
