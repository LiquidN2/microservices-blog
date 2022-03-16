import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import PostItem, { Post } from './PostItem';

const PostList: FC = () => {
  const [posts, setPosts] = useState<Record<string, Post>>({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts().catch(err => console.error(err));
  }, []);

  console.log(posts);

  const renderedPosts = Object.values(posts).map((post: Post) => (
    <PostItem
      key={post.id}
      id={post.id}
      title={post.title}
      comments={post.comments}
    />
  ));

  return (
    <div className="d-flex flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
