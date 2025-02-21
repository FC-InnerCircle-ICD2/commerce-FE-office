import { useState, ChangeEvent } from 'react';

export const useBannerImages = () => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);
  const [iconImage, setIconImage] = useState<File | null>(null);
  const [iconImagePreview, setIconImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'bannerImage' | 'iconImage') => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (field === 'bannerImage') {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setIconImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBannerImage = () => {
    setBannerImage(null);
    setBannerImagePreview(null);
  };

  const removeIconImage = () => {
    setIconImage(null);
    setIconImagePreview(null);
  };

  return {
    bannerImage,
    bannerImagePreview,
    iconImage,
    iconImagePreview,
    handleFileChange,
    removeBannerImage,
    removeIconImage,
  };
};
