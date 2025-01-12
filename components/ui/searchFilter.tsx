import Button from 'components/ui/Button';
import React, { useState } from 'react';

const SearchFilter = ({
  handleInputValue,
}: {
  // eslint-disable-next-line no-unused-vars
  handleInputValue: (value: string) => void;
}): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === '') {
      handleInputValue('');
    }
  };

  const handleButtonClick = () => {
    handleInputValue(inputValue);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 flex flex-col justify-center items-center sm:space-x-4">
      <input
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Search By Id or Name"
        className="w-full sm:w-72 p-3 rounded-lg border-2 border-neutral bg-white text-black placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />
      <Button
        onClick={handleButtonClick}
        text="Search"
        className="px-4 py-2 sm:mt-0 mt-4"
      />
    </div>
  );
};

export default SearchFilter;
