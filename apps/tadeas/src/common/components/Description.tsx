import { Container, CSS, Text } from '@nextui-org/react';
import { ReactNode } from 'react';

interface Props {
  subTitle?: string | ReactNode;
  superTitle?: string | ReactNode;
  css?: CSS;
}

export const Description: React.FC<Props> = ({ children, subTitle, superTitle, css }) => (
  <Container className="description" css={{ padding: 0, margin: '1em 0', ...css }}>
    {superTitle && (
      <Text css={{ margin: 0, color: '$accents7', textTransform: 'uppercase', fs: '$xs' }}>{superTitle}</Text>
    )}
    <Text h4 css={{ margin: 0, fontWeight: 'normal', lineHeight: 'normal' }}>
      {children}
    </Text>
    {subTitle && <Text css={{ margin: '2px 0 0', fs: '$sm', color: '$accents7' }}>{subTitle}</Text>}
  </Container>
);
