import { FC, FormEventHandler, useState } from 'react';
import axios from 'axios';

const PostCreateForm: FC = () => {
  const [title, setTitle] = useState('');

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();

    const submittedTitle = title.trim();
    if (!submittedTitle) return;

    axios
      .post('http://localhost:4000/posts', {
        title: submittedTitle,
      })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="new blog title"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreateForm;
