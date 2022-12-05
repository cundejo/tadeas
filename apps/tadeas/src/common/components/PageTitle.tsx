import React, { ReactNode } from 'react';
import { styled, Text } from '@nextui-org/react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Description, TextColorful } from '@/common';

interface Props {
  goBack?: boolean;
  subTitle?: string | ReactNode;
  superTitle?: string | ReactNode;
  title: string | ReactNode;
}

export const PageTitle: React.FC<Props> = ({ title, subTitle, superTitle, goBack }) => {
  const router = useRouter();

  return (
    <Container>
      {goBack && (
        <Link onClick={() => router.push('/')}>
          <MdOutlineArrowBack />
        </Link>
      )}

      <Description css={{ margin: 0 }} superTitle={superTitle ?? 'page'} subTitle={subTitle}>
        <TextColorful css={{ fs: '1.2em' }}>{title}</TextColorful>
      </Description>
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

const Link = styled('a', {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '0.5em',
  opacity: 0.5,
  fs: '2rem',
  '&:hover': {
    color: '$white',
    opacity: 0.9,
  },
});
