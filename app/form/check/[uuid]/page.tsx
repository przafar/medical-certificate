// client/page.tsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';

const ClientPage = () => {
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        'http://10.10.10.20:8092/api/v2/forms/check/9b1312d9-2d2b-42f3-8749-38144fb8adcb',
        {
          code: confirmationCode,
        }
      );

      // Handle success
      console.log('Confirmation successful:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error during confirmation:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Код подтверждения
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="1234"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleConfirm}
          >
            Подвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
