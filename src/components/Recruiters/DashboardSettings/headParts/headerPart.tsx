import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: string; // optional URL
}

export function PageHeader({ title, description, backTo }: PageHeaderProps) {
  return (
    <header className="bg-white border-bring-1 shadow-sm ring-slate-100 mb-3  rounded-lg overflow-y-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Back arrow (optional) */}
        <div className="flex items-center gap-3">
          {backTo && (
            <Link
              to={backTo}
              className="inline-flex items-center text-slate-700 hover:text-slate-900"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          )}

          <div>
            <h1 className="text-xl font-semibold text-slate-900 overflow-y-hidden">{title}</h1>
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
