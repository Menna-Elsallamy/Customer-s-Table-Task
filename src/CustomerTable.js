// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CustomerTable = ({ onCustomerSelect }) => {
//     const [customers, setCustomers] = useState([]);
//     const [filter, setFilter] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/customers')
//             .then(response => setCustomers(response.data))
//             .catch(error => console.error('Error fetching customers:', error));
//     }, []);

//     return (
//         <div>
//             <input 
//                 type="text" 
//                 placeholder="Filter by name" 
//                 value={filter} 
//                 onChange={e => setFilter(e.target.value)} 
//             />
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.filter(c => c.name.toLowerCase().includes(filter.toLowerCase())).map(customer => (
//                         <tr key={customer.id} onClick={() => onCustomerSelect(customer.id)}>
//                             <td>{customer.id}</td>
//                             <td>{customer.name}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CustomerTable;
