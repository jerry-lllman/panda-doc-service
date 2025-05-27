import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { DocumentCollaborationModule } from './modules/document-collaboration/document-collaboration.module';
import { DocumentModule } from './modules/document/document.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'
import config from '@/config'
import { AllExceptionFilter } from '@/common/filters/any-exception.filter'
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
      load: [...Object.values(config)],
    }),
    SharedModule,
    PrismaModule,
    DocumentCollaborationModule,
    DocumentModule
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useFactory: () => new TimeoutInterceptor(15 * 1000) },
  ],
})
export class AppModule { }