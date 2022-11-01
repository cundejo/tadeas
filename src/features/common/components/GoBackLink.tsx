import React from 'react';
import { styled, Text } from '@nextui-org/react';
import { MdOutlineArrowBack } from 'react-icons/md';

export const GoBackLink: React.FC = () => {
  return (
    <Container onClick={() => null}>
      <Text h2>
        <MdOutlineArrowBack /> Go back
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
