import { Outlet, useLocation } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';

export function Layout() {
  const location = useLocation();
  
  // 1. In pages par Navbar aur Footer nahi dikhega (Clean Auth Look)
  const noLayoutPaths = ['/login', '/signup', '/forgot-password'];
  const hideLayout = noLayoutPaths.includes(location.pathname);

  // 2. In pages par Mobile Bottom Nav dikhega (Kyunke humne 'rewards' delete kar diya hai)
  const showMobileNav = ['/dashboard', '/watch', '/admin-control'].some(path => 
    location.pathname.startsWith(path)
  );

  if (hideLayout) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* 📱 Mobile Navigation (Sirf logged-in area mein dikhegi) */}
      {showMobileNav && (
        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      )}
    </div>
  );
}