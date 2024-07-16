import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionChart from './TransactionChart';
// import HistogramChart from './HistogramChart'; // Import the HistogramChart component
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResult = await axios('https://lasttest-nu.vercel.app/customers');
        const transactionsResult = await axios('https://lasttest-nu.vercel.app/transactions');
        const customers = customersResult.data;
        const transactions = transactionsResult.data;

        const mergedData = customers.map(customer => {
          const customerTransactions = transactions.filter(transaction => transaction.customer_id === customer.id);
          return { ...customer, transactions: customerTransactions };
        });

        setData(mergedData);
        setFilteredData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const nameFilter = filterName.toLowerCase();
      const amountFilter = filterAmount ? parseFloat(filterAmount) : '';

      const newFilteredData = data.filter(customer => {
        const matchesName = customer.name.toLowerCase().includes(nameFilter);
        const matchesTransactions = amountFilter
          ? customer.transactions.some(transaction => transaction.amount === amountFilter)
          : true;
        return matchesName && matchesTransactions;
      });

      setFilteredData(newFilteredData);
    };

    filterData();
  }, [filterName, filterAmount, data]);

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setShowChart(false); // Reset the chart view on row click
  };

  const handleShowChartClick = (customer) => {
    setSelectedCustomer(customer);
    setShowChart(true);
  };

  return (
    <div className='bg-light'>
      <div className="container">
        <h1 className='text-center p-4'>Customer Transactions</h1>
        <div className='container'>
          <div className='d-flex'>
            <div className='col-md-4'>
              <label>
                Filter by Name:
                <input
                  type="text"
                  value={filterName}
                  onChange={e => setFilterName(e.target.value)}
                />
              </label>
            </div>
            <div className='col-md-4'>
              <label>
                Filter by Amount:
                <input
                  type="number"
                  value={filterAmount}
                  onChange={e => setFilterAmount(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Customer Name (ID)</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(customer => (
              <React.Fragment key={customer.id}>
                {customer.transactions.map((transaction, index) => (
                  <tr key={transaction.id} onClick={() => handleRowClick(customer)}>
                    {index === 0 && (
                      <td rowSpan={customer.transactions.length}>
                        {`${customer.name} (${customer.id})`}
                        <button className='btn btn-primary   mx-4 btn-sm' onClick={(e) => { e.stopPropagation(); handleShowChartClick(customer); }}>
                          Show Chart
                        </button>
                      </td>
                    )}
                    <td>{transaction.date}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {showChart && selectedCustomer && (
          <div >
            <div>
              <h2>Transactions for {selectedCustomer.name} ({selectedCustomer.id})</h2>
              <TransactionChart transactions={selectedCustomer.transactions} />
            </div>
            {/* <div>
              <HistogramChart transactions1={selectedCustomer.transactions} transactions2={selectedCustomer.transactions} />
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;


