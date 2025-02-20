import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*', credentials: true })

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(3000, '0.0.0.0', async () => {

    const url = await app.getUrl()

    const logger = new Logger('NestApplication')

    logger.log(`🚀 Server is running on ${url}`)

    if (module.hot) {
      module.hot.accept()
      module.hot.dispose(() => app.close())
    }
  })

}
bootstrap();
