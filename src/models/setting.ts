import { useState } from 'react';
import defaultLayoutSetting from '../ww/config/defaultLayoutSetting';
export default () => {
  const [setting, setSetting] = useState({ defaultLayoutSetting });
  return [setting, setSetting];
};
