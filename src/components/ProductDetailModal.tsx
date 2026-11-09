import React, { useMemo, useState } from 'react';
import { Check, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { Product } from '../types';
import { COMPANY_INFO } from '../data/waterData';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  const formattedPrice = useMemo(
    () => `${COMPANY_INFO.currency} ${product ? product.price.toLocaleString() : '0'}`,
    [product]
  );

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:text-slate-900"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative min-h-[320px] bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.tag && (
              <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                {product.tag}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-700">
                {product.category}
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                {product.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">{formattedPrice}</span>
                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    {COMPANY_INFO.currency} {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">
                Best for: <span className="font-semibold">{product.bestFor}</span>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Quantity
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-8 text-center text-lg font-bold text-slate-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
