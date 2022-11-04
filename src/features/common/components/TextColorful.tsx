import { styled } from '@nextui-org/react';

export const TextColorful = styled('span', {
  textGradient: '45deg, $purple600 -20%, $pink600 100%',
  variants: {
    purple: {
      true: {
        textGradient: '45deg, $purple600 -20%, $pink600 100%',
      },
    },
    blue: {
      true: {
        textGradient: '45deg, $blue600 -20%, $pink600 50%',
      },
    },
    yellow: {
      true: {
        textGradient: '45deg, $yellow600 -20%, $red600 100%',
      },
    },
  },
});
