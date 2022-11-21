import React from 'react';
import { styled } from '@nextui-org/react';
import { APP_VERSION, PageMeta, WithChildren } from '@/common';

export type GeneralLayoutProps = WithChildren;

export const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <>
      <PageMeta />
      <Container>{children}</Container>
      <Version>{APP_VERSION.slice(APP_VERSION.length - 5)}</Version>
    </>
  );
};

const Container = styled('div', {
  maxWidth: '650px',
  padding: '0 1.5em 2em',
  margin: '0 auto',
});

const Version = styled('div', {
  position: 'fixed',
  bottom: 5,
  right: 5,
  fontSize: 10,
  color: '#7c7c7c',
  opacity: 0.3,
});
