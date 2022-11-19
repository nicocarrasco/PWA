import { LocationDocument } from './locations.schema';
import { GetLocationDto } from './_utils/dto/response/get-location.dto';

export class LocationsMapper {
  static toGetLocationDto = (location: LocationDocument): GetLocationDto => ({
    id: location._id,
    location: location.location,
  });
}
