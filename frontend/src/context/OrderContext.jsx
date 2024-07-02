import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState({
    vin: "",
    model: "",
    year: "",
    price: "",
    tax: "",
    license: "",
    bodies: null,
    extras: null,
    notes: "",
    condition: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleNew = (e) => {

  }

  // const handleAddBody = () => {
  //   setOrderDetails({
  //     ...orderDetails,
  //     bodies: [...orderDetails.bodies, ""],
  //   });
  // };

  // const handleRemoveBody = (index) => {
  //   const updatedBodies = [...orderDetails.bodies];
  //   updatedBodies.splice(index, 1);
  //   setOrderDetails({
  //     ...orderDetails,
  //     bodies: updatedBodies,
  //   });
  // };

  // const handleAddExtra = () => {
  //   setOrderDetails({
  //     ...orderDetails,
  //     extras: [...orderDetails.extras, ""],
  //   });
  // };

  // const handleRemoveExtra = (index) => {
  //   const updatedExtras = [...orderDetails.extras];
  //   updatedExtras.splice(index, 1);
  //   setOrderDetails({
  //     ...orderDetails,
  //     extras: updatedExtras,
  //   });
  // };

  return (
    <OrderContext.Provider
      value={{
        orderDetails,
        handleChange,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

