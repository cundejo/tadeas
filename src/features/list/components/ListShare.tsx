import React from 'react';
import { Text } from '@nextui-org/react';
import { useLists } from '@/features/list';

export const ListShare: React.FC = () => {
  const { listSelected } = useLists();

  return (
    <>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta, arcu non placerat feugiat, sem justo
        pretium est, eget sodales velit nisi tristique augue. Aliquam erat volutpat. Fusce pulvinar commodo auctor.
        Vestibulum ac tincidunt sem. Vestibulum pharetra aliquet urna a lobortis. Aliquam eleifend, ligula eget
        convallis dictum, mi leo condimentum lectus, sed maximus eros nibh ac ex. Quisque eget lacus nec nisi tempus
        tincidunt non eget est. Fusce pellentesque, mi nec accumsan cursus, elit est sodales justo, eget semper metus
        sem sit amet elit. Sed nec mauris mattis, semper metus ac, tincidunt dui. Nunc laoreet consectetur orci vel
        venenatis.
      </Text>
    </>
  );
};
