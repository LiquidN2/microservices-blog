import { FC } from 'react';

import CommentItem, { Comment } from './CommentItem';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
  const renderedComments = comments.map(comment => (
    <CommentItem
      key={comment.id}
      id={comment.id}
      content={comment.content}
      status={comment.status}
    />
  ));

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
