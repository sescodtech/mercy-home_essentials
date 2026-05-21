export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm bg-gradient-to-br from-accent to-orange-600">
                M
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-lg tracking-tight">MERCY HOME</span>
                <span className="text-accent text-[10px] tracking-widest font-black uppercase">ESSENTIALS</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for a modern home and efficient workspace. Premium curated essentials for every corner of your life.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-all">FB</a>
              <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all">IG</a>
              <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 transition-all">WA</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/shop?cat=kitchen" className="hover:text-white transition-colors">Kitchen & Home</a></li>
              <li><a href="/shop?cat=office" className="hover:text-white transition-colors">Office Supplies</a></li>
              <li><a href="/shop?cat=tech" className="hover:text-white transition-colors">Tech Gadgets</a></li>
              <li><a href="/shop?cat=security" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="/shop?cat=wellness" className="hover:text-white transition-colors">Wellness</a></li>
              <li><a href="/shop?cat=gaming" className="hover:text-white transition-colors">Gaming</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Get exclusive deals and first access to new arrivals.</p>
            <form className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-white px-4 py-2 text-sm w-full outline-none placeholder:text-gray-500"
              />
              <button className="px-4 bg-accent text-white font-bold text-xs hover:bg-orange-600 transition-all">JOIN</button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
          <span>© 2026 Mercy Home Essentials. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
