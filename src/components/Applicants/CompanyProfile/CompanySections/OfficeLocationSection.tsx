import { useState } from "react";
import type { Country } from "../Types";

function OfficeLocationSection({ countries }: { countries: Country[] }) {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(0);

  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const hasNextPage = endIndex < countries.length;
  const visibleCountries = countries.slice(startIndex, endIndex);

  const hasPrevPage = page > 0;

  return (
    <div className="rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Office Locations</h2>

      <p className="text-base text-slate-600 font-normal leading-relaxed mb-4 font-epilogue">
        Offices spread across {countries.length} countries.
      </p>

      <ul className="space-y-3">
        {visibleCountries.map((country, index) => (
          <li
            key={`${country.code}-${index}`}
            className="flex items-center gap-3 text-gray-700"
          >
            {/* Country code instead of logo */}
            <span className="text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
              {country.code}
            </span>

            <span className="text-[16px] font-medium">{country.name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 p-6 flex gap-4">
        {hasPrevPage && (
          <button
            className="text-[#4640de] font-medium hover:underline"
            style={{ fontSize: "16px" }}
            onClick={() => setPage((prev) => prev - 1)}
          >
            ← Previous
          </button>
        )}

        {hasNextPage && (
          <button
            className="text-[#4640de] font-medium hover:underline"
            style={{ fontSize: "16px" }}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

export default OfficeLocationSection;
