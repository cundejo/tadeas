import React from 'react';
import { Col, Row, styled } from '@nextui-org/react';
import { ListsDropdown } from '@/features/list';
import { AppDropdown } from '@/features/common';

export const Navbar: React.FC = () => {
  return (
    <Container>
      <Content>
        <Col>
          <Row justify="flex-start">
            <ListsDropdown />
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <AppDropdown />
          </Row>
        </Col>
      </Content>
    </Container>
  );
};

const Container = styled('nav', {
  top: 0,
  height: '76px',
  position: 'sticky',
  background: 'transparent',
  zIndex: '$max',
  backdropFilter: 'saturate(180%) blur(10px)',
  boxShadow: '0px 5px 20px -5px rgba(2, 1, 1, 0.1)',
});

const Content = styled('div', {
  maxWidth: '650px',
  height: '100%',
  padding: '0 1.5em',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
