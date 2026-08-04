import swaggerUi from 'swagger-ui-express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'GYMNEX Enterprise REST API Documentation',
    version: '2.0.0',
    description: 'Production OpenAPI REST documentation for GYMNEX SaaS platform endpoints including Auth, Branches, Members, Trainers, Programs, Classes, Bookings, Attendance, Payments, Equipment, Reviews, Events, Notifications, Contact, and Corporate Wellness.'
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Local Express Development Server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(swaggerDocument);
