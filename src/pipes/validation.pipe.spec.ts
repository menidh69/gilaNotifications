import { ArgumentMetadata } from '@nestjs/common';
import { CustomValidationPipe } from './validation.pipe';
import { SendBulkNotificationDto } from '../dtos/sendBulkNotification.dto';
import { MessageCategories } from '../enums/messageCategories.enum';

describe('validate pipe ', () => {
  it('validate pipe with with sendBulkNotificationDto and throw', async () => {
    let target: CustomValidationPipe = new CustomValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: SendBulkNotificationDto,
      data: '',
    };
    await target
      .transform(<SendBulkNotificationDto>{}, metadata)
      .catch((err) => {
        expect(err.getResponse().message).toContain('Validation failed');
      });
  });

  it('validate pipe with with sendBulkNotificationDto and pass', async () => {
    const sendBulkNotificationDto = {
      message: 'some message',
      messageCategory: MessageCategories.FINANCE,
    };
    let target: CustomValidationPipe = new CustomValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: SendBulkNotificationDto,
      data: '',
    };
    await target
      .transform(<SendBulkNotificationDto>sendBulkNotificationDto, metadata)
      .then((resp) => {
        expect(resp).toStrictEqual(sendBulkNotificationDto);
      });
  });
});
