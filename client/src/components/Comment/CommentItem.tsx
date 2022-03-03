import { FC } from 'react';

export interface Comment {
  id: string;
  content: string;
  status: string;
}
interface CommentItemProps extends Comment {}

const CommentItem: FC<CommentItemProps> = ({ id, content, status }) => {
  return status !== 'rejected' ? <li>{content}</li> : null;
};

export default CommentItem;
