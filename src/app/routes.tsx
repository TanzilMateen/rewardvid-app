import { createBrowserRouter } from 'react-router-dom';
// './' ka matlab hai "current folder (app) ke andar"
import { Layout } from './components/Layout'; 
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { WatchVideo } from './pages/WatchVideo';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Terms } from './pages/Terms';
import { AdminDashboard } from './pages/AdminDashboard';
import { ForgotPassword } from './pages/ForgotPassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'watch/:id', element: <WatchVideo /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Terms /> },
      { path: 'admin-control', element: <AdminDashboard /> },
    ],
  },
]);
