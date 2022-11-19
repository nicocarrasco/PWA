import { forwardRef, Module } from '@nestjs/common';
import { RumorsService } from './rumors.service';
import { RumorsController } from './rumors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rumor, RumorSchema } from './rumors.schema';
import { RumorsRepository } from './rumors.repository';
import { WebpushModule } from '../webpush/webpush.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rumor.name, schema: RumorSchema }]),
    forwardRef(() => WebpushModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [RumorsController],
  providers: [RumorsService, RumorsRepository],
  exports: [RumorsService, RumorsRepository],
})
export class RumorsModule {}
