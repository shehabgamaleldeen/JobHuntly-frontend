import { Users, CheckCircle, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";

// Window width hook
export const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handle = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handle);
        return () => window.removeEventListener("resize", handle);
    }, []);

    return width;
};

// Card
export default function StatisticsCard({ title, bgColor, count }: { title: string; bgColor: string, count: number }) {
    const width = useWindowWidth();

    // Determine the class based on width (mirroring your original tag selection)
    let titleClass = "title-style-a";  // Default to h2-like

    if (width < 410) titleClass = "title-style-c";  // h4-like
    else if (width < 640) titleClass = "title-style-a";  // h5-like    
    else if (width < 670) titleClass = "title-style-e";  // h6-like
    else if (width < 755) titleClass = "title-style-d";  // h5-like
    else if (width < 870) titleClass = "title-style-b";  // h3-like
    else if (width < 1024) titleClass = "title-style-a";  // h2-like
    else if (width < 1150) titleClass = "title-style-c";  // h4-like
    else if (width < 1350) titleClass = "title-style-b";  // h3-like
    else titleClass = "title-style-a";  // h2-like

    let Icon =
        title.includes("candidates") ? Users :
            title.includes("reviewed") ? CheckCircle :
                title.includes("Jobs") ? Briefcase :
                    null;

    // Use a fixed h2 for semantics, but apply dynamic class for styles
    return (
        <div className={`text-white p-6 flex flex-col justify-between h-35 rounded-xl shadow-md ${bgColor}`}>
            <header className="flex justify-between">
                <p className={titleClass}>{title}</p>
                {Icon && <Icon size={24} className="opacity-80" />}
            </header>
            <p className="stat-value">{count}</p>
        </div>
    );
}