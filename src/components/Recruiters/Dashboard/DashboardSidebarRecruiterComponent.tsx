import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import mainImage from "../../../assets/images/Logo.svg";
import HouseIcon from "../../../assets/icons/house-solid-full (1).svg";
import FolderIcon from "../../../assets/icons/folder-closed-solid-full.svg";
import UserIcon from "../../../assets/icons/user-solid-full.svg";
import HelpIcon from "../../../assets/icons/circle-question-regular-full.svg";
import GearIcon from "../../../assets/icons/gear-solid-full.svg";
import instance from "@/components/AxiosConfig/instance";


interface UserProfile {
  user: {
    _id: string
    fullName: string
    email: string
    role: string
  }
  profile: {
    logoUrl?: string
    avatarUrl?: string
  }
}


const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg w-full transition
   ${
     isActive
       ? "bg-blue-50 text-[#4640DE] font-semibold"
       : "text-[#7C8493] hover:bg-blue-50"
   }`;

export function DashboardSidebarRecruiterComponent(): JSX.Element {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isPremium, setIsPremium] = useState(
    () => localStorage.getItem('isPremium') === 'true'
  )
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile
  useEffect(() => {
    fetchUserProfile()
  }, [])

  // Listen to premium status changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsPremium(localStorage.getItem('isPremium') === 'true')
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await instance.get('/settings/getProfileRecruiter')
      if (response.data.success) {
        setUserProfile(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('role')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('role')
    localStorage.removeItem('isPremium')
    navigate('/login')
    window.dispatchEvent(new Event('storage'))
  }

  const closeDrawer = () => setDrawerOpen(false)

  // Get avatar letter based on role
  const getAvatarLetter = () => {
    if (!userProfile) return 'U'
    return userProfile.user.role === 'COMPANY' ? 'C' : 'U'
  }

  // Get avatar/logo URL
  const getAvatarUrl = () => {
    if (!userProfile) return null
    return userProfile.profile.logoUrl || userProfile.profile.avatarUrl || null
  }
  

  return (
    <>
      {/* MOBILE: hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-md bg-white shadow-sm border border-gray-200"
        >
          <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex md:w-64 min-h-screen bg-[#fbfdff] border-r border-gray-200 p-6 flex-col justify-between">
        <div>
          <Link to="/" > <img src={mainImage} alt="logo" className="w-28 mb-6" /></Link>

          <nav className="flex flex-col gap-3">
            <NavLink to="" end className={linkClass}>
              <img src={HouseIcon} className="w-5 h-5" />
              Dashboard
            </NavLink>

            <NavLink to="company-profile" className={linkClass}>
              <img src={UserIcon} className="w-5 h-5" />
              Company Profile
            </NavLink>

            <NavLink to="job-listing" className={linkClass}>
              <img src={FolderIcon} className="w-5 h-5" />
              Job Listing
            </NavLink>
          </nav>

          <div className="mt-10">
            <h4 className="text-xs uppercase text-[#7C8493] mb-2">Settings</h4>

            <NavLink to="settings" className={linkClass}>
              <img src={GearIcon} className="w-5 h-5" />
              Settings
            </NavLink>

            <NavLink to="help" className={linkClass}>
              <img src={HelpIcon} className="w-5 h-5" />
              Help Center
            </NavLink>
          </div>
        </div>

 
        {/* Profile */}
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          </div>
        ) : userProfile ? (
          <div className="flex items-center gap-3">
            {getAvatarUrl() ? (
              <img
                src={getAvatarUrl()!}
                alt={userProfile.user.fullName}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {getAvatarLetter()}
                </span>
              </div>
            )}
            <div>
              <div className="font-semibold text-gray-900 truncate max-w-[120px]">
                {userProfile.user.fullName}
              </div>
              <div className="text-xs text-[#7C8493] truncate max-w-[120px]">
                {userProfile.user.email}
              </div>
              <button
                onClick={handleLogout}
                className="mt-2 px-3 py-1 border border-rose-200 text-rose-500 rounded hover:bg-rose-50 text-sm transition"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : null}
      </aside>


      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={closeDrawer} />

          <div className="relative w-72 bg-[#fbfdff] p-6 border-r">
            <button
              onClick={closeDrawer}
              className="absolute top-4 right-4 p-2 border rounded"
            >
              ✕
            </button>

            <nav className="flex flex-col gap-3 mt-10">
              <NavLink to="" end className={linkClass} onClick={closeDrawer}>
                Dashboard
              </NavLink>

              <NavLink to="company-profile" className={linkClass} onClick={closeDrawer}>
                Company Profile
              </NavLink>

              <NavLink to="job-listing" className={linkClass} onClick={closeDrawer}>
                Job Listing
              </NavLink>

              <NavLink to="settings" className={linkClass} onClick={closeDrawer}>
                Settings
              </NavLink>

              <NavLink to="help" className={linkClass} onClick={closeDrawer}>
                Help Center
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardSidebarRecruiterComponent;
// import type { JSX } from "react";
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, NavLink } from "react-router-dom";

// import mainImage from "../../../assets/images/Logo.svg";
// import HouseIcon from "../../../assets/icons/house-solid-full (1).svg";
// import FolderIcon from "../../../assets/icons/folder-closed-solid-full.svg";
// import UserIcon from "../../../assets/icons/user-solid-full.svg";
// import HelpIcon from "../../../assets/icons/circle-question-regular-full.svg";
// import GearIcon from "../../../assets/icons/gear-solid-full.svg";
// import instance from "@/components/AxiosConfig/instance";

// interface UserProfile {
//   user: {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: string;
//   };
//   profile: {
//     avatarUrl?: string;
//     logoUrl?: string;
//   };
// }

// const linkClass = ({ isActive }: { isActive: boolean }) =>
//   `flex items-center gap-3 px-3 py-2 rounded-lg w-full transition
//    ${
//      isActive
//        ? "bg-blue-50 text-[#4640DE] font-semibold"
//        : "text-[#7C8493] hover:bg-blue-50"
//    }`;

