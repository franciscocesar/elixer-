import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './store/store.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://franciscocsar:chico_hd2014@database.geztvc1.mongodb.net/?retryWrites=true&w=majority',
    ),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
