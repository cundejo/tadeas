import React, { ReactNode } from 'react';
import { Col, Row, styled } from '@nextui-org/react';

type Props = {
  leftContent: ReactNode;
  rightContent?: ReactNode;
};

export const Navbar: React.FC<Props> = ({ leftContent, rightContent }) => {
  return (
    <Container>
      <Content>
        <Col>
          <Row justify="flex-start">{leftContent}</Row>
        </Col>
        <Col>
          <Row justify="flex-end">{rightContent ?? null}</Row>
        </Col>
      </Content>
    </Container>
  );
};

const Container = styled('nav', {
  top: 0,
  padding: '0 $md',
  height: '60px',
  position: 'sticky',
  zIndex: '$max',
  backdropFilter: 'saturate(180%) blur(10px)',
  boxShadow: '0px 5px 20px -5px rgba(2, 1, 1, 0.1)',
});

const Content = styled('div', {
  maxWidth: '650px',
  height: '60px',
  padding: '0',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
