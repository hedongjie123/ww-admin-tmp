import { Request, Response } from 'express';
import moment from 'moment';

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

let access =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};
export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        code: 401,
        errorMessage: '请先登录！',
      });
      return;
    }
    res.send({
      code: 200,
      data: {
        account: 'hw',
        accountName: 'hw',
        appKeyList: [],
        authData: `{}`,
        devicePwd: '123',
        headImg: 'https://i.postimg.cc/KYgrZN8V/41651921279-pic.jpg',
        mobile: '',
        name: 'hw',
        token: 'xxx',
        type: 0,
        remark: '听说你不想加班？来加一个东西吧!',
      },
    });
  },
  'POST /api/login/account': (req: Request, res: Response) => {
    const { body } = req;
    const { type = 'account', username, password, captcha } = body;
    if (type === 'account') {
      if (username === 'hw' && password === 'love') {
        access = 'admin';
        res.send({
          code: 200,
          data: {
            authorization: moment().format('X'),
          },
        });
        return;
      }
      res.send({
        code: 1002,
        msg: '密码错误',
      });
      return;
    }
    if (type === 'mobile') {
      if (captcha === '1234') {
        access = 'admin';
        res.send({
          code: 200,
          data: {
            authorization: moment().format('X'),
          },
        });
        return;
      }
      res.send({
        code: 1002,
        msg: '验证码错误',
      });
      return;
    }
    res.send({
      code: 1002,
      msg: '密码错误',
    });
  },
  'GET /api/login/captcha': (req: Request, res: Response) => {
    res.send({
      code: 200,
      captcha: 1234,
    });
  },
};
