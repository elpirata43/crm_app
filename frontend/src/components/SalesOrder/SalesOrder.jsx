// SalesOrder.jsx
import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import "./SalesOrder.css"

const SalesOrder = () => {
  const navigate = useNavigate();

  const {
    orderDetails,
    handleChange,
    handleAddBody,
    handleRemoveBody,
    handleAddExtra,
    handleRemoveExtra,
  } = useContext(OrderContext);

  // const handleSavePageAsPDF = async () => {
  //   const { ipcRenderer } = window.electron;
  //   const filename = 'order'; // Change this to whatever filename you want
  //   try {
  //     const filePath = await ipcRenderer.invoke('save-page-pdf', filename);
  //     console.log(`PDF saved successfully at ${filePath}`);
  //   } catch (err) {
  //     console.error('Error saving PDF:', err);
  //   }
  // };

  return (
    <div>
      <h1>Sales Order Details</h1>
      <p>Customer Name: {orderDetails.customerName}</p>
      <p>Address: {orderDetails.address}</p>
      <p>City: {orderDetails.city}</p>
      <p>State: {orderDetails.state}</p>
      <p>VIN: {orderDetails.vin}</p>
      <p>Model: {orderDetails.model}</p>
      <p>Year: {orderDetails.year}</p>
      <p>Price: {orderDetails.price}</p>
      <p>Sales Tax: {orderDetails.tax}</p>
      <p>License Fee: {orderDetails.license}</p>
      <h2>Bodies</h2>
      <ul>
        {orderDetails.bodies.map((body, index) => (
          <li key={index}>{body}</li>
        ))}
      </ul>
      <h2>Extras</h2>
      <ul>
        {orderDetails.extras.map((extra, index) => (
          <li key={index}>{extra}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalesOrder;
