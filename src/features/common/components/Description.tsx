import { Container, Text } from '@nextui-org/react';

interface Props {
  title: string;
  subTitle?: string;
}

export const Description: React.FC<Props> = ({ title, subTitle }) => (
  <Container css={{ padding: 0, margin: '1em 0' }}>
    <Text h4 css={{ marginBottom: 0 }}>
      {title}
    </Text>
    {subTitle && <Text css={{ marginTop: 0, color: '$accents5' }}>{subTitle}</Text>}
  </Container>
);
