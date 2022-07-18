import type { CurrentUser } from '@/ww/services/user';
import { useState } from 'react';

export default () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({});
  return [currentUser, setCurrentUser];
};
