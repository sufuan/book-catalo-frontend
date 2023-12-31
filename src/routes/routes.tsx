import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';
import PrivateRoute from './privateRoute';
import Createbook from '@/pages/CreateBook';
import UpdateBook from '@/pages/UpdateBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Products />,
      },

      {
        path: '/product-details/:id',
        element: <ProductDetails />,
      },

      {
        path: '/add-new-book',
        element: (
          <PrivateRoute>
            <Createbook />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/update-book/:id',
    element: <UpdateBook />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
