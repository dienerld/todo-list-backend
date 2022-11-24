import { IMailProvider, IMessage } from '@presentation/interfaces';

class MailProviderMock implements IMailProvider {
  async sendMail (message: IMessage): Promise<void> {

  }
}

export { MailProviderMock };
