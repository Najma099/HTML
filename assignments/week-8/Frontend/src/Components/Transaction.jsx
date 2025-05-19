import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { transactionAtom } from '../store/transaction.atom';
import axios from 'axios';
import { apiDomain } from '../utils/config';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useRecoilState(transactionAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(apiDomain + '/api/v1/account/history', {
          withCredentials: true,
        });

        if (res.data && Array.isArray(res.data.transactions)) {
          setTransactions(res.data.transactions.slice());
        } else {
          console.error('Expected array but got:', res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [setTransactions]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transaction History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th>ID</th>
              <th>Type</th>
              <th>Amount (₹)</th>
              <th>From</th>
              <th>To</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id} style={{ borderBottom: '1px solid #eee' }}>
                <td>{txn._id}</td>
                <td>{txn.type.toUpperCase()}</td>
                <td>{txn.amount}</td>
                <td>{txn.from}</td>
                <td>{txn.to}</td>
                <td>{new Date(txn.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
