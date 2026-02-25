import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { WatchVideo } from './pages/WatchVideo';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Terms } from './pages/Terms';
import { AdminDashboard } from './pages/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'watch/:id',
        Component: WatchVideo,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'signup',
        Component: Signup,
      },
      {
        path: 'terms', // 👈 Is mein Rules + Privacy + Anti-Fraud sab merge hain
        Component: Terms,
      },
      {
        path: 'admin-control', // 👈 Aapka makhsoos Admin Panel
        Component: AdminDashboard,
      },
    ],
  },
]);