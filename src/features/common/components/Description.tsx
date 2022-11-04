import { Container, Text } from '@nextui-org/react';
import { ReactNode } from 'react';

interface Props {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  superTitle?: string | ReactNode;
}

export const Description: React.FC<Props> = ({ title, subTitle, superTitle }) => (
  <Container css={{ padding: 0, margin: '1em 0' }}>
    {superTitle && (
      <Text css={{ margin: 0, color: '$accents7', textTransform: 'uppercase', fs: '$sm' }}>{superTitle}</Text>
    )}
    <Text h4 css={{ margin: 0, fontWeight: 'normal', lineHeight: 'normal' }}>
      {title}
    </Text>
    {subTitle && <Text css={{ margin: 0, color: '$accents7' }}>{subTitle}</Text>}
  </Container>
);