// export function DashboardSidebarRecruiterComponent(): JSX.Element {
//   const navigate = useNavigate();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch user profile
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await instance.get('/settings/getProfile');
//       if (response.data.success) {
//         setUserProfile(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem('accessToken');
//     sessionStorage.removeItem('refreshToken');
//     sessionStorage.removeItem('role');
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('role');
//     localStorage.removeItem('isPremium');
//     navigate('/login');
//     window.dispatchEvent(new Event('storage'));
//   };

//   const closeDrawer = () => setDrawerOpen(false);

//   // Get avatar letter based on role
//   const getAvatarLetter = () => {
//     if (!userProfile) return 'C';
//     return userProfile.user.role === 'COMPANY' ? 'C' : 'U';
//   };

//   // Get avatar/logo URL
//   const getAvatarUrl = () => {
//     if (!userProfile) return null;
//     return userProfile.profile.logoUrl || userProfile.profile.avatarUrl || null;
//   };

//   // Don't render if no user data and not loading
//   if (!loading && !userProfile) return null;

//   return (
//     <>
//       {/* MOBILE: hamburger */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setDrawerOpen(true)}
//           className="p-2 rounded-md bg-white shadow-sm border border-gray-200"
//         >
//           <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//             <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>

//       {/* DESKTOP SIDEBAR */}
//       <aside className="hidden md:flex md:w-64 min-h-screen bg-[#fbfdff] border-r border-gray-200 p-6 flex-col justify-between">
//         <div>
//           <Link to="/">
//             <img src={mainImage} alt="logo" className="w-28 mb-6" />
//           </Link>

//           <nav className="flex flex-col gap-3">
//             <NavLink to="" end className={linkClass}>
//               <img src={HouseIcon} className="w-5 h-5" alt="Dashboard" />
//               Dashboard
//             </NavLink>

//             <NavLink to="company-profile" className={linkClass}>
//               <img src={UserIcon} className="w-5 h-5" alt="Company Profile" />
//               Company Profile
//             </NavLink>

//             <NavLink to="job-listing" className={linkClass}>
//               <img src={FolderIcon} className="w-5 h-5" alt="Job Listing" />
//               Job Listing
//             </NavLink>
//           </nav>

//           <div className="mt-10">
//             <h4 className="text-xs uppercase text-[#7C8493] mb-2">Settings</h4>

//             <NavLink to="settings" className={linkClass}>
//               <img src={GearIcon} className="w-5 h-5" alt="Settings" />
//               Settings
//             </NavLink>

//             <NavLink to="help" className={linkClass}>
//               <img src={HelpIcon} className="w-5 h-5" alt="Help" />
//               Help Center
//             </NavLink>
//           </div>
//         </div>

