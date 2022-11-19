import { ApiProperty } from '@nestjs/swagger';

export class GetUserLightDto {
  @ApiProperty()
  username: string;
}
