import { notification } from 'antd';

import codeMessage from './codeMessage';

const successHandler = (
  response,
  options = { notifyOnSuccess: false, notifyOnFailed: true }
) => {
  const { data, status } = response;
  const message = data?.message || codeMessage[status];
  const notificationConfig = {
    duration: 5,
  };
  if (data?.success === true && options.notifyOnSuccess) {
    notification.success({
      message: `Request success`,
      description: message,
      ...notificationConfig,
    });
  } else if (options.notifyOnFailed) {
    notification.error({
      message: `Request error ${status}`,
      description: message,
      ...notificationConfig,
    });
  }
};

export default successHandler;
