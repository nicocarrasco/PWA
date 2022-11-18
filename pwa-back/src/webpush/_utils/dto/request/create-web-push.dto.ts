import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWebPushDto {
  @ApiProperty()
  @IsString()
  endpoint: string;

  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  auth: string;
}
