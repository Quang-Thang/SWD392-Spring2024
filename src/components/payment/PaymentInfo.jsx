import React from 'react';
import PropTypes from 'prop-types';

const PaymentInfo = ({ paymentData }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Payment Information</h2>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Payment ID</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Currency</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Payment Method</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Customer ID</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentData.map(payment => (
              <tr key={payment.paymentId}>
                <td className="px-6 py-4 whitespace-nowrap">{payment.paymentId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.amount}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${payment.status === 'Completed' ? 'text-green-500' : payment.status === 'Pending' ? 'text-yellow-500' : ''}`}>{payment.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.currency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.customerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

PaymentInfo.propTypes = {
  paymentData: PropTypes.arrayOf(
    PropTypes.shape({
      paymentId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.oneOf(['Completed', 'Pending']).isRequired,
      currency: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired
    })
  ).isRequired
};

const PaymentInfoPage = () => {
  const paymentData = [
    {
      paymentId: '001',
      amount: 100,
      status: 'Completed',
      currency: 'USD',
      paymentMethod: 'credit card',
      customerId: '161731'
    },
    {
      paymentId: '002',
      amount: 150,
      status: 'Pending',
      currency: 'EUR',
      paymentMethod: 'bank transfer',
      customerId: '161732'
    }
  ];

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="container mx-auto">
        <PaymentInfo paymentData={paymentData} />
      </div>
    </div>
  );
};

export default PaymentInfoPage;
