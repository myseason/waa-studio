import { Module } from "@nestjs/common";
import { HealthController } from "../routes/health.controller";
import { AiController } from "../routes/ai.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HealthController, AiController],
})
export class AppModule {}
