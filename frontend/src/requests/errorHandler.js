import { notification } from 'antd';

import codeMessage from './codeMessage';

const errorHandler = (error) => {
  const { response } = error;
  const notificationConfig = {
    duration: response ? 10 : 5,
  };
  if (response && response.status) {
    const message = response.data?.message || codeMessage[response.status];
    notification.error({
      message: `Request error ${response.status}`,
      description: message,
      ...notificationConfig,
    });
    return response.data;
  } else {
    notification.error({
      message: 'No internet connection',
      description: 'Cannot connect to the server. Check your internet network',
      ...notificationConfig,
    });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server. Check your internet network',
    };
  }
};

export default errorHandler;
