import { createBrowserRouter } from 'react-router-dom'; // Professional standard ke liye 'react-router-dom' use karein
import { Layout } from '../components/Layout'; // Path check karein: agar routes folder mein hai toh '../'
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { WatchVideo } from '../pages/WatchVideo';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Terms } from '../pages/Terms';
import { AdminDashboard } from '../pages/AdminDashboard';
import { ForgotPassword } from '../pages/ForgotPassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Component ko element syntax mein dena zyada stable hai
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'watch/:id',
        element: <WatchVideo />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: 'privacy',
        element: <Terms />, // Same as terms since they are merged
      },
      {
        path: 'admin-control',
        element: <AdminDashboard />,
      },
    ],
  },
]);
