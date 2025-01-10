import React from 'react';

const SearchFilter = ({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className='flex items-center space-x-4 p-4'>
      <input
        onChange={onChange}
        placeholder='Search By Id or Name'
        className='border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none'>
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
