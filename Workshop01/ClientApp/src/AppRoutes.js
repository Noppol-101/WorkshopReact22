import { Layout } from './components/Layout';
import Register from "./pages/Register";
import Login from './pages/Login';
import Home from './pages/Home';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Layout><Home /></Layout>
  },
];

export default AppRoutes;
