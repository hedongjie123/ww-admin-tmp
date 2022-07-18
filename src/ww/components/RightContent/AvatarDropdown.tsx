import { outLogin } from '@/ww/services/login';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
type MenuClick = (event: MenuInfo) => void;
const menu = (onClick: MenuClick) => {
  return (
    <Menu
      onClick={onClick}
      items={[
        {
          label: '账号设置',
          key: 'setting',
          icon: <UserOutlined />,
        },
        {
          label: '修改密码',
          key: 'pwd',
          icon: <SettingOutlined />,
        },
        {
          label: '退出登录',
          key: 'loginOut',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};
const AvatarDropdown: React.FC = () => {
  const [currentUser] = useModel('currentUser');
  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === 'loginOut') {
      loginOut();
      return;
    }
  }, []);
  return (
    <HeaderDropdown overlay={menu(onMenuClick)}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          alt="avatar"
          src={currentUser.headImg}
        />
        <span className={`${styles.name} anticon`}>hw</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
