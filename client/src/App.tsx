import { FC } from 'react';

import PostCreateForm from './components/Post/PostCreateForm';
import PostList from './components/Post/PostList';

const App: FC = () => (
  <div className="container mt-3">
    <h1>Microservices Blog</h1>
    <PostCreateForm />
    <hr />
    <PostList />
  </div>
);

export default App;
