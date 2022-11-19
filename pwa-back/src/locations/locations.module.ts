import { forwardRef, Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationsRepository } from './locations.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './locations.schema';
import { RumorsModule } from '../rumors/rumors.module';
import { LocationExistRule } from './_utils/location-exist.rule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
    forwardRef(() => RumorsModule),
  ],
  controllers: [LocationsController],
  providers: [LocationsService, LocationsRepository, LocationExistRule],
  exports: [LocationsService, LocationsRepository],
})
export class LocationsModule {}
