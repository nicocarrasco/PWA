import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateRumorDto {
  @ApiProperty()
  @IsString()
    content: string;
}
