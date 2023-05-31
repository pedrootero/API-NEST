import { SmsService, SnsService } from 'nest-sns';

export class SendMsg {
  private snsService = new SnsService();
  private smsService = new SmsService();

  constructor() {}

  async sendSms(cel, nome, evento) {
    const smsOptions = {
      PhoneNumber: cel,
      Message: `Olá ${nome}, gostariamos de contar com sua presença para o ${evento}`,
    };

    try {
      const response = await this.smsService.sendSMS(smsOptions);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    const publishOptions = {
      TopicArn: 'arn:aws:sns:region:account-id:my-topic',
      Message: 'Hello, this is a test message.',
    };

    try {
      const response = await this.snsService.publish(publishOptions);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
