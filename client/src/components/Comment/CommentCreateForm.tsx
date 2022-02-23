import { FC, FormEventHandler, useState } from 'react';
import axios from 'axios';

interface CommentCreateFormProps {
  postId: string;
}

const CommentCreateForm: FC<CommentCreateFormProps> = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();

    const submittedContent = content.trim();

    if (!postId || !submittedContent) return;

    axios
      .post(`http://localhost:4001/posts/${postId}/comments`, {
        content: submittedContent,
      })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mt-3 mb-2">
          <label className="form-label">Comment</label>
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={e => setContent(e.currentTarget.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreateForm;
