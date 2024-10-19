import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from './pipes/validation.pipe'
import { INestApplication } from '@nestjs/common'

async function start(): Promise<void> {
	const PORT: string | number = process.env.PORT || 5000
	const app: INestApplication = await NestFactory.create(AppModule)
	app.enableCors({
		origin: 'http://localhost:3000',
		credentials: true
	})

	const config: Omit<OpenAPIObject, any> = new DocumentBuilder()
		.setTitle('Social Network')
		.setDescription('Документация REST API')
		.setVersion('1.0.0')
		.addTag('Aзирет')
		.build()
	const document: OpenAPIObject = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)

	app.useGlobalPipes(new ValidationPipe())

	await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start().then()
