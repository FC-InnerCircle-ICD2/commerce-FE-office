import { useState } from 'react';
import { ProductOption, OptionDetail } from '../../types/product';

export const useProductOptions = () => {
  const [options, setOptions] = useState<ProductOption[]>([
    {
      name: '',
      optionDetails: [{ value: '', optionOrder: 1, additionalPrice: 0 }],
    },
  ]);

  const addOption = () => {
    setOptions([...options, { name: '', optionDetails: [{ value: '', optionOrder: 1, additionalPrice: 0 }] }]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const addOptionDetail = (optionIndex: number) => {
    const newOptions = [...options];
    newOptions[optionIndex].optionDetails.push({
      value: '',
      optionOrder: newOptions[optionIndex].optionDetails.length + 1,
      additionalPrice: 0,
    });
    setOptions(newOptions);
  };

  const removeOptionDetail = (optionIndex: number, detailIndex: number) => {
    const newOptions = [...options];
    newOptions[optionIndex].optionDetails = newOptions[optionIndex].optionDetails.filter((_, i) => i !== detailIndex);
    setOptions(newOptions);
  };

  const updateOptionName = (index: number, name: string) => {
    const newOptions = [...options];
    newOptions[index].name = name;
    setOptions(newOptions);
  };

  const updateOptionDetail = (
    optionIndex: number,
    detailIndex: number,
    field: keyof OptionDetail,
    value: string | number,
  ) => {
    const newOptions = [...options];
    const detail = { ...newOptions[optionIndex].optionDetails[detailIndex] };

    if (field === 'value') {
      detail.value = value as string;
    } else if (field === 'additionalPrice') {
      detail.additionalPrice = value as number;
    } else if (field === 'optionOrder') {
      detail.optionOrder = value as number;
    }

    newOptions[optionIndex].optionDetails[detailIndex] = detail;
    setOptions(newOptions);
  };

  return {
    options,
    addOption,
    removeOption,
    addOptionDetail,
    removeOptionDetail,
    updateOptionName,
    updateOptionDetail,
  };
};
