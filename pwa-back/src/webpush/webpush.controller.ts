import { Controller, Get } from '@nestjs/common';
import { WebpushService } from './webpush.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('webpush')
@ApiTags('Webpush')
export class WebpushController {
  constructor(private readonly webpushService: WebpushService) {}

  @Get()
  @ApiOperation({ summary: 'Récupére la clef publique webpush' })
  getWebPushPublicKey() {
    return this.webpushService.getWebPushPublicKey();
  }
}
