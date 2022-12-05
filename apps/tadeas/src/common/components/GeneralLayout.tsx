import React from 'react';
import { styled } from '@nextui-org/react';
import { PageMeta, WithChildren } from '@/common';

export type GeneralLayoutProps = WithChildren;

export const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <>
      <PageMeta />
      <Container>{children}</Container>
    </>
  );
};

const Container = styled('div', {
  maxWidth: '650px',
  padding: '0',
  margin: '0 auto',
  height: '100vh',
  // @ts-ignore
  height: 'calc(var(--vh, 1vh) * 100)',
});
