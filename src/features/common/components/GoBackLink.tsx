import React from 'react';
import { styled, Text } from '@nextui-org/react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useRouter } from 'next/router';

export const GoBackLink: React.FC = () => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push('/')}>
      <Text h2>
        <MdOutlineArrowBack />
        &nbsp;&nbsp;Go back
      </Text>
    </Container>
  );
};

const Container = styled('a', {
  display: 'block',
  marginRight: '0.5em',
  '& h2': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5em',
    fontWeight: 'normal',
  },
  '& h2:hover': {
    color: '$primary',
  },
});
