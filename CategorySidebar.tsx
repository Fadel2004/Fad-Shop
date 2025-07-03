import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { categories } from '../data/products';

interface CategorySidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ selectedCategory, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategorySelect = (category: string) => {
    onCategorySelect(category);
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Catégories</h3>
      </div>
      <nav className="p-2">
        <button
          onClick={() => handleCategorySelect('')}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === '' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Toutes les catégories
        </button>
        
        {categories.map((category) => (
          <div key={category.id}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleCategorySelect(category.name)}
                className={`flex-1 text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
              {category.subcategories && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            
            {category.subcategories && expandedCategories.includes(category.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => handleCategorySelect(subcategory)}
                    className={`w-full text-left px-3 py-1 rounded text-sm transition-colors ${
                      selectedCategory === subcategory
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Menu className="h-4 w-4" />
          <span className="text-sm font-medium">Catégories</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Catégories</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto" style={{ height: 'calc(100% - 73px)' }}>
              <SidebarContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategorySidebar;