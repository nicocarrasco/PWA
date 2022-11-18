import { Body, Controller, Get, Post } from '@nestjs/common';
import { WebpushService } from './webpush.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWebPushDto } from './_utils/dto/request/create-web-push.dto';

@Controller('webpush')
@ApiTags('Webpush')
export class WebpushController {
  constructor(private readonly webpushService: WebpushService) {}

  @Get()
  @ApiOperation({ summary: 'Récupére la clef publique webpush' })
  getWebPushPublicKey() {
    return this.webpushService.getWebPushPublicKey();
  }

  @Post()
  @ApiOperation({ summary: 'Push un token webpush' })
  createWebPushBrowser(@Body() createWebPushDto: CreateWebPushDto) {
    return this.webpushService.senNotificationPush(createWebPushDto);
  }
}
