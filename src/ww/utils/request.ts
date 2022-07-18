import { message } from 'antd';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import requestDefaultSetting from '../config/requestDefaultSetting';

interface RequestConfig<D> extends AxiosRequestConfig<D> {
  alert?: boolean;
  successMsg?: string;
  errorMsg?: string;
}

const showAlert = (
  isAlert: boolean,
  msg: string,
  type: 'success' | 'error' = 'success',
) => {
  if (!isAlert) {
    return;
  }
  message[type](msg);
};

function request<R = any, D = any>(config: RequestConfig<D>) {
  const authorization = sessionStorage.getItem('u-token');
  const header = {
    ...requestDefaultSetting?.header,
    ...config?.header,
    authorization,
  };
  const reqConfig = { ...requestDefaultSetting, ...config, header };
  const { alert, errorMsg, successMsg, ...axiosConfig } = reqConfig;

  return new Promise<R>((resolve, reject) => {
    axios
      .request(axiosConfig)
      .then((resultData) => {
        const { status, data } = resultData;
        if (status !== 200) {
          showAlert(alert, errorMsg, 'error');
          return reject(new Error('网络错误!'));
        }
        const { code, msg, data: reqData } = data;
        if (code !== 200) {
          showAlert(alert, msg, 'error');
          return reject(new Error(msg));
        }
        showAlert(alert, successMsg, 'success');
        return resolve(reqData);
      })
      .catch((error) => {
        showAlert(alert, errorMsg, 'error');
        reject(error);
      });
  });
}

export default request;
