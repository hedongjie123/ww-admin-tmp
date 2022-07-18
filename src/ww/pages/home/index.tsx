import { Col, Row, Space } from 'antd';
import ContentLeft from './components/ContentLeft';
import ContentRight from './components/ContentRight';
import Header from './components/Header';

export default () => {
  return (
    <Space direction={'vertical'} style={{ width: '100%' }} size={'large'}>
      <Header />
      <div>
        <Row gutter={[16, 16]}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <ContentLeft />
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ContentRight />
          </Col>
        </Row>
      </div>
    </Space>
  );
};
