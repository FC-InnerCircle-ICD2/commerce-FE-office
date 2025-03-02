import React, { useState } from 'react';
import { useGetCategory } from '../../hooks/useCategory';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ProductFormValues } from '../../types/product';

interface Category {
  id: number;
  name: string;
  parentCategoryId: number | null;
  subCategories: Category[];
}

interface ComboBoxProps {
  id: string;
  label: string;
  register: UseFormRegister<ProductFormValues>;
  error?: string;
  setValue: UseFormSetValue<ProductFormValues>;
}

const ComboBox: React.FC<ComboBoxProps> = ({ id, label, register, error, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const { data: categories, isLoading } = useGetCategory();

  const handleSelect = (category: Category) => {
    setSelectedCategoryName(category.name);
    setIsOpen(false);
    setValue('categoryId', category.id.toString()); // 폼 값을 업데이트
  };

  const renderCategories = (categories: Category[] | undefined) => {
    if (!categories) return null;

    return categories.map((category) => (
      <React.Fragment key={category.id}>
        <li
          className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
          onClick={() => handleSelect(category)}
        >
          {category.name}
        </li>
        {category.subCategories.length > 0 && <ul className="pl-6">{renderCategories(category.subCategories)}</ul>}
      </React.Fragment>
    ));
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="mt-1 relative">
        <input
          type="text"
          id={id}
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          value={selectedCategoryName} // UI에는 name을 표시
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          placeholder="카테고리를 선택해주세요"
          {...register('categoryId')}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {isLoading ? (
            <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9">로딩 중...</li>
          ) : (
            renderCategories(categories)
          )}
        </ul>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ComboBox;
