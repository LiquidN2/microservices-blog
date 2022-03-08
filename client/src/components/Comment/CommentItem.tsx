import { FC } from 'react';

export interface Comment {
  id: string;
  content: string;
  status: string;
}
interface CommentItemProps extends Comment {}

const CommentItem: FC<CommentItemProps> = ({ id, content, status }) => {
  switch (status) {
    case 'pending':
      return <li>This comment awaiting moderation</li>;

    case 'rejected':
      return <li>This comment was rejected</li>;

    case 'approved':
    default:
      return <li>{content}</li>;
  }
};

export default CommentItem;
