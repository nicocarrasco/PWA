import { ApiProperty } from '@nestjs/swagger';

export class GetLocationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  location: string;
}
