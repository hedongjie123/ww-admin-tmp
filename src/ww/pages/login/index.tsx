import Footer from '@/ww/components/Footer';
import type { LoginParams } from '@/ww/services/login';
import { getFakeCaptcha, login } from '@/ww/services/login';
import { push } from '@/ww/utils/utils';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-form';
import { useRequest } from 'ahooks';
import { Alert, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  createSearchParams,
  FormattedMessage,
  history,
  useIntl,
  useModel,
} from 'umi';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [setting] = useModel('setting');
  const defaultLayoutSetting = setting?.defaultLayoutSetting || {};
  const { run: loginRun, error: loginErr } = useRequest(login, {
    manual: true,
    onSuccess: ({ authorization }) => {
      sessionStorage.setItem('u-token', authorization);
      const { redirect } = createSearchParams(history.location.search);
      push({ redirect });
    },
  });

  const [type, setType] = useState<string>('account');
  const intl = useIntl();
  const sub = async (value: LoginParams) => {
    const params = { ...value, type };
    loginRun(params);
  };

  useEffect(() => {
    sessionStorage.setItem('u-token', '');
  }, []);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{`${intl.formatMessage({ id: 'menu.login' })}-${
          defaultLayoutSetting.title
        }`}</title>
      </Helmet>
      <div className={styles.bg} />
      <div className={styles.content}>
        <LoginForm
          logo={defaultLayoutSetting.logo}
          title={defaultLayoutSetting.title}
          subTitle={intl.formatMessage({
            id: 'pages.layouts.userLayout.title',
          })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={sub}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '??????????????????',
              })}
            />
            <Tabs.TabPane
              key="mobile"
              tab={intl.formatMessage({
                id: 'pages.login.phoneLogin.tab',
                defaultMessage: '???????????????',
              })}
            />
          </Tabs>
          {loginErr && type === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '?????????????????????(hw/love)',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '?????????: hw ',
                })}
                rules={[
                  {
                    required: true,
                    message: '??????????????????!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '??????:love',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="??????????????????"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
          {loginErr && type === 'mobile' && (
            <LoginMessage content={loginErr?.message} />
          )}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: '?????????',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                        defaultMessage="?????????????????????"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.invalid"
                        defaultMessage="????????????????????????"
                      />
                    ),
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: '??????????????????',
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({
                      id: 'pages.getCaptchaSecondText',
                      defaultMessage: '???????????????',
                    })}`;
                  }
                  return intl.formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: '???????????????',
                  });
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="?????????????????????"
                      />
                    ),
                  },
                ]}
                onGetCaptcha={(phone) => {
                  return getFakeCaptcha({
                    phone,
                  });
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage
                id="pages.login.rememberMe"
                defaultMessage="????????????"
              />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage
                id="pages.login.forgotPassword"
                defaultMessage="????????????"
              />
            </a>
          </div>
        </LoginForm>
        <div className={styles.footer}>
          <Footer style={{ backgroundColor: '#fff' }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
