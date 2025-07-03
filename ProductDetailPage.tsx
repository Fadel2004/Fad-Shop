import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEcommerce } from '../context/EcommerceContext';
import ProductSlider from '../components/ProductSlider';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ArrowLeft } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useEcommerce();
  const [quantity, setQuantity] = useState(1);

  const product = state.products.find(p => p.id === id);
  const isInWishlist = state.wishlist.some(item => item.id === id);
  const isInCart = state.cart.some(item => item.id === id);

  // Similar products (same category)
  const similarProducts = state.products.filter(p => 
    p.id !== id && p.category === product?.category
  ).slice(0, 8);

  useEffect(() => {
    if (product) {
      dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: product });
    }
  }, [product, dispatch]);

  if (!product) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { type: 'info', message: 'Produit retiré de la liste d\'envie' }
      });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { type: 'success', message: 'Produit ajouté à la liste d\'envie' }
      });
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: { type: 'success', message: `${quantity} produit(s) ajouté(s) au panier` }
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux produits
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toLocaleString('fr-FR')}€
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice.toLocaleString('fr-FR')}€
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                {product.inStock ? 'En stock' : 'Rupture de stock'}
              </span>
            </div>

            {/* Quantity and Actions */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantité:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Ajouter au panier</span>
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className={`p-3 rounded-lg border transition-colors ${
                      isInWishlist
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Livraison gratuite</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Garantie 2 ans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-gray-700">Retour 30 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <ProductSlider
              products={similarProducts}
              title="Produits similaires"
              autoPlay={false}
            />
          </div>
        )}

        {/* Recently Viewed */}
        {state.recentlyViewed.length > 1 && (
          <div className="mt-16">
            <ProductSlider
              products={state.recentlyViewed.filter(p => p.id !== product.id)}
              title="Récemment consultés"
              autoPlay={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;