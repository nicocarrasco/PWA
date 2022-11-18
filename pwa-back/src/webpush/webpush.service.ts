import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../_utils/config/env.config';
import { CreateWebPushDto } from './_utils/dto/request/create-web-push.dto';

@Injectable()
export class WebpushService {
  constructor(private readonly config: ConfigService<EnvironmentVariables, true>) {
    webpush.setVapidDetails(
      'mailto:example@atiteux.fr',
      this.config.get('WEBPUSH_PUBLIC_KEY'),
      this.config.get('WEBPUSH_PRIVATE_KEY'),
    );
  }

  getWebPushPublicKey = () => ({ publicKey: this.config.get('WEBPUSH_PUBLIC_KEY') });

  senNotificationPush(createWebPushDto: CreateWebPushDto) {
    const pushSubscription = {
      endpoint: createWebPushDto.endpoint,
      keys: {
        auth: createWebPushDto.auth,
        p256dh: createWebPushDto.token,
      },
    };

    return webpush.sendNotification(pushSubscription, 'Your Push Payload Text');
  }
}
