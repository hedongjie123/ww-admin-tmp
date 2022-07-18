import { history } from 'umi';

interface QueryParams {
  redirect?: string;
}

export const push = (params: QueryParams) => {
  const { redirect = '/home' } = params; //我也不知道为什么，编辑器要报错不这样写
  if (redirect.startsWith('http') || redirect.startsWith('https')) {
    window.location.href = redirect;
    return;
  }
  history.push(redirect);
};
