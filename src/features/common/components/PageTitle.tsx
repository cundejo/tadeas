import React, { ReactNode } from 'react';
import { styled, Text } from '@nextui-org/react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Description, TextColorful } from '@/features/common';

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
          <Text h2>
            <MdOutlineArrowBack />
          </Text>
        </Link>
      )}

      <Description
        css={{ margin: 0 }}
        title={<TextColorful css={{ fs: '1.2em' }}>{title}</TextColorful>}
        superTitle={superTitle ?? 'page'}
        subTitle={subTitle}
      />
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

const Link = styled('a', {
  display: 'flex',
  marginRight: '0.5em',
  '& h2': {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'normal',
    margin: 0,
  },
  '& h2:hover': {
    color: '$primary',
  },
});
