import { history } from '@@/core/history';
import { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import { Link } from '@umijs/max';
import React from 'react';

export const menuItemRender = (
  menuItemProps: MenuDataItem,
  defaultDom: React.ReactNode,
) => {
  if (menuItemProps.isUrl || menuItemProps.children) {
    return defaultDom;
  }
  if (menuItemProps.path && location.pathname !== menuItemProps.path) {
    return (
      // handle wildcard route path, for example /slave/* from qiankun
      <Link
        to={menuItemProps.path.replace('/*', '')}
        target={menuItemProps.target}
      >
        {defaultDom}
      </Link>
    );
  }
  return defaultDom;
};

export const onMenuHeaderClick = () => {
  history.push('/home');
};
