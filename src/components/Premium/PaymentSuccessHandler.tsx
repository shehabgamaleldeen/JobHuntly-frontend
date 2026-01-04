import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Crown } from 'lucide-react';

export default function PaymentSuccessHandler() {
  const location = useLocation();

  const hasRun = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('payment');

    if (paymentStatus && !hasRun.current) {
      hasRun.current = true;

      if (paymentStatus === 'success') {
        // Delay slightly to ensure Toaster is mounted and ready
        setTimeout(() => {
          toast.success(
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-amber-500" />
              <div>
                <div className="font-semibold">Welcome to Premium!</div>
                <div className="text-sm opacity-90">You now have early access to jobs.</div>
              </div>
            </div>,
            {
              duration: 5000,
            }
          );

          localStorage.setItem('isPremium', 'true');
          window.dispatchEvent(new Event("storage"));
          
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }, 100);

      } else if (paymentStatus === 'cancel') {
        setTimeout(() => {
          toast.error('Payment cancelled. You can upgrade anytime!', {
            duration: 4000,
          });

          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }, 100);
      }
    }
  }, [location]);

  return null; // This component doesn't render anything
}
