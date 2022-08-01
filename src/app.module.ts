import { ArticleModul } from './article/article.module';
import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common'
import {AppController} from '@app/app.controller'
import {AppService} from '@app/app.service'
import {TagModule} from '@app/tag/tag.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import ormconfig from '@app/ormconfig'
import {UserModule} from './user/user.module'
import {AuthMiddleware} from './user/middlewares/auth.middleware'

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule, UserModule, ArticleModul],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
