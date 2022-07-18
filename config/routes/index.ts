export default [
  {
    path: '/',
    component: '../ww/layout/SecurityLayout',
    isLayout: true,
    routes: [
      {
        path: '/',
        component: '../ww/layout/BasicLayout',
        isLayout: true,
        routes: [
          {
            path: '/home',
            name: 'home',
            component: '../ww/pages/home',
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: '../ww/pages/login',
  },
  {
    path: '*',
    redirect: '/home',
  },
];
