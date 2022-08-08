import React from 'react';
import NextLink from 'next/link';
import { Button, Col, Link, Row, styled, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { HiOutlineCog } from 'react-icons/hi';

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <Content>
        <Col>
          <Row justify="flex-start">
            <NextLink href="/">
              <Link>
                <Text h2 css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}>
                  Tadeas
                </Text>
              </Link>
            </NextLink>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button
              onClick={() => router.push('/profile')}
              light
              auto
              color="primary"
              css={{ fontSize: '$md' }}
              icon={<HiOutlineCog />}
            />
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
