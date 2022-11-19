import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../_utils/config/env.config';
import { UserDocument } from '../users/user.schema';

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

  senNotificationPush(user: UserDocument, content: string) {
    if (!user.webpush) return;
    const pushSubscription = {
      endpoint: user.webpush.endpoint,
      keys: {
        auth: user.webpush.auth,
        p256dh: user.webpush.token,
      },
    };
    return webpush.sendNotification(pushSubscription, content);
  }
}
