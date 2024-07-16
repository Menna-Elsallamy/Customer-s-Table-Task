// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TransactionTable = ({ selectedCustomerId }) => {
//     const [transactions, setTransactions] = useState([]);
//     const [filter, setFilter] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/transactions')
//             .then(response => (response.data))
//             .catch(error => console.error('Error fetching customers:', error));
//     }, []);
//     return (
//         <div>
//             <input 
//                 type="text" 
//                 placeholder="Filter by amount" 
//                 value={filter} 
//                 onChange={e => setFilter(e.target.value)} 
//             />
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Date</th>
//                         <th>Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.filter(t => t.amount.toString().includes(filter)).map(transaction => (
//                         <tr key={transaction.id}>
//                             <td>{transaction.id}</td>
//                             <td>{transaction.date}</td>
//                             <td>{transaction.amount}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default TransactionTable;
