import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ROUTES } from './utils/constants';
import { PrivateRoute } from './components/shared/PrivateRoute';
import { AdminRoute } from './components/shared/AdminRoute';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Certifications from './pages/Certifications';
import About from './pages/About';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.EVENTS} element={<Events />} />
            <Route path={ROUTES.RESOURCES} element={<Resources />} />
            <Route path={ROUTES.CERTIFICATIONS} element={<Certifications />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            
            {/* Protected Routes */}
            <Route path={ROUTES.DASHBOARD} element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            {/* Admin Routes */}
            <Route path={ROUTES.ADMIN} element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0F172A',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;