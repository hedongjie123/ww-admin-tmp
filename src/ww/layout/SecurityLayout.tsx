import { PageLoading } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Outlet, useModel, useNavigate } from 'umi';
import { currentUser } from '../services/user';
export default () => {
  const [, setCurrentUser] = useModel('currentUser');
  const navigate = useNavigate();
  const { loading } = useRequest(currentUser, {
    onSuccess: (result) => {
      setCurrentUser(result);
    },
    onError: () => {
      navigate('/login', { replace: true });
    },
  });
  if (loading) {
    return <PageLoading />;
  }
  return <Outlet />;
};
