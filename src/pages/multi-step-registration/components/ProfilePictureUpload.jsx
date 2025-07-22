import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePictureUpload = ({ formData, onUpdate, relationship, errors = {} }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(formData.profilePicture || null);
  const fileInputRef = useRef(null);

  const getFormTitle = () => {
    return relationship === 'myself' ? 'Your Profile Picture' : 'His/Her Profile Picture';
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Update form data
    onUpdate({ profilePicture: url, profilePictureFile: file });
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onUpdate({ profilePicture: null, profilePictureFile: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          {getFormTitle()}
        </h2>
        <p className="text-muted-foreground font-body">
          Add a profile picture to make the profile more appealing (optional)
        </p>
      </div>

      <div className="max-w-md mx-auto">
        {/* Preview Section */}
        {previewUrl ? (
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-48 h-48 rounded-xl overflow-hidden border-4 border-border shadow-elevation-2">
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Button
                variant="destructive"
                size="icon"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 rounded-full shadow-elevation-2"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={openFileDialog}
                iconName="Camera"
                iconPosition="left"
              >
                Change Picture
              </Button>
              <p className="text-xs text-muted-foreground font-caption">
                Click to select a different image
              </p>
            </div>
          </div>
        ) : (
          /* Upload Section */
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center
              transition-all duration-200 cursor-pointer
              ${dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Icon name="Camera" size={24} className="text-muted-foreground" />
              </div>
              
              <div>
                <h3 className="font-heading font-medium text-foreground mb-2">
                  Upload Profile Picture
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  Drag and drop an image here, or click to select
                </p>
                
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  className="pointer-events-none"
                >
                  Choose File
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground font-caption space-y-1">
                <p>Supported formats: JPG, PNG, GIF</p>
                <p>Maximum size: 5MB</p>
                <p>Recommended: Square image (1:1 ratio)</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.profilePicture && (
          <div className="mt-2 text-sm text-error font-caption">
            {errors.profilePicture}
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Tips Section */}
      <div className="bg-muted/30 rounded-lg p-4 max-w-md mx-auto">
        <h4 className="font-heading font-medium text-foreground mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
          Photo Tips
        </h4>
        <ul className="text-sm text-muted-foreground font-body space-y-1">
          <li>• Use a clear, recent photo</li>
          <li>• Face should be clearly visible</li>
          <li>• Avoid group photos or sunglasses</li>
          <li>• Good lighting makes a difference</li>
          <li>• Smile naturally for best results</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;