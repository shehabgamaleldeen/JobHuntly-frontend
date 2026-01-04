import { useState } from 'react';
import { Crown } from 'lucide-react';
import PremiumModal from '../Premium/PremiumModal';
import PremiumBadge from './PremiumBadge';

interface PremiumNotificationProps {
  isPremium?: boolean;
}

export default function PremiumNotification({ isPremium = false }: PremiumNotificationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If user is premium, show badge instead of button
  if (isPremium) {
    return <PremiumBadge />;
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg font-medium hover:from-amber-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg"
      >
        <Crown className="w-4 h-4" />
        <span className="hidden sm:inline">Go Premium</span>
      </button>

      <PremiumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
