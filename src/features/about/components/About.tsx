import React from 'react';
import { styled, Text } from '@nextui-org/react';
import { TextColorful } from '@/features/common';

export const About: React.FC = () => {
  return (
    <Container>
      <Text h3>
        <TextColorful yellow>Why?</TextColorful>
      </Text>
      <Text>
        <TextColorful yellow>Tadeas</TextColorful> is a small to-do app that my wife and I created to share tasks with
        the family, after looking without finding any that meet our needs.
      </Text>
      <Text>
        After sharing it with some friends, it became popular and there is a lot of people that found it useful, which
        makes us happy 🥰. We also receive a ton of suggestions and ideas to implement, if you have one,{' '}
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdu7QvWdqKpRU0xiFbzpolPw_p_cNxKzza4Qf8IX6J9lp3zNA/viewform?usp=sf_link"
          rel="noreferrer"
        >
          let us know
        </a>
        !
      </Text>

      <Text h3>
        <TextColorful yellow>Support Tadeas</TextColorful>
      </Text>
      <Text>
        This is a pet project that we love to maintain when we have time. We don&apos;t want to monetize it and we hate
        ads, if you found it useful,{' '}
        <a target="_blank" href="https://donate.stripe.com/3cscOG9BxfXG54Q3cd" rel="noreferrer">
          buy us a coffee
        </a>{' '}
        ☕️ .
      </Text>
    </Container>
  );
};

const Container = styled('nav', {
  '& h3': {
    mt: '1em',
  },
  '& p': {
    mb: '1em',
  },
  '& a': {
    textDecorationColor: '45deg, $purple600 -20%, $pink600 100%',
    textGradient: '45deg, $purple600 -20%, $pink600 100%',
  },
});
