import { FC } from 'react';

interface PostItemProps {
  id: string;
  title: string;
}

const PostItem: FC<PostItemProps> = ({ id, title }) => {
  return (
    <div className="card p-2 mb-3" style={{ width: '30%' }}>
      {title}
    </div>
  );
};

export default PostItem;
