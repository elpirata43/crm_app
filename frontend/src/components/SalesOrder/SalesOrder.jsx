// SalesOrder.jsx
import React, {useContext, useEffect } from 'react';
import { useNavigate, useParams,  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile } from "../../store/accounts";
import { OrderContext } from '../../context/OrderContext';
import "./SalesOrder.css"

const SalesOrder = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.accounts[accountId]);
  const user = useSelector(state => state.session.user)
  const accounts = useSelector(state => state.accounts)

  const filteredOrders = [];
Object.values(accounts).forEach(item => {
  item.orders.forEach(x => {
    if (x.accountId === user.id) {
      filteredOrders.push(x); 
    }
  });
});
const accountOrders = filteredOrders.map(order => {
  return order
});
const acctOrder = accountOrders.filter(order => order.id === user.id)

  return (
    <div>
      <h1>Sales Order Details</h1>
      <p>Customer Name: {acctOrder[0].customerName}</p>
      <p>Address: {acctOrder[0].address}</p>
      <p>City: {acctOrder[0].city}</p>
      <p>State: {acctOrder[0].state}</p>
      <p>VIN: {acctOrder[0].vin}</p>
      <p>Model: {acctOrder[0].model}</p>
      <p>Year: {acctOrder[0].year}</p>
      <p>Price: {acctOrder[0].price}</p>
      <p>Sales Tax: {acctOrder[0].tax}</p>
      <p>License Fee: {acctOrder[0].license}</p>
      <h2>Bodies</h2>
      <ul>
        {/* {acctOrder.bodies.map((body, index) => (
          <li key={index}>{body}</li>
        ))}
      </ul>
      <h2>Extras</h2>
      <ul>
        {acctOrder.extras.map((extra, index) => (
          <li key={index}>{extra}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default SalesOrder;

