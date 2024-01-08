import { Get, Controller } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),

      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: 0.9,
        }),

      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),

      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),

      () =>
        this.http.responseCheck(
          'my-website',
          'https://bibekmanandhar.com.np',
          (res) => res.status === 204,
        ),

      () => this.db.pingCheck('todos'),

      () => this.db.pingCheck('files'),
    ]);
  }
}
