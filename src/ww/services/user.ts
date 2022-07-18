import request from '@/ww/utils/request';
type CurrentUserModal = {
  account: string;
  accountName: string;
  appKeyList: string[];
  authData: string;
  devicePwd: string;
  headImg: string;
  mobile: string;
  name: string;
  token: string;
  type: string;
  remark: string;
};
export type CurrentUser = Hw.ToUnstabitily<CurrentUserModal>;
export const currentUser = () => {
  return request<CurrentUser>({
    url: '/currentUser',
    method: 'GET',
    alert: false,
  });
};
