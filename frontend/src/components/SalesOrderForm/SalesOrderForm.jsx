import React, { useContext } from "react";
import {  useNavigate } from 'react-router-dom'
import { OrderContext } from "../../context/OrderContext";
import "./SalesOrderForm.css"

const SalesOrderForm = () => {
    const navigate = useNavigate();
    const {
      orderDetails,
      handleChange,
      handleAddBody,
      handleRemoveBody,
      handleAddExtra,
      handleRemoveExtra,
    } = useContext(OrderContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/sales-order");
    };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Sales Order</h1>
        <form className="company" onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={orderDetails.customerName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderDetails.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={orderDetails.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={orderDetails.state}
            onChange={handleChange}
          />

          <br />
          <input
            type="text"
            name="vin"
            placeholder="VIN"
            value={orderDetails.vin}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={orderDetails.model}
            onChange={handleChange}
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={orderDetails.year}
            onChange={handleChange}
          />
          <select
            name="condition"
            value={orderDetails.condition}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={orderDetails.price}
            onChange={handleChange}
          />
          {orderDetails.bodies.map((body, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => {
                  const updatedBodies = [...orderDetails.bodies];
                  updatedBodies[index] = e.target.value;
                  setOrderDetails({ ...orderDetails, bodies: updatedBodies });
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveBody(index)}
              >
                Remove Body
              </button>
            </div>
          ))}

          {orderDetails.extras.map((extra, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Extra"
                value={extra}
                onChange={(e) => {
                  const updatedExtras = [...orderDetails.extras];
                  updatedExtras[index] = e.target.value;
                  setOrderDetails({ ...orderDetails, extras: updatedExtras });
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveExtra(index)}
              >
                Remove Extra
              </button>
            </div>
          ))}
          <input
            type="text"
            name="tax"
            placeholder="Sales Tax"
            value={orderDetails.tax}
            onChange={handleChange}
          />
          <input
            type="text"
            name="license"
            placeholder="License Fee"
            value={orderDetails.license}
            onChange={handleChange}
          />
          <button className="add-body-button" type="button" onClick={handleAddBody}>
            Add Body
          </button>

          <button className="add-extra-button" type="button" onClick={handleAddExtra}>
            Add Extra
          </button>

          <button className="create-button" type="submit">
            Create Order
          </button>
        </form>
      </header>
    </div>
  );
};

export default SalesOrderForm;
