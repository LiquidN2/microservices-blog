import { FC } from 'react';

import CreatePost from './components/Post/CreatePost';
import PostList from './components/Post/PostList';

const App: FC = () => (
  <div className="container mt-3">
    <h1>Microservices Blog</h1>
    <CreatePost />
    <hr />
    <PostList />
  </div>
);

export default App;
