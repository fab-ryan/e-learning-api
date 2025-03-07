import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { PrometheusController } from './prometheus.controller';
import { PrometheusModule as PrometheusModules } from '@willsoto/nestjs-prometheus';
@Module({
  imports: [
    PrometheusModules.register({
      defaultMetrics: {
        enabled: true,
      },
      global: true,

    })
  ],
  controllers: [PrometheusController],
  providers: [PrometheusService,],
})
export class PrometheusModule { }
