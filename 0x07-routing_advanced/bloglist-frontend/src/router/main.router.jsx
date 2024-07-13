import { Route, Routes } from 'react-router-dom';
import DetailBlog from '../components/DetailBlog';
import DetailedUser from '../pages/DetailedUser';
import Home from '../pages/Home';
import Users from '../pages/Users';

const BlogListRouter = () => {
  return (
    <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/blogs' element={<Home />} />
      <Route path='/blogs/:id' element={<DetailBlog />} />
      <Route path='/users' element={<Users />} />
      <Route path='/users/:id' element={<DetailedUser />} />
    </Routes>
  );
};

export default BlogListRouter;