//         {/* Profile */}
//         {loading ? (
//           <div className="flex items-center gap-3">
//             <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
//             <div className="flex-1">
//               <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
//               <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
//             </div>
//           </div>
//         ) : userProfile ? (
//           <div className="flex items-center gap-3">
//             {getAvatarUrl() ? (
//               <img
//                 src={getAvatarUrl()!}
//                 alt={userProfile.user.fullName}
//                 className="w-14 h-14 rounded-full object-cover"
//               />
//             ) : (
//               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
//                 <span className="text-xl font-bold text-white">
//                   {getAvatarLetter()}
//                 </span>
//               </div>
//             )}
//             <div>
//               <div className="font-semibold text-gray-900 truncate max-w-[120px]">
//                 {userProfile.user.fullName}
//               </div>
//               <div className="text-xs text-[#7C8493] truncate max-w-[120px]">
//                 {userProfile.user.email}
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="mt-2 px-3 py-1 border border-rose-200 text-rose-500 rounded hover:bg-rose-50 text-sm transition"
//               >
//                 Log Out
//               </button>
//             </div>
//           </div>
//         ) : null}
//       </aside>

//       {/* MOBILE DRAWER */}
//       {drawerOpen && (
//         <div className="fixed inset-0 z-40 flex">
//           <div className="fixed inset-0 bg-black/40" onClick={closeDrawer} />

//           <div className="relative w-72 bg-[#fbfdff] p-6 border-r h-full overflow-y-auto flex flex-col justify-between">
//             <div>
//               <button
//                 onClick={closeDrawer}
//                 className="absolute top-4 right-4 p-2 border rounded hover:bg-gray-100"
//               >
//                 ✕
//               </button>

//               <Link to="/" onClick={closeDrawer}>
//                 <img src={mainImage} alt="logo" className="w-28 mb-6 mt-10" />
//               </Link>

//               <nav className="flex flex-col gap-3">
//                 <NavLink to="" end className={linkClass} onClick={closeDrawer}>
//                   <img src={HouseIcon} className="w-5 h-5" alt="Dashboard" />
//                   Dashboard
//                 </NavLink>

//                 <NavLink to="company-profile" className={linkClass} onClick={closeDrawer}>
//                   <img src={UserIcon} className="w-5 h-5" alt="Company Profile" />
//                   Company Profile
//                 </NavLink>

//                 <NavLink to="job-listing" className={linkClass} onClick={closeDrawer}>
//                   <img src={FolderIcon} className="w-5 h-5" alt="Job Listing" />
//                   Job Listing
//                 </NavLink>
//               </nav>

//               <div className="mt-10">
//                 <h4 className="text-xs uppercase text-[#7C8493] mb-2">Settings</h4>

//                 <NavLink to="settings" className={linkClass} onClick={closeDrawer}>
//                   <img src={GearIcon} className="w-5 h-5" alt="Settings" />
//                   Settings
//                 </NavLink>

//                 <NavLink to="help" className={linkClass} onClick={closeDrawer}>
//                   <img src={HelpIcon} className="w-5 h-5" alt="Help" />
//                   Help Center
//                 </NavLink>
//               </div>
//             </div>

//             {/* Mobile Profile */}
//             {loading ? (
//               <div className="flex items-center gap-3 mt-6">
//                 <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
//                 <div className="flex-1">
//                   <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
//                   <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
//                 </div>
//               </div>
//             ) : userProfile ? (
//               <div className="flex items-center gap-3 mt-6 pt-6 border-t">
//                 {getAvatarUrl() ? (
//                   <img
//                     src={getAvatarUrl()!}
//                     alt={userProfile.user.fullName}
//                     className="w-14 h-14 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
//                     <span className="text-xl font-bold text-white">
//                       {getAvatarLetter()}
//                     </span>
//                   </div>
//                 )}
//                 <div>
//                   <div className="font-semibold text-gray-900 truncate max-w-[150px]">
//                     {userProfile.user.fullName}
//                   </div>
//                   <div className="text-xs text-[#7C8493] truncate max-w-[150px]">
//                     {userProfile.user.email}
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="mt-2 px-3 py-1 border border-rose-200 text-rose-500 rounded hover:bg-rose-50 text-sm transition"
//                   >
//                     Log Out
//                   </button>
//                 </div>
//               </div>
//             ) : null}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default DashboardSidebarRecruiterComponent;