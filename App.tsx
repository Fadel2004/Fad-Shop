import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EcommerceProvider } from './context/EcommerceContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import NotificationModal from './components/NotificationModal';

function App() {
  return (
    <EcommerceProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tous-les-produits" element={<ProductsPage />} />
              <Route path="/produit/:id" element={<ProductDetailPage />} />
              <Route path="/liste-envie" element={<WishlistPage />} />
              <Route path="/panier" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
          <NotificationModal />
        </div>
      </Router>
    </EcommerceProvider>
  );
}

export default App;