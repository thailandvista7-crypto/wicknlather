'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

interface ProductVariation {
  name: string;
  options: {
    value: string;
    priceModifier?: number;
    stock?: number;
  }[];
}

interface Product {
  _id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  ingredients?: string;
  scentNotes?: string;
  variations?: ProductVariation[];
  sensitivityLevel?: 'mild' | 'moderate' | 'sensitive' | 'very-sensitive';
  benefits?: string[];
  usageInstructions?: string;
}

const sensitivityInfo = {
  mild: {
    label: 'Mild',
    description: 'Suitable for all skin types, including sensitive skin',
    color: 'bg-green-100 text-green-800',
  },
  moderate: {
    label: 'Moderate',
    description: 'Best for normal to combination skin',
    color: 'bg-blue-100 text-blue-800',
  },
  sensitive: {
    label: 'Sensitive',
    description: 'Formulated for sensitive and delicate skin',
    color: 'bg-yellow-100 text-yellow-800',
  },
  'very-sensitive': {
    label: 'Very Sensitive',
    description: 'Extra gentle formula for very sensitive skin',
    color: 'bg-purple-100 text-purple-800',
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<{ [key: string]: string }>({});
  const [selectedSensitivity, setSelectedSensitivity] = useState<string>('');
  const addItem = useCartStore((state) => state.addItem);
  const hydrate = useCartStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/slug/${slug}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.product);
        // Initialize default variations
        if (data.product.variations) {
          const defaults: { [key: string]: string } = {};
          data.product.variations.forEach((variation: ProductVariation) => {
            if (variation.options.length > 0) {
              defaults[variation.name] = variation.options[0].value;
            }
          });
          setSelectedVariations(defaults);
        }
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    if (!product) return 0;
    let finalPrice = product.price;
    
    // Add variation price modifiers
    if (product.variations) {
      product.variations.forEach((variation) => {
        const selectedValue = selectedVariations[variation.name];
        if (selectedValue) {
          const option = variation.options.find((opt) => opt.value === selectedValue);
          if (option && option.priceModifier) {
            finalPrice += option.priceModifier;
          }
        }
      });
    }
    
    return finalPrice;
  };

  const getVariationLabel = () => {
    if (!product?.variations) return '';
    const labels: string[] = [];
    product.variations.forEach((variation) => {
      const selected = selectedVariations[variation.name];
      if (selected) {
        labels.push(`${variation.name}: ${selected}`);
      }
    });
    return labels.join(', ');
  };

  const handleAddToCart = () => {
    if (!product) return;

    const finalPrice = calculatePrice();
    const variationLabel = getVariationLabel();
    const displayName = variationLabel ? `${product.name} (${variationLabel})` : product.name;

    if (product.stock >= quantity) {
      addItem({
        product: product._id,
        name: displayName,
        image: product.images[0],
        price: finalPrice,
        stock: product.stock,
        quantity,
        variations: selectedVariations,
        variationLabel,
      });
      toast.success('Added to cart!');
    } else {
      toast.error('Insufficient stock');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  const finalPrice = calculatePrice();
  const sensitivity = product.sensitivityLevel ? sensitivityInfo[product.sensitivityLevel] : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div>
              <div className="relative h-96 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage] || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary-green' : 'border-transparent'
                      }`}
                    >
                      <Image src={img} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-serif font-bold text-primary-dark mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl font-bold text-primary-green">
                  {formatPrice(finalPrice)}
                </p>
                {finalPrice !== product.price && (
                  <p className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </p>
                )}
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    product.stock > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 capitalize">
                  {product.category}
                </span>
                {sensitivity && (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${sensitivity.color}`}
                    title={sensitivity.description}
                  >
                    {sensitivity.label} Skin
                  </span>
                )}
              </div>

              {/* Sensitivity Selector */}
              {product.sensitivityLevel && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <label className="block font-semibold text-primary-dark mb-2">
                    Skin Sensitivity Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(sensitivityInfo).map(([key, info]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedSensitivity(key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          selectedSensitivity === key
                            ? `${info.color} ring-2 ring-primary-green`
                            : 'bg-white border border-gray-300 hover:border-primary-green'
                        }`}
                      >
                        {info.label}
                      </button>
                    ))}
                  </div>
                  {selectedSensitivity && (
                    <p className="text-sm text-gray-600 mt-2">
                      {sensitivityInfo[selectedSensitivity as keyof typeof sensitivityInfo].description}
                    </p>
                  )}
                </div>
              )}

              {/* Variations */}
              {product.variations && product.variations.length > 0 && (
                <div className="mb-6 space-y-4">
                  {product.variations.map((variation) => (
                    <div key={variation.name}>
                      <label className="block font-semibold text-primary-dark mb-2">
                        {variation.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {variation.options.map((option) => {
                          const isSelected = selectedVariations[variation.name] === option.value;
                          const isOutOfStock = option.stock !== undefined && option.stock === 0;
                          return (
                            <button
                              key={option.value}
                              onClick={() => {
                                if (!isOutOfStock) {
                                  setSelectedVariations({
                                    ...selectedVariations,
                                    [variation.name]: option.value,
                                  });
                                }
                              }}
                              disabled={isOutOfStock}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                isSelected
                                  ? 'bg-primary-green text-white ring-2 ring-primary-green'
                                  : isOutOfStock
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-white border border-gray-300 hover:border-primary-green'
                              }`}
                            >
                              {option.value}
                              {option.priceModifier && option.priceModifier > 0 && (
                                <span className="ml-1 text-xs">
                                  (+{formatPrice(option.priceModifier)})
                                </span>
                              )}
                              {isOutOfStock && <span className="ml-1 text-xs">(Out of Stock)</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                {product.longDescription && (
                  <div className="mt-4">
                    <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
                  </div>
                )}
              </div>

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-primary-dark mb-3">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheckCircle className="w-5 h-5 text-primary-green mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.ingredients && (
                <div className="mb-6">
                  <h3 className="font-semibold text-primary-dark mb-2">Ingredients:</h3>
                  <p className="text-gray-700">{product.ingredients}</p>
                </div>
              )}

              {product.scentNotes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-primary-dark mb-2">Scent Notes:</h3>
                  <p className="text-gray-700">{product.scentNotes}</p>
                </div>
              )}

              {product.usageInstructions && (
                <div className="mb-6 p-4 bg-primary-cream rounded-lg">
                  <div className="flex items-start">
                    <FiInfo className="w-5 h-5 text-primary-green mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-primary-dark mb-2">How to Use:</h3>
                      <p className="text-gray-700 text-sm">{product.usageInstructions}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary-green text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <Link
                  href="/cart"
                  className="flex-1 bg-primary-amber text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
