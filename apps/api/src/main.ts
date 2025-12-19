import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = Number(process.env.API_PORT ?? 4000);
  await app.listen(port, "0.0.0.0");
  console.log(`[api] listening on :${port}`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
