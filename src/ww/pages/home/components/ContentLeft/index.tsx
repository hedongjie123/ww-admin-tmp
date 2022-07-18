import {
  heros,
  teams,
} from '@/ww/pages/home/components/ContentLeft/dataSource';
import { Avatar, Card, Col, Row, Space, Typography } from 'antd';
const { Grid, Meta } = Card;
const { Text } = Typography;
interface GridItemProps {
  avatar: string;
  name: string;
  description: string;
  address: string;
  nickname: string;
}
const GridItem = ({
  address,
  avatar,
  nickname,
  name,
  description,
}: GridItemProps) => {
  return (
    <>
      <Meta
        title={
          <Space align={'center'}>
            <Avatar src={avatar} />
            <div>{name}</div>
          </Space>
        }
        description={description}
      />
      <Row justify={'space-between'} style={{ marginTop: 16 }}>
        <Text type={'secondary'}>{address}</Text>
        <Text type={'secondary'}>{nickname}</Text>
      </Row>
    </>
  );
};
export default () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="英雄列表">
          {heros.map((item) => {
            const { id, ...props } = item;
            return (
              <Grid key={id}>
                <GridItem {...props} />
              </Grid>
            );
          })}
        </Card>
      </Col>
      <Col span={24}>
        <Card title="车队列表">
          {teams.map((item) => {
            const { id, ...props } = item;
            return (
              <Grid key={id}>
                <GridItem {...props} />
              </Grid>
            );
          })}
        </Card>
      </Col>
    </Row>
  );
};
