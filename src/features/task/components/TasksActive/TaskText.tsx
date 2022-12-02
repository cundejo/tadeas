import React from 'react';
import { styled } from '@nextui-org/react';
import { Task } from '@/features/task';

type Props = {
  task: Task;
  lineThrough?: boolean;
};

const containsUrl = (text: string): boolean => new RegExp(/https?:\/\//gi).test(text);

const parseText = (text: string): string => {
  if (!containsUrl(text)) return text;

  return text.replace(/\bhttps?:\/\/\S+/gi, (url: string) => {
    const link = document.createElement('a');
    link.target = '__blank';
    link.href = url;
    link.text = link.hostname.replace(/^www\./g, '');
    return link.outerHTML;
  });
};

export const TaskText: React.FC<Props> = ({ task, lineThrough }) => {
  return <Text lineThrough={lineThrough} dangerouslySetInnerHTML={{ __html: parseText(task.title) }} />;
};

const Text = styled('h4', {
  fontSize: '$lg',
  fontWeight: 'normal',
  letterSpacing: 'normal',
  margin: 0,
  variants: {
    lineThrough: {
      true: {
        textDecorationLine: 'line-through',
      },
    },
  },

  '& a': {
    color: '$blue800',
    textDecoration: 'underline',
  },
});
