import { dataSource } from '@/ww/pages/home/components/ContentRight/dataSource';
import QRcode from '@/ww/resources/imgs/QRcode.jpg';
import { Radar } from '@ant-design/plots';
import { Card, Col, Image, Row } from 'antd';
const config = {
  xField: 'item',
  yField: 'score',
  seriesField: 'user',
  meta: {
    score: {
      alias: '分数',
      min: 0,
      max: 100,
    },
  },
  xAxis: {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  },
  // 开启辅助点
  point: {
    size: 2,
  },
};
export default () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="战力分析">
          <Radar data={dataSource} {...config} />
        </Card>
      </Col>
      <Col span={24}>
        <Card title="上车口令">
          <div style={{ textAlign: 'center' }}>
            <Image src={QRcode} width={300} />
          </div>
        </Card>
      </Col>
    </Row>
  );
};
