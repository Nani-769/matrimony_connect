import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default' // 'default', 'danger', 'success'
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
      
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'AlertTriangle',
          iconColor: 'text-error',
          confirmVariant: 'destructive'
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-success',
          confirmVariant: 'success'
        };
      default:
        return {
          icon: 'AlertCircle',
          iconColor: 'text-warning',
          confirmVariant: 'default'
        };
    }
  };

  if (!isOpen) {
    return null;
  }

  const typeStyles = getTypeStyles();

  const modalContent = (
    <div 
      className="fixed inset-0 z-200 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-md bg-background rounded-xl shadow-elevation-3 overflow-hidden animate-scale-in"
      >
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center ${typeStyles.iconColor}`}>
              <Icon name={typeStyles.icon} size={24} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 pt-0">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant={typeStyles.confirmVariant}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ConfirmationModal;