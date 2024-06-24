import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import dayjs from "dayjs";
import FilterAccounts from "./FilterAccounts";
// import { AccountContext } from "../App";
import { fetchUserAccounts } from "../store/accounts";


export default function DashBoard() {
  // const [account, setAccount] = useContext(AccountContext);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const accounts = useSelector(state => state.accounts)


  useEffect(() => {
    dispatch(fetchUserAccounts());
  }, [dispatch]);

  if (!accounts) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="d-flex">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "25%",
          border: "solid black",
          boxSizing: "border-box",
          padding: "10px",
        }}
      >
        <div>
          <h4>Accounts</h4>
          {Object.values(accounts).map(account => (
          <div key={account.id}>
            <p>Company Name: {account.companyName}</p>
          </div>
        ))}
        </div>
      </div>
      {Object.values(accounts).length > 0 ? (
        <FilterAccounts  />
      ) : (
        <FilterAccounts />
      )}
    </div>
  );
}