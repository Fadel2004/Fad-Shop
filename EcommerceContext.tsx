import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, WishlistItem } from '../types';
import { productsData } from '../data/products';

interface EcommerceState {
  products: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  recentlyViewed: Product[];
  loading: boolean;
  notification: {
    show: boolean;
    type: 'success' | 'error' | 'info';
    message: string;
  };
}

type EcommerceAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: Product }
  | { type: 'SHOW_NOTIFICATION'; payload: { type: 'success' | 'error' | 'info'; message: string } }
  | { type: 'HIDE_NOTIFICATION' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: EcommerceState = {
  products: [],
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  loading: false,
  notification: { show: false, type: 'info', message: '' }
};

const EcommerceContext = createContext<{
  state: EcommerceState;
  dispatch: React.Dispatch<EcommerceAction>;
}>({
  state: initialState,
  dispatch: () => null
});

function ecommerceReducer(state: EcommerceState, action: EcommerceAction): EcommerceState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'ADD_TO_CART':
      const existingCartItem = state.cart.find(item => item.id === action.payload.id);
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };
    
    case 'ADD_TO_RECENTLY_VIEWED':
      const filteredRecent = state.recentlyViewed.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        recentlyViewed: [action.payload, ...filteredRecent].slice(0, 6)
      };
    
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notification: { show: true, ...action.payload }
      };
    
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        notification: { ...state.notification, show: false }
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
}

export function EcommerceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ecommerceReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'SET_PRODUCTS', payload: productsData });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  }, []);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </EcommerceContext.Provider>
  );
}

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};