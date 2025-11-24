import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { TimingInterceptor } from './common/interceptors/timing.interceptor';
import cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Riwi Sportsline API")
  .setDescription("Documentacion de la API del e-commerce Riwi Sportsline")
  .setVersion("1.0.0")
  .addBearerAuth({
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "Authorization",
    in: "header"
  })
  .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  const port = process.env.PORT || 3000;

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new TimingInterceptor());
  app.use(cookieParser())

  await app.listen(port);
  console.log('Swagger UI: http://localhost:3000/api');
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
