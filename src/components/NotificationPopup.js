// src/components/NotificationPopup.js
import React from 'react';
import { useNotification } from '../context/NotificationContext';

export const NotificationPopup = () => {
  const {
    showNotification,
    email,
    setEmail,
    notificationStatus,
    handleSubmitEmail,
    handleClose
  } = useNotification();

  return (
    <div className={`modal ${showNotification ? 'show' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Notification de disponibilité</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmitEmail();
            }}>
              <div className="mb-3">
                <label className="form-label">Adresse email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={handleClose}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
          {notificationStatus && (
            <div className={`alert mt-3 ${notificationStatus === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {notificationStatus === 'success'
                ? 'Votre email a été enregistré avec succès'
                : 'Une erreur est survenue'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};