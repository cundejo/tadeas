import { Loading, styled } from '@nextui-org/react';

const Container = styled('span', {
  position: 'absolute',
  top: 0,
  left: 0,
  h: '100vh',
  w: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const PageLoading: React.FC = () => (
  <Container>
    <Loading size="xl" />
  </Container>
);
