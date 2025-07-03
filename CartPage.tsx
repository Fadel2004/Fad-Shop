import React from 'react';
import { Link } from 'react-router-dom';
import { useEcommerce } from '../context/EcommerceContext';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';

const CartPage = () => {
  const { state, dispatch } = useEcommerce();

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { type: 'info', message: 'Produit retiré du panier' }
      });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: { type: 'info', message: 'Produit retiré du panier' }
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span>Panier</span>
          </h1>
          <p className="text-gray-600">
            {itemsCount} article(s) dans votre panier
          </p>
        </div>

        {state.cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Découvrez nos produits et ajoutez vos articles préférés 
              pour commencer vos achats.
            </p>
            <Link
              to="/tous-les-produits"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>Continuer mes achats</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Articles</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {state.cart.map((item) => (
                    <div key={item.id} className="p-6 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Link to={`/produit/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          />
                        </Link>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/produit/${item.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          {item.price.toLocaleString('fr-FR')}€
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé de commande</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total ({itemsCount} articles)</span>
                    <span className="text-gray-900">{total.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{total.toLocaleString('fr-FR')}€</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mb-4">
                  <CreditCard className="h-5 w-5" />
                  <span>Finaliser la commande</span>
                </button>

                <Link
                  to="/tous-les-produits"
                  className="block text-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Continuer mes achats
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>✓ Livraison gratuite dès 50€</p>
                    <p>✓ Garantie satisfait ou remboursé</p>
                    <p>✓ Paiement sécurisé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;