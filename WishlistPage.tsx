import React from 'react';
import { Link } from 'react-router-dom';
import { useEcommerce } from '../context/EcommerceContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

const WishlistPage = () => {
  const { state } = useEcommerce();

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-500" />
            <span>Ma liste d'envie</span>
          </h1>
          <p className="text-gray-600">
            {state.wishlist.length} produit(s) dans votre liste d'envie
          </p>
        </div>

        {state.wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Votre liste d'envie est vide
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Parcourez nos produits et ajoutez vos favoris à votre liste d'envie 
              pour les retrouver facilement plus tard.
            </p>
            <Link
              to="/tous-les-produits"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Découvrir nos produits</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;