import { useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { Bell, CheckCheck } from 'lucide-react'; // Added CheckCheck icon
import { useNavigate } from 'react-router-dom';
import instance from '@/components/AxiosConfig/instance';

const NotificationDropdown = () => {
    const { notifications, setNotifications } = useSocket();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const unreadCount = notifications.filter((n: any) => !n.isRead).length;

    // --- NEW: Mark All as Read Logic ---
    const handleMarkAllAsRead = async () => {
        if (unreadCount === 0) return;

        try {
            // 1. Backend Call
            const response = await instance.patch('/notifications');

            if (response.data) {
                // 2. Optimistic UI Update
                setNotifications((prev: any) =>
                    prev.map((n: any) => ({ ...n, isRead: true }))
                );
            }
            else
                console.error("Failed to mark all as read");
        } catch (err) {
            console.error("Failed to mark all as read", err);
        }
    };

    const handleNotificationClick = async (notification: any) => {
        if (!notification.isRead) {
            try {
                await instance.patch(`/notifications/${notification._id}`);
                setNotifications((prev: any) =>
                    prev.map((n: any) =>
                        n._id === notification._id ? { ...n, isRead: true } : n
                    )
                );
            } catch (err) {
                console.error("Failed to mark as read", err);
            }
        }

        if (notification.link) navigate(notification.link);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors"
            >
                <Bell className="text-zinc-600" size={22} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-3 w-80 bg-white border border-zinc-200 rounded-2xl shadow-2xl z-50 overflow-hidden">

                        {/* Header with Mark All Read Button */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-50">
                            <div>
                                <h3 className="font-bold text-zinc-900 leading-tight">Notifications</h3>
                                <p className="text-[10px] text-zinc-400">{unreadCount} unread items</p>
                            </div>

                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllAsRead}
                                    className="flex items-center gap-1 text-[11px] text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                                >
                                    <CheckCheck size={14} />
                                    Mark all read
                                </button>
                            )}
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-10 text-center text-zinc-400 text-sm">
                                    No notifications yet
                                </div>
                            ) : (
                                notifications.map((notif: any) => (
                                    <div
                                        key={notif._id}
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`p-4 border-b border-zinc-50 cursor-pointer transition-colors relative
                                            ${notif.isRead ? 'bg-white opacity-70' : 'bg-indigo-50/30 hover:bg-indigo-50/50'}
                                        `}
                                    >
                                        {!notif.isRead && (
                                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                        )}
                                        <div className="ml-2">
                                            <p className={`text-sm ${notif.isRead ? 'text-zinc-500' : 'text-zinc-900 font-medium'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] text-zinc-400 mt-1">
                                                {new Date(notif.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationDropdown;