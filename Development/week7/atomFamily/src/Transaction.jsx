import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { transactionAtom } from '../src/store/transaction.atom';

const dummyTransactions = [
  {
    _id: 'txn001',
    type: 'credit',
    amount: 1500,
    from: 'Alice',
    to: 'Bob',
    firstName: 'Diaa',
    lastName: 'Lii',
    timestamp: '2025-05-18T10:30:00Z',
  },
  {
    _id: 'txn002',
    type: 'debit',
    amount: 500,
    from: 'Bob',
    to: 'Charlie',
    firstName: 'Charliiiii',
    lastName: 'keoo',
    timestamp: '2025-05-18T12:00:00Z',
  },
  {
    _id: 'txn003',
    type: 'credit',
    amount: 1200,
    from: 'Eve',
    to: 'Alice',
    firstName: 'Megh',
    lastName: 'Lio',
    timestamp: '2025-05-19T09:15:00Z',
  },
];

const TransactionHistory = () => {
  const [transactions, setTransactions] = useRecoilState(transactionAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Instead of fetching, just set the dummy data after a short delay (to simulate loading)
    setTimeout(() => {
      setTransactions(dummyTransactions);
      setLoading(false);
    }, 500);
  }, [setTransactions]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="text-center bg-blue-400 text-white rounded font-serif p-2 text-2xl w-[70%] mx-auto mt-10">Transaction History</h2>
      {loading ? (
        <div className="flex justify-center items-center my-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : transactions.length === 0 ? (
        <p className="text-center mt-10">No transactions found.</p>
      ) : (
        <table className="w-[70%] mx-auto border-collapse">
          <tbody className='p-20 m-20'>
            {transactions.map((txn) => (
              txn.type === 'credit' ? (
                <tr key={txn._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  
                  <td className="p-4 align-top">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
                        />
                      </svg>
                    </div>
                  </td>
                  
                  <td className="py-4 pr-8 align-top">
                    <p className="text-sm text-gray-500 mb-1">Received from</p>
                    <h2 className="text-base font-semibold text-gray-800">
                      {txn.firstName} {txn.lastName}
                    </h2>
                  </td>
                  
                  <td className="py-4 align-top text-right pr-3">
                    <h2 className="text-lg font-semibold text-green-600">+ ₹{txn.amount}</h2>
                    <p className="text-sm text-gray-500">{formatDate(txn.timestamp)}</p>
                  </td>
                </tr>

              ) : (
                <tr key={txn._id} className="border-b border-gray-200 bg-gray-100">
                  <td className='p-4'>
                    <div className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        /> 
                      </svg>
                    </div>
                  </td>
                  <td className="py-4 pr-8 align-top">
                    <p className="text-sm text-gray-500 mb-1">Paid to</p>
                    <h2 className="text-base font-semibold text-gray-800">
                      {txn.firstName} {txn.lastName}
                    </h2>
                  </td>
                  
                  <td className="py-4 align-top text-right  pr-3">
                    <h2 className="text-lg font-semibold text-red-500">- ₹{txn.amount}</h2>
                    <p className="text-sm text-gray-500">{formatDate(txn.timestamp)}</p>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${getOrdinal(day)} ${month} ${year}`;
}

export default TransactionHistory;
