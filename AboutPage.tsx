import React from 'react';
import { Users, Award, Truck, Shield, Heart, Zap } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Passion',
      description: 'Nous sommes passionnés par la technologie et nous nous engageons à vous offrir les meilleurs produits.'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: 'Qualité',
      description: 'Nous sélectionnons rigoureusement nos produits pour garantir une qualité exceptionnelle.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Service Client',
      description: 'Notre équipe dédiée est là pour vous accompagner avant, pendant et après votre achat.'
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: 'Innovation',
      description: 'Nous restons à la pointe de la technologie pour vous proposer les dernières innovations.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Clients satisfaits' },
    { number: '10K+', label: 'Produits vendus' },
    { number: '99%', label: 'Satisfaction client' },
    { number: '24/7', label: 'Support disponible' }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">À propos de nous</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Depuis notre création, nous nous efforçons de démocratiser l'accès aux technologies 
            les plus avancées tout en maintenant les plus hauts standards de qualité et de service.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre histoire</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Fondée en 2020 par une équipe de passionnés de technologie, 
                    notre entreprise est née d'une vision simple : rendre la technologie 
                    accessible à tous, sans compromis sur la qualité.
                  </p>
                  <p>
                    Nous avons commencé comme une petite boutique en ligne spécialisée 
                    dans les produits Apple, et nous avons rapidement élargi notre gamme 
                    pour inclure les meilleures marques du marché.
                  </p>
                  <p>
                    Aujourd'hui, nous sommes fiers de servir des milliers de clients 
                    à travers la France et de continuer à grandir tout en gardant 
                    nos valeurs fondamentales intactes.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 p-8 lg:p-12 flex items-center">
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Notre équipe"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16">
          <div className="bg-blue-600 text-white rounded-lg p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-center mb-12">Quelques chiffres</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Commitments */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nos engagements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Truck className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Livraison rapide</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Livraison gratuite en France métropolitaine dès 50€ d'achat. 
                Expédition sous 24h pour les commandes passées avant 14h.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Garantie qualité</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Tous nos produits bénéficient d'une garantie constructeur. 
                Service après-vente réactif et échange gratuit en cas de défaut.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Satisfaction client</h3>
              </div>
              <p className="text-gray-600 text-sm">
                30 jours satisfait ou remboursé. Notre équipe support est disponible 
                pour répondre à toutes vos questions.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Notre équipe</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Notre équipe est composée de professionnels expérimentés dans les domaines 
              de la technologie, du e-commerce et du service client. Nous travaillons 
              ensemble pour vous offrir la meilleure expérience d'achat possible.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div>
                <div className="font-semibold text-gray-900">Développement</div>
                <div>3 développeurs experts</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Service Client</div>
                <div>5 conseillers dédiés</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Logistique</div>
                <div>4 responsables expédition</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;