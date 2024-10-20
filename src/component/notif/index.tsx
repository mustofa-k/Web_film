// src/component/Notification.tsx
import React from "react";
import "./notif.css";

interface NotificationProps {
  message: string;
  show: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, show }) => {
  return (
    <>
      {show && (
        <div className="notification">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
