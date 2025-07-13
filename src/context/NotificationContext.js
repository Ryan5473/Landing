// src/context/NotificationContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [email, setEmail] = useState('');
  const [notificationStatus, setNotificationStatus] = useState(null);

  const handleNotifyMe = useCallback((productId) => {
    setShowNotification(true);
  }, []);

  const handleSubmitEmail = useCallback(async (productId) => {
    try {
      // Simuler l'envoi de l'email (à remplacer par une API réelle)
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });

      if (response.success) {
        setNotificationStatus('success');
        setTimeout(() => {
          setShowNotification(false);
          setNotificationStatus(null);
          setEmail('');
        }, 2000);
      }
    } catch (error) {
      setNotificationStatus('error');
      setTimeout(() => {
        setNotificationStatus(null);
      }, 2000);
    }
  }, []);

  const handleClose = useCallback(() => {
    setShowNotification(false);
    setNotificationStatus(null);
    setEmail('');
  }, []);

  const value = {
    showNotification,
    email,
    setEmail,
    notificationStatus,
    handleNotifyMe,
    handleSubmitEmail,
    handleClose
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification doit être utilisé dans un NotificationProvider');
  }
  return context;
};