import { act } from "react";
import { csrfFetch } from "./csrf";

const LOAD_ORDERS = "orders/loadOrders";
const USERS_ORDERS = "orders/userOrders";
// const FILTER_ACCOUNTS = "accounts/filterAccounts";
// const CREATE_ACCOUNT = "accounts/createAccount"
// const ACCOUNT_PROFILE = "accounts/accountProfile"

// const accountProfile = (id) => ({
//   type: ACCOUNT_PROFILE,
//   payload: account
// })

// const loadOrders = (payload) => ({
//   type: LOAD_ORDERS,
//   payload,
// });

const accountOrders = (id) => ({
  type: ACCOUNT_ORDERS,
  payload,
});

// const filterAccounts = (payload) => ({
//   type: FILTER_ACCOUNTS,
//   payload,
// });

// const createAccount = (payload) => ({
//   type: CREATE_ACCOUNT,
//   payload
// });

// export const fetchAccountProfile = (id) => async (dispatch) => {
//   console.log(parseInt(id))
//   try{
//     const res = await csrfFetch(`api/accounts/company/${id}`);
//     if(res.ok){
//       const data = await res.json();
//       dispatch(accountProfile(data))
//     }
//   }catch (err){
//     console.error("Error fetching Account Profile", err)
//   }
// }

// export const createNewAccount = (account) => async (dispatch) => { 
//   try {
//       const res = await csrfFetch("/api/accounts", {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(account)
//       })

//       if (res.ok) {
//           const newAccount = await res.json();
//           dispatch(createAccount(newAccount));
//           return newAccount
//       }
//   } catch (err) {
//       console.error("Error creating spot", err);
//   }
// }



export const fetchAccountOrders = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/accounts/:accountId/orders");
    if (res.ok) {
      const data = await res.json();
      console.log("Fetch Orders", data)
      dispatch(accountOrders(data));
    }
  } catch (err) {
    console.error("Error loading accounts", err);
  }
};

const initialState = {};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    case ACCOUNT_ORDERS: {
      const newState = {};
      action.payload.forEach((account) => {
        newState[account.id] = account;
      });

      return { ...newState };
    }
    default:
      return state;
  }
};

export default orderReducer;