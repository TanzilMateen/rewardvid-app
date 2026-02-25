import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; // 👈 Check karein ke file ka naam 'routes.tsx' hi hai

export default function App() {
  return <RouterProvider router={router} />;
}
