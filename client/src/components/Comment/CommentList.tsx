import { FC, useEffect, useState } from 'react';
import axios from 'axios';

import CommentItem from './CommentItem';

interface Comment {
  id: string;
  content: string;
}

interface CommentListProps {
  postId: string;
}

const CommentList: FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments().catch(err => console.error(err));
  }, []);

  const renderedComments = comments.map(comment => (
    <CommentItem key={comment.id} id={comment.id} content={comment.content} />
  ));

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
