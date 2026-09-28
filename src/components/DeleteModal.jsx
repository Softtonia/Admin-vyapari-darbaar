import React from 'react';
import './DeleteModal.css';

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;
  return (
    <div className="dm-backdrop" onClick={onClose}>
      <div className="dm-content" onClick={e => e.stopPropagation()}>
        <div className="dm-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
        <h3 className="dm-title">{title || 'Confirm Delete'}</h3>
        <p className="dm-message">{message || 'Are you sure you want to delete this?'}</p>
        <div className="dm-actions">
          <button className="dm-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="dm-btn-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
