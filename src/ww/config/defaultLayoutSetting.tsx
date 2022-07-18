import icon from '@/ww/resources/imgs/logo.png';
import RightContent from '../components/RightContent';
import { menuItemRender, onMenuHeaderClick } from './configFnData';
export default {
  title: 'hw',
  navTheme: 'light',
  fixSiderbar: true,
  onMenuHeaderClick,
  menuItemRender,
  name: 'hw',
  logo: <img alt="logo" src={icon} />,
  rightContentRender: () => {
    return <RightContent />;
  },
};
