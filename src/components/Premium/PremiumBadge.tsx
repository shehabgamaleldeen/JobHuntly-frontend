import { Crown } from 'lucide-react';

export default function PremiumBadge() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-amber-400 rounded-lg font-medium shadow-md border border-amber-400/20">
      <Crown className="w-4 h-4" />
      <span className="hidden sm:inline">Premium</span>
    </div>
  );
}
