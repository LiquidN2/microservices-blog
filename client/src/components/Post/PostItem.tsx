import { FC } from 'react';

import CommentCreateForm from '../Comment/CommentCreateForm';
import CommentList from '../Comment/CommentList';
import type { Comment } from '../Comment/CommentItem';
export interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

interface PostItemProps extends Post {}

const PostItem: FC<PostItemProps> = ({ id, title, comments }) => {
  return (
    <div className="card p-2 mb-3" style={{ width: '30%' }}>
      {title}
      <CommentList comments={comments} />
      <CommentCreateForm postId={id} />
    </div>
  );
};

export default PostItem;
