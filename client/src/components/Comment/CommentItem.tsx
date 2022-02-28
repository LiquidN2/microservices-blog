import { FC } from 'react';

export interface Comment {
  id: string;
  content: string;
}
interface CommentItemProps extends Comment {}

const CommentItem: FC<CommentItemProps> = ({ id, content }) => {
  return <li>{content}</li>;
};

export default CommentItem;
