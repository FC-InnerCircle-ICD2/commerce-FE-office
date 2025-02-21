export interface OptionDetail {
  value: string;
  optionOrder: number;
  additionalPrice: number;
}

export interface ProductOption {
  name: string;
  optionDetails: OptionDetail[];
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  providerId: string;
  categoryId: string;
  options?: ProductOption[];
  mainImage: File | null;
  detailImages: File[];
}
