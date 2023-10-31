import { TestModule } from "./test.module";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(TestModule);

    // Start Swagger
    const options = new DocumentBuilder()
        .setTitle("BlueSG Pagination TEST App")
        .setDescription(
            "This API display an example of usage for the Pagination library"
        )
        .setVersion("1.0.0")
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("/swagger", app, document);

    await app.listen(8585);

    Logger.log(`🚀 Application is running on: http://localhost:${8585}`);
}

bootstrap().catch(Logger.error);
