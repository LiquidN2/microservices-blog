import { FC } from 'react';

import CommentCreateForm from '../Comment/CommentCreateForm';
import CommentList from '../Comment/CommentList';

interface PostItemProps {
  id: string;
  title: string;
}

const PostItem: FC<PostItemProps> = ({ id, title }) => {
  return (
    <div className="card p-2 mb-3" style={{ width: '30%' }}>
      {title}
      <CommentList postId={id} />
      <CommentCreateForm postId={id} />
    </div>
  );
};

export default PostItem;
