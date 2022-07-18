import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  model: {},
  request: {},
  title: 'hw',
  favicons: ['/assets/logo.png'],
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
  },
  routes,
  npmClient: 'yarn',
  plugins: [require.resolve('umi-plugin-browser')],
});
