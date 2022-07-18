import { ProLayout } from '@ant-design/pro-layout';
import type { IRoute } from 'umi';
import { Outlet, useAppData, useIntl, useLocation, useModel } from 'umi';
// 过滤出需要显示的路由, 这里的filterFn 指 不希望显示的层级
const filterRoutes = (
  routes: IRoute[],
  filterFn: (route: IRoute) => boolean,
) => {
  if (routes.length === 0) {
    return [];
  }

  let newRoutes = [];
  for (const route of routes) {
    if (filterFn(route)) {
      if (Array.isArray(route.routes)) {
        newRoutes.push(...filterRoutes(route.routes, filterFn));
      }
    } else {
      newRoutes.push(route);
      if (Array.isArray(route.routes)) {
        route.routes = filterRoutes(route.routes, filterFn);
      }
    }
  }

  return newRoutes;
};
export default () => {
  const [setting] = useModel('setting');
  const { clientRoutes } = useAppData();
  const location = useLocation();
  const { formatMessage } = useIntl();
  const newRoutes = filterRoutes(
    clientRoutes.filter((route) => route.isLayout),
    (route) => {
      return !!route.isLayout;
    },
  );
  return (
    <ProLayout
      {...setting?.defaultLayoutSetting}
      location={location}
      formatMessage={formatMessage}
      route={{
        routes: newRoutes,
      }}
    >
      <Outlet />
    </ProLayout>
  );
};
