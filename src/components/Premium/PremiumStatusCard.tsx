import { Crown, Calendar } from 'lucide-react';

interface PremiumStatusCardProps {
  activeSince?: string;
}

export default function PremiumStatusCard({ activeSince }: PremiumStatusCardProps) {
  const formattedDate = activeSince 
    ? new Date(activeSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Recently';

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
          <Crown className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Premium Member</h3>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Calendar className="w-3 h-3" />
            <span>Active since {formattedDate}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-indigo-200">
        <p className="text-xs text-gray-600 mb-2">Premium Benefits:</p>
        <ul className="text-xs text-gray-700 space-y-1">
          <li className="flex items-center gap-1">
            <span className="text-indigo-600">✓</span> Early job access (1 hour)
          </li>
          <li className="flex items-center gap-1">
            <span className="text-indigo-600">✓</span> Priority applications
          </li>
        </ul>
      </div>
    </div>
  );
}
