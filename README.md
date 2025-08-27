[![CircleCI](https://dl.circleci.com/status-badge/img/gh/fab-ryan/e-learning-api/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/fab-ryan/e-learning-api/tree/main)
[![Coverage Status](https://coveralls.io/repos/github/fab-ryan/e-learning-api/badge.svg)](https://coveralls.io/github/fab-ryan/e-learning-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/b78a6f52e1e387547aa3/maintainability)](https://codeclimate.com/github/fab-ryan/e-learning-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b78a6f52e1e387547aa3/test_coverage)](https://codeclimate.com/github/fab-ryan/e-learning-api/test_coverage)

![](https://img.shields.io/badge/Maintained-Yes-green)
![](https://img.shields.io/badge/Pull_Requests-Accepting-green)
![](https://img.shields.io/badge/Contributions-Accepting-cyan)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=&logoColor=%2361DAFB) 
![CircleCI](https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white)

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A comprehensive E-Learning API built with NestJS and TypeScript. This platform provides a complete backend solution for online education, featuring course management, user authentication, lesson tracking, quizzes, and more.

### Features

- **User Management**: User registration, authentication, and profile management
- **Course Management**: Create, update, and organize courses with categories
- **Lesson System**: Structured lessons with content delivery
- **Quiz & Assessment**: Interactive quizzes for learning evaluation
- **Category Organization**: Organize courses by categories for better navigation
- **File Upload**: Support for course materials and media uploads
- **Authentication**: Secure JWT-based authentication system
- **Monitoring**: Integrated with Prometheus for performance monitoring
- **Documentation**: Auto-generated API documentation

## Installation

```bash
$ yarn install
```

## Available Scripts

### Development
```bash
# Start development server with hot reload
$ yarn run start:dev

# Start application normally
$ yarn run start

# Start with debug mode and watch for changes
$ yarn run start:debug
```

### Production
```bash
# Build the application
$ yarn run build

# Start production server
$ yarn run start:prod
```

### Testing
```bash
# Run unit tests
$ yarn run test

# Run tests in watch mode
$ yarn run test:watch

# Run tests with coverage report
$ yarn run test:cov

# Run tests in debug mode
$ yarn run test:debug

# Run end-to-end tests
$ yarn run test:e2e
```

### Code Quality
```bash
# Format code with Prettier
$ yarn run format

# Lint and fix code issues
$ yarn run lint
```

### Documentation
```bash
# Generate API documentation
$ yarn run documentation
```

### Monitoring (Prometheus)
```bash
# Start Prometheus monitoring
$ yarn run start:prometheus

# Stop Prometheus monitoring
$ yarn run stop:prometheus
```

## Support

This is an open source e-learning API project. Contributions and feedback are welcome to help improve the platform and make online education more accessible.

## License

This project is [MIT licensed](LICENSE).
