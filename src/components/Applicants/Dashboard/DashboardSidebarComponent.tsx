import type { JSX } from "react";

export function DashboardSidebarComponent(): JSX.Element {
  return (
    <aside className="
      w-64 min-h-screen bg-[#fbfdff] border-r border-gray-200 
      p-6 flex flex-col justify-between 
      max-md:hidden
    ">
      {/* Top section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-7">
          <img
            src="/mnt/data/0f71f64b-cdee-42ef-8b5a-20a3be3aa0ca.png"
            alt="JobHuntly logo"
            className="w-9 h-9 rounded-lg object-cover"
          />
          <span className="font-bold text-lg">JobHuntly</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-gray-600">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100" href="#">
            🏠 Dashboard
          </a>

          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100" href="#">
            📁 My Applications
          </a>

          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100" href="./">
            👤 My Public Profile
          </a>
        </nav>

        {/* Settings */}
        <div className="mt-10">
          <h4 className="text-xs text-gray-400 uppercase mb-2">Settings</h4>

          <ul className="space-y-2">
            <li className="px-3 py-2 rounded-lg bg-purple-50 text-purple-700 font-semibold cursor-pointer">
              Settings
            </li>
            <li className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              Help Center
            </li>
          </ul>
        </div>
      </div>

      {/* Profile / Logout */}
      <div className="flex items-center gap-3 mt-6">
        <img
          src="/mnt/data/fb6c2671-c864-476f-b70f-4b9bbc6d1be0.png"
          alt="avatar"
          className="w-11 h-11 rounded-full object-cover"
        />

        <div className="text-sm">
          <button className="text-red-500 text-xs mb-1 hover:underline">Log Out</button>
          <div className="font-semibold">Jake Gyll</div>
          <div className="text-gray-400 text-xs">jakegyll@email.com</div>
        </div>
      </div>
    </aside>
  );
}
