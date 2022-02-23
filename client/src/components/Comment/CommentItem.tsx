import { FC } from 'react';

interface CommentItemProps {
  id: string;
  content: string;
}

const CommentItem: FC<CommentItemProps> = ({ id, content }) => {
  return <li>{content}</li>;
};

export default CommentItem;
