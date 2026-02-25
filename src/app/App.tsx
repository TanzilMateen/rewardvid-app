import { RouterProvider } from 'react-router';
import { router } from './routes'; // 👈 Check karein ye curly braces mein ho

export default function App() {
  return <RouterProvider router={router} />;
}
