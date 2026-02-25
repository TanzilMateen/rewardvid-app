// src/app/App.tsx
import { RouterProvider } from 'react-router-dom'; // 'react-router' ko '-dom' karein
import { router } from './routes'; 

export default function App() {
  return <RouterProvider router={router} />;
}
