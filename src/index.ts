import {EmailData} from './EmailData';
import {MailData} from './MailData';

export * from './AttachmentData';
export * from './TrackingSettings';
export * from './EmailData';
export * from './MailData';
export * from './MailContent';
export * from './PersonalizationData';
export * from './MailSettings';
export * from './ASMOptions';

export interface MailConfig {
  provider?: string;
  from: EmailData;
  key: string;
  smtp?: SmtpConfig;
}
export interface Address {
  name: string;
  address: string;
}
export interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}
export interface MailService {
  send(mail: MailData): Promise<boolean>;
}
export class SendGridMailService {
  constructor(public apiKey: string) {
    this.sendgrid = require('@sendgrid/mail');
    this.apiKey = apiKey;
    this.send = this.send.bind(this);
  }
  sendgrid: any;
  send(mailData: MailData): Promise<boolean> {
    this.sendgrid.setApiKey(this.apiKey);
    return this.sendgrid.send(mailData).then((result: { statusCode: number; }[]) => {
      if (result[0].statusCode === 200 || result[0].statusCode === 202) {
        return true;
      } else {
        return false;
      }
    }, (err: any) => {
      return err;
    });
  }
}
