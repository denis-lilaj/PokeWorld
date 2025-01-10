import React, { useState } from 'react';

const SearchFilter = ({
  handleInputValue,
}: {
  // eslint-disable-next-line no-unused-vars
  handleInputValue: (value: string) => void;
}) : JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); 
  };
  const handleButtonClick = () => {
    handleInputValue(inputValue); 
  };

  return (
    <div className='flex items-center space-x-4 p-4'>
      <input
        onChange={handleInputChange}
        placeholder='Search By Id or Name'
        className='border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button onClick={handleButtonClick} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none'>
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
