// src/components/Footer/Footer.tsx
import React, { useState } from "react";
import logoImage from "../../../assets/images/Logo.svg";

type FooterProps = {
  logoSrc?: string;
};

const Footer: React.FC<FooterProps> = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // simulate subscription (replace with real API call) mo66 test
    setSubscribed(true);
    setTimeout(() => setEmail(""), 900);
  };

return (
    <footer className="w-full bg-[#2b2d3a] text-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          {/* Brand column */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">JobHuntly</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About column */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">Companies</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Terms</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Advice</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">Help Docs</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Guide</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Updates</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold">Get job notifications</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              />
              <button
                type="submit"
                className={`px-4 py-2.5 rounded-md font-medium text-white transition-colors text-sm
                  ${subscribed ? "bg-emerald-500 hover:bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>

            {error && <div className="text-rose-400 text-xs">{error}</div>}
            {subscribed && !error && <div className="text-emerald-400 text-xs">Thanks — you're subscribed!</div>}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            2025 © JobHuntly. All rights reserved.
          </div>
          
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="w-9 h-9 bg-slate-700 rounded-md flex items-center justify-center hover:bg-slate-600 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                <path d="M22 12a10 10 0 10-11.5 9.95v-7.05H8.9v-2.9h1.6V9.4c0-1.6.95-2.5 2.4-2.5.7 0 1.44.12 1.44.12v1.58h-.8c-.79 0-1.04.5-1.04 1.02v1.22h1.77l-.28 2.9h-1.5V22A10 10 0 0022 12z"/>
              </svg>
              {/* <img src="../../../assets/icons/instagram-brands-solid-full.svg"  alt="facebook" /> */}
            </a>

            <a href="#" aria-label="Instagram" className="w-9 h-9 bg-slate-700 rounded-md flex items-center justify-center hover:bg-slate-600 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.2-3.6a1.1 1.1 0 11-1.1 1.1 1.1 1.1 0 011.1-1.1z"/>
              </svg>
            </a>

            <a href="#" aria-label="Dribbble" className="w-9 h-9 bg-slate-700 rounded-md flex items-center justify-center hover:bg-slate-600 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.61 5.38c1.2 1.46 1.92 3.32 1.96 5.34-.26-.05-2.85-.58-5.45-.25-.12-.28-.23-.57-.36-.86 2.73-1.12 3.98-2.74 4.2-3.04-.35-.31-.73-.58-1.14-.81.03.02.06.03.09.05.31.18.6.38.88.6zm-6.61-3.38c2.13 0 4.07.82 5.52 2.15-.19.26-1.35 1.75-3.96 2.77C12.63 6.57 11.5 5 11.5 5c.17-.04.33-.07.5-.1zm-1.38.37c.14.24 1.26 1.82 2.18 4.16-2.75.73-5.18.71-5.42.71.37-2.17 1.77-3.99 3.24-4.87zm-3.24 7.24V11c.24.01 2.95.04 5.88-.81.15.3.3.61.43.92-2.55.72-4.91 2.77-6.31 5.31-1.51-1.67-2.43-3.88-2.43-6.32 0-.28.02-.56.05-.83.3-.04.63-.07.98-.07 1.57 0 3.06.3 4.42.86-.18.38-.35.76-.51 1.16-1.67-.45-3.45-.65-5.3-.65-.3 0-.59.01-.89.03.02-.2.04-.4.07-.6zm8.24 6.61c-1.46 1.2-3.32 1.92-5.34 1.96.05-.26.58-2.85.25-5.45.28-.12.57-.23.86-.36 1.12 2.73 2.74 3.98 3.04 4.2.31-.35.58-.73.81-1.14-.02.03-.03.06-.05.09-.18.31-.38.6-.6.88z"/>
              </svg>
            </a>

            <a href="#" aria-label="LinkedIn" className="w-9 h-9 bg-slate-700 rounded-md flex items-center justify-center hover:bg-slate-600 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                <path d="M20.45 20.45h-3.55v-5.6c0-1.33-.48-2.24-1.68-2.24-0.92 0-1.47.62-1.71 1.22-.09.22-.11.52-.11.82v5.8H9.28s.05-9.4 0-10.37h3.55v1.47c-.01.02-.03.04-.03.06h.03v-.06c.47-.72 1.33-1.75 3.24-1.75 2.37 0 4.15 1.55 4.15 4.88v5.77zM5.34 7.43A2.06 2.06 0 113.28 5.37 2.06 2.06 0 015.34 7.43zM6.9 20.45H3.77V10.08H6.9v10.37z"/>
              </svg>
            </a>

            <a href="#" aria-label="Twitter" className="w-9 h-9 bg-slate-700 rounded-md flex items-center justify-center hover:bg-slate-600 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                <path d="M22 5.92a7.41 7.41 0 01-2.16.6 3.75 3.75 0 001.64-2.07 7.5 7.5 0 01-2.37.91 3.73 3.73 0 00-6.36 3.4A10.6 10.6 0 013 4.9a3.73 3.73 0 001.15 4.98 3.6 3.6 0 01-1.69-.47v.05a3.73 3.73 0 002.99 3.66 3.74 3.74 0 01-1 .13c-.24 0-.47-.02-.7-.06a3.74 3.74 0 003.49 2.6 7.48 7.48 0 01-4.63 1.6c-.3 0-.6-.02-.89-.05A10.56 10.56 0 0012.3 22c7.16 0 11.08-5.93 11.08-11.07v-.5A7.88 7.88 0 0022 5.92z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
