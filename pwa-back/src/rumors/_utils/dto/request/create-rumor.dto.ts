import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRumorDto {
  @ApiProperty()
  @IsString()
  content: string;
}
