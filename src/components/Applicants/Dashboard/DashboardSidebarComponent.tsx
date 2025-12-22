import type { JSX } from "react";
import React, { useState } from "react";
import mainImage from "../../../assets/images/Logo.svg";
import HouseIcon from "../../../assets/icons/house-solid-full (1).svg";
import FolderIcon from "../../../assets/icons/folder-closed-solid-full.svg";
import UserIcon from "../../../assets/icons/user-solid-full.svg";
import HelpIcon from "../../../assets/icons/circle-question-regular-full.svg";
import GearIcon from "../../../assets/icons/gear-solid-full.svg";
import ProfileImage from "../../../assets/images/alex-suprun-ZHvM3XIOHoE-unsplash 1.png";

export type PageKey =
  | "dashboard"
  | "applications"
  | "publicProfile"
  | "settings"
  | "help";

export interface DashboardSidebarProps {
  active?: PageKey;
  onNavigate?: (page: PageKey) => void;
}

export function DashboardSidebarComponent({
  active = "dashboard",
  onNavigate,
}: DashboardSidebarProps): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const itemClass = (p: PageKey) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer w-full ${
      active === p ? "bg-blue-50 text-[#4640DE] font-semibold" : "text-[#7C8493] hover:bg-blue-50"
    }`;

  const handleNav = (p: PageKey, href?: string) => {
    if (onNavigate) onNavigate(p);
    else if (href) window.location.href = href;
    // close drawer on mobile after navigating
    setDrawerOpen(false);
  };

  return (
    <>
      {/* MOBILE: hamburger button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          aria-label="Open navigation"
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-md bg-white shadow-sm border border-gray-200"
        >
          {/* hamburger icon */}
          <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden md:flex md:w-64 min-h-screen bg-[#fbfdff] border-r border-gray-200 
          p-6 flex-col justify-between
        "
        aria-label="Sidebar"
      >
        {/* Top section */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 pb-5">
            <img src={mainImage} alt="JobHuntly logo" className="object-contain w-28" />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3 text-[#7C8493]" aria-label="Main navigation">
            <button type="button" className={itemClass("dashboard")} onClick={() => handleNav("dashboard")}>
              <img className="w-5 h-5" src={HouseIcon} alt="Dashboard" />
              <span>Dashboard</span>
            </button>

            <button type="button" className={itemClass("applications")} onClick={() => handleNav("applications")}>
              <img className="w-5 h-5" src={FolderIcon} alt="Applications" />
              <span>My Applications</span>
            </button>

            <button type="button" className={itemClass("publicProfile")} onClick={() => handleNav("publicProfile")}>
              <img className="w-5 h-5" src={UserIcon} alt="Public profile" />
              <span>My Public Profile</span>
            </button>
          </nav>

          {/* Settings */}
          <div className="mt-10 text-[#7C8493]">
            <h4 className="text-xs text-[#7C8493] uppercase mb-2">Settings</h4>

            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  className={itemClass("settings")}
                  onClick={() => handleNav("settings")}
                >
                  <img className="w-5 h-5" src={GearIcon} alt="Settings" />
                  <span>Settings</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={itemClass("help")}
                  onClick={() => handleNav("help")}
                >
                  <img className="w-5 h-5" src={HelpIcon} alt="Help center" />
                  <span>Help Center</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Profile / Logout */}
        <div className="flex items-center gap-3 mt-6">
          <img src={ProfileImage} alt="avatar" className="w-18 h-18 rounded-full object-cover" />

          <div className="flex flex-col gap-1 text-sm">
            <div className="pb-1.5">
              <div className="font-semibold">Jake Gyll</div>
              <div className="text-[#7C8493] text-xs">jakegyll@email.com</div>
            </div>

            <button
              type="button"
              onClick={() => {
                /* add logout logic here */
              }}
              className="px-4 py-2 border border-rose-200 rounded text-rose-500 text-sm hover:bg-rose-50 w-fit"
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 flex"
          role="dialog"
          aria-modal="true"
        >
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* sliding panel */}
          <div className="relative w-72 max-w-full bg-[#fbfdff] border-r border-gray-200 p-6 overflow-auto transform transition ease-in-out duration-200 translate-x-0">
            {/* close button */}
            <div className="absolute top-4 right-4">
              <button
                aria-label="Close navigation"
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-md bg-white shadow-sm border border-gray-200"
              >
                <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 pb-5">
                  <img src={mainImage} alt="JobHuntly logo" className="object-contain w-28" />
                </div>

                <nav className="flex flex-col gap-3 text-[#7C8493]" aria-label="Mobile navigation">
                  <button type="button" className={itemClass("dashboard")} onClick={() => handleNav("dashboard")}>
                    <img className="w-5 h-5" src={HouseIcon} alt="Dashboard" />
                    <span>Dashboard</span>
                  </button>

                  <button type="button" className={itemClass("applications")} onClick={() => handleNav("applications")}>
                    <img className="w-5 h-5" src={FolderIcon} alt="Applications" />
                    <span>My Applications</span>
                  </button>

                  <button type="button" className={itemClass("publicProfile")} onClick={() => handleNav("publicProfile")}>
                    <img className="w-5 h-5" src={UserIcon} alt="Public profile" />
                    <span>My Public Profile</span>
                  </button>

                  <div className="mt-8 text-[#7C8493]">
                    <h4 className="text-xs text-[#7C8493] uppercase mb-2">Settings</h4>

                    <ul className="space-y-2">
                      <li>
                        <button
                          type="button"
                          className={itemClass("settings")}
                          onClick={() => handleNav("settings")}
                        >
                          <img className="w-5 h-5" src={GearIcon} alt="Settings" />
                          <span>Settings</span>
                        </button>
                      </li>

                      <li>
                        <button
                          type="button"
                          className={itemClass("help")}
                          onClick={() => handleNav("help")}
                        >
                          <img className="w-5 h-5" src={HelpIcon} alt="Help center" />
                          <span>Help Center</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <img src={ProfileImage} alt="avatar" className="w-18 h-18 rounded-full object-cover" />

                <div className="flex flex-col gap-1 text-sm">
                  <div className="pb-1.5">
                    <div className="font-semibold">Jake Gyll</div>
                    <div className="text-[#7C8493] text-xs">jakegyll@email.com</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      /* add logout logic here */
                    }}
                    className="px-4 py-2 border border-rose-200 rounded text-rose-500 text-sm hover:bg-rose-50 w-fit"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardSidebarComponent;
