import request from '@/ww/utils/request';
export type LoginParams = {
  username?: string;
  password?: string;
  autoLogin?: boolean;
  type?: string;
};
export type CaptchaParams = {
  phone: string;
};
export type LoginResultData = {
  authorization: string;
};
export const login = (params: LoginParams) => {
  return request<LoginResultData>({
    url: '/login/account',
    data: params,
    alert: false,
  });
}; //登录

export const getFakeCaptcha = (params: CaptchaParams) => {
  return request({
    url: '/login/captcha',
    data: params,
    method: 'GET',
    successMsg: '获取验证码成功！验证码为：1234',
  });
}; //验证码

export const outLogin = () => {
  return request({
    url: '/login/outLogin',
    method: 'POST',
  });
}; //退出
