import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import instance from '@/components/AxiosConfig/instance';
import notificationSound from '../assets/sounds/Info Notification.mp3'
import { useNavigate } from 'react-router-dom';

interface SocketContextType {
    socket: any;
    notifications: any[];
    setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notifications, setNotifications] = useState<any[]>([]);
    const navigate = useNavigate();

    // Fetching Existing Notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const role = localStorage.getItem("role") || sessionStorage.getItem("role")
                if (role === "JOB_SEEKER") {
                    // An array of notification objects
                    const res = await instance.get("/notifications");

                    setNotifications(res.data.data);
                }
            } catch (err) { console.log(err); }
        };
        fetchNotifications();
    }, []);

    useEffect(() => {
        let activeSocket: any = null; // Track socket for cleanup

        const initializeSocket = async () => {
            try {
                const response = await instance.get("/auth/guest");

                // DEBUG: See exactly what the server sent
                //console.log("Server Response:", response.data.user);
                const user = response.data.user;

                if (user && user._id) {
                    const socketUrl = import.meta.env.VITE_API_BASE_URL;

                    const newSocket = io(socketUrl);
                    activeSocket = newSocket;

                    newSocket.on("connect", () => {
                        //console.log("Socket Connected. Registering:", user._id);
                        newSocket.emit("register", user._id);
                    });

                    newSocket.on("notification_received", (data) => {
                        // Adding the new notification
                        setNotifications(prev => [data, ...prev]);

                        const audio = new Audio(notificationSound);
                        audio.play().catch(err => console.log("Audio play blocked by browser:", err));

                        toast.info(data.message, {
                            action: {
                                label: "Open",
                                onClick: async () => {
                                    if (!data.isRead) {
                                        try {
                                            await instance.patch(`/notifications/${data._id}`);

                                            // 2. Update Local State (Optimistic UI)
                                            setNotifications((prev: any) =>
                                                prev.map((n: any) =>
                                                    n._id === data._id ? { ...n, isRead: true } : n
                                                )
                                            );
                                        } catch (err) {
                                            console.error("Failed to mark as read", err);
                                        }
                                    }
                                    if (data.link) {
                                        navigate(data.link)
                                    }
                                },
                            },
                        });
                    });
                    setSocket(newSocket);
                }
            } catch (error) {
                console.log("Auth failed or Socket error", error);
            }
        };

        initializeSocket();

        // CLEANUP
        return () => {
            if (activeSocket) activeSocket.disconnect();
        };
    }, [navigate]);

    return (
        <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};