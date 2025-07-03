import React, { useState } from 'react';
import { useEcommerce } from '../context/EcommerceContext';
import CategorySidebar from '../components/CategorySidebar';
import HeroSlider from '../components/HeroSlider';
import ProductSlider from '../components/ProductSlider';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

const HomePage = () => {
  const { state } = useEcommerce();
  const [selectedCategory, setSelectedCategory] = useState('');

  const featuredProducts = state.products.filter(product => product.featured);
  const newProducts = state.products.filter(product => product.isNew);
  const discountedProducts = state.products.filter(product => product.discount);

  const filteredProducts = selectedCategory
    ? state.products.filter(product => 
        product.category === selectedCategory || product.subcategory === selectedCategory
      )
    : state.products;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
            
            {/* Promotional Block - Hidden on mobile */}
            <div className="hidden lg:block mt-6 bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Offre Spéciale!</h3>
              <p className="text-sm mb-4">Livraison gratuite dès 50€ d'achat</p>
              <button className="bg-white text-orange-600 px-4 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors">
                En profiter
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Slider */}
            <div className="mb-12">
              <HeroSlider />
            </div>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Produits mis en avant</h2>
                </div>
                <ProductSlider products={featuredProducts} title="" />
              </div>
            )}

            {/* New Products */}
            {newProducts.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center space-x-2 mb-6">
                  <Clock className="h-6 w-6 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Nouveautés</h2>
                </div>
                <ProductSlider products={newProducts} title="" />
              </div>
            )}

            {/* Discounted Products */}
            {discountedProducts.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="h-6 w-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Offres spéciales</h2>
                </div>
                <ProductSlider products={discountedProducts} title="" />
              </div>
            )}

            {/* Category Products */}
            {selectedCategory && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedCategory}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.slice(0, 8).map(product => (
                    <div key={product.id}>
                      {/* Product Card would go here */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Section */}
            <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Restez informé de nos nouveautés</h3>
              <p className="mb-6">Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première commande</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-medium transition-colors">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;