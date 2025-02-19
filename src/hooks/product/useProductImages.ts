import { useState, ChangeEvent } from 'react';

export const useProductImages = () => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);
  const [detailImagePreviews, setDetailImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'mainImage' | 'detailImages') => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'mainImage') {
      const file = files[0];
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      const newFiles = Array.from(files);
      setDetailImages((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDetailImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeDetailImage = (index: number) => {
    setDetailImages((prev) => prev.filter((_, i) => i !== index));
    setDetailImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview(null);
  };

  return {
    mainImage,
    mainImagePreview,
    detailImages,
    detailImagePreviews,
    handleFileChange,
    removeDetailImage,
    removeMainImage,
  };
};
