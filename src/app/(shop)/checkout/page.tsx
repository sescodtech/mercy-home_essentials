'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Truck, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-black mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Please add some items to your cart to proceed.</p>
        <Button variant="outline" onClick={() => window.location.href = '/shop'}>
          Return to Shop
        </Button>
      </div >
    );
  }

  const handlePayment = async (provider: 'paystack' | 'flutterwave') => {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep(3);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <StepIndicator number={1} active={step === 1} completed={step > 1} label="Shipping" />
          <div className="hidden sm:block w-12 h-px bg-gray-200" />
          <StepIndicator number={2} active={step === 2} completed={step > 2} label="Payment" />
          <div className="hidden sm:block w-12 h-px bg-gray-200" />
          <StepIndicator number={3} active={step === 3} completed={step > 3} label="Confirm" />
        </div >
      </div >

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl font-black">Shipping Details</h2>
              </div >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                  <Input placeholder="Jane" required />
                </div >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                  <Input placeholder="Doe" required />
                </div >
              </div >
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Address</label>
                <Input placeholder="123 Luxury Ave, Lagos, Nigeria" required />
              </div >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                  <Input placeholder="Lagos" required />
                </div >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                  <Input placeholder="+234 ..." required />
                </div >
              </div >
              <Button className="w-full py-6 h-auto gap-2" onClick={() => setStep(2)}>
                Continue to Payment <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-accent" />
                <h2 className="font-display text-2xl font-black">Payment Method</h2>
              </div >

              <div className="grid sm:grid-cols-2 gap-4">
                <PaymentOption
                  id="paystack"
                  name="Paystack"
                  description="Card, Bank Transfer, USSD"
                  onClick={() => handlePayment('paystack')}
                  isLoading={isLoading}
                />
                <PaymentOption
                  id="flutterwave"
                  name="Flutterwave"
                  description="Global Payments, Cards"
                  onClick={() => handlePayment('flutterwave')}
                  isLoading={isLoading}
                />
              </div >

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <p className="text-xs text-gray-500">Your payment information is encrypted and secure.</p>
              </div >
              <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                Back to Shipping
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-3xl border border-gray-100 shadow-xl text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CustomCheckCircle className="w-10 h-10" />
              </div >
              <h2 className="font-display text-3xl font-black">Order Confirmed!</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Thank you for your purchase. Your premium essentials are being prepared for shipment.
              </p>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-left space-y-3">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Order ID:</span> <span className="font-bold">#MHE-782910</span></div >
                <div className="flex justify-between text-sm"><span className="text-gray-500">Total:</span> <span className="font-bold">${total.toFixed(2)}</span></div >
              </div >
              <Button className="w-full py-6 h-auto" onClick={() => window.location.href = '/'}>
                Return Home
              </Button>
            </motion.div>
          )}
        </div >

        {/* Checkout Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24 space-y-6">
            <h3 className="font-display text-xl font-black">Order Summary</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt={item.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                  </div >
                  <span className="text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div >
              ))}
            </div >
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div >
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="text-green-500 font-bold">FREE</span>
              </div >
              <div className="flex justify-between text-xl font-black pt-3">
                <span>Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div >
            </div >
          </div >
        </div >
      </div >
    </div>
  );
}

function StepIndicator({ number, active, completed, label }: { number: number, active: boolean, completed: boolean, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all",
        active ? "bg-accent text-white ring-4 ring-accent/20" :
        completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
      )}>
        {completed ? <CustomCheckCircle className="w-4 h-4" /> : number}
      </div >
      <span className={cn("text-[10px] font-bold uppercase tracking-widest", active ? "text-accent" : "text-gray-400")}>
        {label}
      </span>
    </div >
  );
}

function PaymentOption({ id, name, description, onClick, isLoading }: { id: string, name: string, description: string, onClick: () => void, isLoading: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start p-6 rounded-2xl border-2 border-gray-100 hover:border-accent transition-all text-left group relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold">
          {name[0]}
        </div >
        <span className="font-bold text-sm">{name}</span>
      </div >
      <p className="text-xs text-gray-500 leading-relaxed mb-4">{description}</p>
      <div className="absolute right-[-20px] bottom-[-20px] opacity-5 group-hover:opacity-10 transition-opacity">
        <CreditCard className="w-20 h-20" />
      </div >
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div >
      )}
    </button>
  );
}

function ArrowRight({ className }: { className: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
}

function CustomCheckCircle({ className }: { className: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="9 11 12 14 22 4"></polyline></svg>;
}
