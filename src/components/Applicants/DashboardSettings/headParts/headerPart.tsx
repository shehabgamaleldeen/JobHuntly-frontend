import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonText?: string;   // optional right-side button label
  buttonLink?: string;   // optional right-side button URL
}

export function PageHeader({
  title,
  description,
  buttonText,
  buttonLink
}: PageHeaderProps) {
  return (
    <header className="bg-white border-bring-1 shadow-sm ring-slate-100 mb-3  rounded-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">

          {/* Left: Title + Description */}
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>

            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>

          {/* Right-side button (optional) */}
          {buttonText && buttonLink && (
            <Link
              to={buttonLink}
              className="inline-block px-4 py-2 border border-purple-200 rounded text-[#4640DE] text-sm hover:bg-purple-50 whitespace-nowrap"
            >
              {buttonText}
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
