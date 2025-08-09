# Prometheus Monitoring Setup

This directory contains the Prometheus monitoring setup for the E-Learning API.

## Overview

The monitoring stack includes:
- **Prometheus**: Metrics collection and storage
- **Grafana**: Metrics visualization and dashboards
- **Custom metrics**: Application-specific metrics for the e-learning platform

## Quick Start

### 1. Start the monitoring stack

```bash
./scripts/start-prometheus.sh
```

This will start both Prometheus and Grafana using Docker Compose.

### 2. Start your NestJS application

```bash
npm run start:dev
```

### 3. Access the monitoring tools

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin)
- **App Metrics**: http://localhost:5200/metrics

## Available Metrics

### Default Metrics
- Node.js process metrics (CPU, memory, GC, etc.)
- Event loop lag
- HTTP request duration and count

### Custom E-Learning Metrics
- `http_requests_total`: Total HTTP requests by method, route, and status
- `http_request_duration_seconds`: HTTP request duration histogram
- `active_users_total`: Number of currently active users
- `course_enrollments_total`: Total course enrollments by course ID
- `quiz_completions_total`: Total quiz completions by quiz ID and status

## Grafana Dashboard

Import the pre-configured dashboard:
1. Open Grafana at http://localhost:3000
2. Login with admin/admin
3. Go to "+" → Import
4. Upload the `grafana-dashboard.json` file
5. Configure Prometheus data source: http://prometheus:9090

## Using Metrics in Your Code

The PrometheusService is globally available. Example usage:

```typescript
import { PrometheusService } from './modules/prometheus';

@Injectable()
export class SomeService {
  constructor(private prometheusService: PrometheusService) {}

  async enrollUserInCourse(courseId: string) {
    // Your enrollment logic here
    
    // Track the enrollment
    this.prometheusService.incrementCourseEnrollments(courseId);
  }

  async completeQuiz(quizId: string, passed: boolean) {
    // Your quiz logic here
    
    // Track the completion
    this.prometheusService.incrementQuizCompletions(
      quizId, 
      passed ? 'passed' : 'failed'
    );
  }
}
```

## Configuration

### Prometheus Configuration
Edit `prometheus.yml` to modify scraping intervals, add new targets, or configure alerting rules.

### Custom Metrics
Add new metrics in `src/modules/prometheus/prometheus.service.ts`.

## Alerting

To set up alerting:
1. Configure alerting rules in `prometheus.yml`
2. Set up Alertmanager
3. Configure notification channels in Grafana

## Production Considerations

- Use persistent volumes for data storage
- Set up proper authentication and SSL
- Configure retention policies
- Set up backup strategies
- Consider using a time-series database like InfluxDB for larger scales

## Stopping the Stack

```bash
./scripts/stop-prometheus.sh
```

## Troubleshooting

### Common Issues

1. **Metrics endpoint not accessible**: Ensure your NestJS app is running on port 5200
2. **Prometheus can't scrape metrics**: Check the targets in Prometheus UI
3. **Grafana can't connect to Prometheus**: Verify the data source configuration

### Useful Prometheus Queries

```promql
# Request rate
rate(http_requests_total[5m])

# Error rate
rate(http_requests_total{status_code=~"5.."}[5m])

# 95th percentile response time
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Top courses by enrollment
topk(10, increase(course_enrollments_total[24h]))
```
