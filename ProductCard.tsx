import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useEcommerce } from '../context/EcommerceContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useEcommerce();

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: { type: 'success', message: 'Produit ajouté au panier' }
    });
  };

  return (
    <Link to={`/produit/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product.isNew && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                Nouveau
              </span>
            )}
            {product.discount && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full shadow-lg transition-colors ${
                isInWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-full shadow-lg transition-colors ${
                isInCart
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-500'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded font-medium">
                Rupture de stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString('fr-FR')}€
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString('fr-FR')}€
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;