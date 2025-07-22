import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePhotoUpload = ({ currentPhoto, onPhotoUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentPhoto);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
        setIsUploading(true);
        
        // Simulate upload process
        setTimeout(() => {
          setIsUploading(false);
          if (onPhotoUpdate) {
            onPhotoUpdate(e.target.result);
          }
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    if (onPhotoUpdate) {
      onPhotoUpdate(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold mb-4">Profile Photo</h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Photo Preview */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border bg-muted">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="User" size={48} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          {/* Upload Progress Overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Upload Instructions */}
        <div className="text-center">
          <p className="text-sm font-body text-muted-foreground mb-2">
            Upload a clear photo of yourself
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            JPG, PNG or GIF (max. 5MB)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUploadClick}
            iconName="Upload"
            iconPosition="left"
            disabled={isUploading}
          >
            {previewUrl ? 'Change Photo' : 'Upload Photo'}
          </Button>
          
          {previewUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemovePhoto}
              iconName="Trash2"
              iconPosition="left"
              className="text-error hover:text-error"
              disabled={isUploading}
            >
              Remove
            </Button>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;