import React, { useState } from 'react';
import { CartItem, OrderFormState } from '../types';
import { COMPANY_INFO } from '../data/waterData';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface CartDrawerAndOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawerAndOrderModal: React.FC<CartDrawerAndOrderModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [formData, setFormData] = useState<OrderFormState>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    cityArea: 'Nairobi',
    deliveryTime: 'morning',
    frequency: 'one-time',
    notes: '',
  });

  const [hasEmptyBottles, setHasEmptyBottles] = useState<boolean>(true);
  const [isSubmittedOnline, setIsSubmittedOnline] = useState<boolean>(false);
  const [orderRef, setOrderRef] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    // If it's a 20L bottle and user doesn't have empty bottle for exchange, add KSh 600 bottle deposit
    let unitPrice = item.product.price;
    if (item.product.id === 'prod-20l' && !hasEmptyBottles) {
      unitPrice += 600; // Deposit
    }
    return acc + unitPrice * item.quantity;
  }, 0);

  // Delivery fee: Free for subtotal >= 500 or >= 2 bottles, otherwise KSh 100
  const deliveryFee = subtotal >= 500 || cartItems.some((i) => i.quantity >= 2) ? 0 : 100;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setValidationError(null);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setValidationError('Please enter your full name');
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setValidationError('Please enter a valid phone or WhatsApp number');
      return false;
    }
    if (!formData.address.trim()) {
      setValidationError('Please provide your delivery address or building / estate');
      return false;
    }
    return true;
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    if (!validateForm()) return;

    let itemsText = cartItems
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name} (${item.product.size}) @ ${COMPANY_INFO.currency} ${item.product.price.toLocaleString()}`
      )
      .join('\n');

    if (!hasEmptyBottles && cartItems.some((i) => i.product.id === 'prod-20l')) {
      itemsText += `\n  (+ New 20L Bottle Deposit included)`;
    }

    const message = encodeURIComponent(
      `*NEW ORDER - AQUA UNO*\n\n` +
      `*Customer:* ${formData.fullName}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Location/Address:* ${formData.address} (${formData.cityArea})\n` +
      `*Preferred Delivery:* ${formData.deliveryTime.toUpperCase()} (${formData.frequency})\n` +
      (formData.notes ? `*Notes:* ${formData.notes}\n` : '') +
      `\n*Items Ordered:*\n${itemsText}\n\n` +
      `*Subtotal:* ${COMPANY_INFO.currency} ${subtotal.toLocaleString()}\n` +
      `*Delivery:* ${deliveryFee === 0 ? 'FREE' : COMPANY_INFO.currency + ' ' + deliveryFee}\n` +
      `*TOTAL:* ${COMPANY_INFO.currency} ${grandTotal.toLocaleString()}\n\n` +
      `Please confirm delivery time and dispatch!`
    );

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleOnlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!validateForm()) return;

    const generatedRef = 'AQ1-' + Math.floor(100000 + Math.random() * 900000);
    setOrderRef(generatedRef);
    setIsSubmittedOnline(true);
  };

  const handleReset = () => {
    setIsSubmittedOnline(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slideLeft">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Fresh Water Order</h2>
              <p className="text-xs text-slate-500">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} item(s) selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {isSubmittedOnline ? (
            /* Order Success State */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Order Received!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-bold text-slate-900">{formData.fullName}</span>! Your order reference is{' '}
                <span className="font-mono font-bold text-blue-700">{orderRef}</span>. Our dispatch team has been notified.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left max-w-sm mx-auto space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="font-semibold text-slate-800">{formData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Time:</span>
                  <span className="font-semibold text-slate-800 capitalize">{formData.deliveryTime} window</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Payable on Delivery:</span>
                  <span className="font-bold text-blue-700">{COMPANY_INFO.currency} {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation via WhatsApp</span>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-2 px-4 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Your Cart is Empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select your preferred fresh water bottles or packs from the catalog to place an order.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Selected Products</span>
                  <button
                    onClick={onClearCart}
                    className="text-red-500 hover:text-red-700 text-[11px]"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden">
                  {cartItems.map((item) => {
                    const itemTotal = item.product.price * item.quantity;
                    return (
                      <div key={item.product.id} className="p-3.5 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-slate-500">{item.product.size}</p>
                          <p className="text-xs font-bold text-blue-800 mt-0.5">
                            {COMPANY_INFO.currency} {item.product.price.toLocaleString()} each
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-slate-800 font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 20L Bottle Exchange Option (if 20L is in cart) */}
              {cartItems.some((i) => i.product.id === 'prod-20l') && (
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-950">20L Empty Bottle Exchange</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasEmptyBottles}
                        onChange={(e) => setHasEmptyBottles(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-[11px] text-blue-800 leading-tight">
                    {hasEmptyBottles
                      ? '✓ Yes, I will exchange empty 20L bottles upon delivery (Refill price: KSh 250).'
                      : '✗ No empty bottle to swap. A refundable bottle deposit of KSh 600 per bottle will be added.'}
                  </p>
                </div>
              )}

              {/* Delivery Details Form */}
              <form onSubmit={handleOnlineSubmit} className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Delivery & Contact Information
                </h3>

                {validationError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Samuel Mutua"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 0712 345 678"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Region / County
                    </label>
                    <select
                      name="cityArea"
                      value={formData.cityArea}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Nairobi">Nairobi Metro</option>
                      <option value="Kiambu">Kiambu / Ruiru / Thika</option>
                      <option value="Nyeri">Nyeri / Central Region</option>
                      <option value="Naivasha">Naivasha / Nakuru</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Preferred Time Window
                    </label>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="morning">Morning (8:00 AM – 12:00 PM)</option>
                      <option value="afternoon">Afternoon (1:00 PM – 5:00 PM)</option>
                      <option value="anytime">Anytime Today</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Street Address / Estate / House No. *
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. Riverside Court, Apt B4, Westlands"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Delivery Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'one-time', label: 'One-time' },
                      { id: 'weekly', label: 'Weekly Auto' },
                      { id: 'bi-weekly', label: 'Bi-Weekly' },
                    ].map((f) => (
                      <button
                        type="button"
                        key={f.id}
                        onClick={() => setFormData((prev) => ({ ...prev, frequency: f.id as any }))}
                        className={`py-1.5 px-2 rounded-md font-semibold text-center border transition-all ${
                          formData.frequency === f.id
                            ? 'bg-blue-50 border-blue-500 text-blue-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="e.g. Gate code, leave with security, call on arrival"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer / Summary & Actions (if cart has items and not yet submitted) */}
        {!isSubmittedOnline && cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono font-semibold">
                  {COMPANY_INFO.currency} {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span className="font-semibold text-blue-700">
                  {deliveryFee === 0 ? 'FREE' : `${COMPANY_INFO.currency} ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="font-mono text-blue-800 text-base">
                  {COMPANY_INFO.currency} {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Dual CTA: Instant WhatsApp Order vs Online Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleOnlineSubmit}
                className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Truck className="w-4 h-4" />
                <span>Place Order Online</span>
              </button>
            </div>
            <p className="text-[11px] text-center text-slate-500">
              Pay upon doorstep delivery via M-PESA or Cash.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
