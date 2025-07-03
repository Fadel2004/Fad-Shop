import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductSliderProps {
  products: Product[];
  title: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  title,
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (autoPlay && products.length > itemsPerView) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => 
          prev + itemsPerView >= products.length ? 0 : prev + itemsPerView
        );
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, products.length, itemsPerView]);

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev + itemsPerView >= products.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? Math.max(0, products.length - itemsPerView) : Math.max(0, prev - itemsPerView)
    );
  };

  const maxSlides = Math.max(0, products.length - itemsPerView);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlides}
            className="p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${(currentSlide / itemsPerView) * 100}%)`,
            width: `${(products.length / itemsPerView) * 100}%`
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / products.length}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {products.length > itemsPerView && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index * itemsPerView)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentSlide / itemsPerView) === index
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSlider;