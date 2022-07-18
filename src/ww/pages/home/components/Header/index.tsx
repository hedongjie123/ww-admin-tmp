import { Avatar, Card, Statistic } from 'antd';
import { useModel } from 'umi';
import styles from './index.less';
const { Meta } = Card;
export default () => {
  const [currentUser] = useModel('currentUser');
  return (
    <Card>
      <div className={styles.content}>
        <Meta
          style={{ flex: 1, margin: 6 }}
          avatar={<Avatar src={currentUser.headImg} size={56} />}
          title={`早安，${currentUser.name}，祝你每天都不加班！`}
          description={currentUser.remark}
        />
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <Statistic title="年纪" value="30" />
          </div>
          <div className={styles.statItem}>
            <Statistic title="脉搏" value="99" />
          </div>
          <div className={styles.statItem}>
            <Statistic title="头发" value="3000" />
          </div>
        </div>
      </div>
    </Card>
  );
};
