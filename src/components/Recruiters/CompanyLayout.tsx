import { Outlet } from "react-router-dom";
import './CompanyStyle.css';

export default function CompanyLayout() {
    return (
        <div className="company-layout">
            {/* Company Navbar & Sidebar To Be Created */}
            <Outlet />
        </div>
    );
}
