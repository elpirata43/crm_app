import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from 'react-router-dom'
import { OrderContext } from "../../context/OrderContext";
import "./SalesOrderForm.css"
import { useSelector, useDispatch } from "react-redux";
import { createNewOrder } from "../../store/orders";

const SalesOrderForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: null,
    email: ""
  })
  const user = useSelector(state => state.session.user)

// console.log(typeof id)

    const navigate = useNavigate();
    const {
      orderDetails,
      handleChange,
      handleAddBody,
      handleRemoveBody,
      handleAddExtra,
      handleRemoveExtra,
    } = useContext(OrderContext);

    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/accounts/company/${id}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCompanyInfo(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      if(user){
  
        fetchAccounts();
      }
    }, []);
  

    const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
        accountId: parseInt(id),
        ...orderDetails
      };
      console.log({payload})

      let newOrder;
      try{
       const newOrder = await dispatch(createNewOrder(id, payload))
       console.log({newOrder})
      }catch (err){
        console.error(err)
      }

      // navigate(`/sales-order/${newOrder.id}`);
    };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Sales Order</h1>
        <form className="company" onSubmit={handleSubmit}>
        <h3>Bill To:</h3>
        <span>{companyInfo.companyName}</span>
        <span>{companyInfo.address}</span>
        <p>{companyInfo.city}, {companyInfo.state} {companyInfo.zipCode}</p>
        <span></span>
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
          {/* {orderDetails.bodies.map((body, index) => (
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
          ))} */}
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

