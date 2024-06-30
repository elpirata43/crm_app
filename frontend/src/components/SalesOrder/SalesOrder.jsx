// // SalesOrder.jsx
// import React, { useContext, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAccountProfile } from "../../store/profile";
// import { OrderContext } from "../../context/OrderContext";
// import "./SalesOrder.css";

// const SalesOrder = () => {
//   const navigate = useNavigate();
//   const { accountId } = useParams();
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.accounts[accountId]);
//   const user = useSelector((state) => state.session.user);
//   const accounts = useSelector((state) => state.accounts);

//   // console.log(profile.companyName)

//   const filteredOrders = [];
//   Object.values(accounts).forEach((item) => {
//     item.orders.forEach((x) => {
//       if (x.accountId === user.id) {
//         filteredOrders.push(x);
//       }
//     });
//   });
//   const accountOrders = filteredOrders.map((order) => {
//     return order;
//   });
//   const acctOrder = accountOrders.filter((order) => order.id === user.id);

//   return (
//     <div>
//       <h1>Sales Order Details</h1>
//       <p>Customer Name: {profile.companyName}</p>
//       <p>Address: {profile.address}</p>
//       <p>City: {profile.city}</p>
//       <p>State: {profile.state}</p>
//       <p>VIN: {profile.vin}</p>
//       <p>Model: {profile.model}</p>
//       <p>Year: {profile.year}</p>
//       <p>Price: {profile.price}</p>
//       <p>Sales Tax: {profile.tax}</p>
//       <p>License Fee: {profile.license}</p>
//       <ul>
//         {profile.bodies &&
//           profile.bodies.map((body, index) => (
//             <>
//               <p>Bodies</p>

//               <li key={index}>{body}</li>
//             </>
//           ))}
//       </ul>
//       <ul>
//         {acctOrder[0].extras &&
//           acctOrder[0].extras.map((extra, index) => (
//             <>
//               <p>Extras</p>

//               <li key={index}>{extra}</li>
//             </>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default SalesOrder;

import { useRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAccountOrders } from "../../store/accounts";
import Buttons from "../buttons/Buttons"
import Table from "../table/Table"
import Terms from "../termsAndConditions/Terms"
import InvoiceToPayTo from "../invoiceToPayTo/InvoiceToPayTo"
import Header from "../Navigation/Navigation"
import InvoiceInfo from "../invoiceInfo/InvoiceInfo"
import PaymentInfo from "../paymentInfo/PaymentInfo"
import SubTotal from "../subTotal/SubTotal"
import { pageTitle } from "../../helper/helper"



const termsAndCondition = [
  'All claims relating to quantity or shipping errors shall be waived by Buyer unless made in writing to Seller within thirty (30) days after delivery of goods to the address stated.',
  'Delivery dates are not guaranteed and Seller has no liability for damages that may be incurred due to any delay in shipment of goods hereunder. Taxes are excluded unless otherwise stated.'
]

export default function SalesOrder() {

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const user = useSelector((state) => state.session.user);
  const profile = useSelector((state) => state.accounts[orderId]);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/accounts/orders/${orderId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setOrderData(data); // Update state with fetched data
      setIsLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    if (user && profile) {
      fetchAccounts();
    } else {
      setIsLoading(false); // Set loading to false if there's no user or profile
    }
  }, [orderId, user, profile]); // Add necessary dependencies

  if (isLoading) {
    return <p>Loading order details...</p>;
  }

  if (!orderData) {
    return <p>No order data available.</p>;
  }

console.log(orderData)


  // const tableData = [
  //   {
  //     item: `${orderData.vin}`,
  //     desc: `${orderData.model}, ${orderData.year}`,
  //     price: `${orderData.price}`,
  //     qty: '1', 
  //   },
  // ]

  // pageTitle('General');
  // // download page
  // const invoicePage = useRef();
  
  // // calculation
  // const subTotal = tableData.reduce((total, item) => total + item.price * item.qty, 0);
  // const taxPersent = `${orderData.tax}`;
  // const licenseFee = parseInt(orderData.license, 10);
  // const taxAmount = subTotal * taxPersent / 100;
  // const grandTotal = (subTotal + licenseFee + taxAmount);

  // return (
  //   <>
  //     <div className="tm_invoice tm_style1" id="tm_download_section" ref={invoicePage}>
  //       <div className="tm_invoice_in">
  //         {/* <Header
  //           logo='/images/logo.svg'
  //           title='Invoice'
  //         /> */}
  //         <InvoiceInfo
  //           id='LL93784'
  //         />
  //         <div className="tm_invoice_head tm_mb10">
  //           <InvoiceToPayTo 
  //             title='Invoice To' 
  //             subTitle={profile.companyName}
  //             varient='tm_invoice_left'
  //           />
  //           {/* <InvoiceToPayTo
  //             title='Pay To' 
  //             subTitle='Laralink Ltd <br /> 86-90 Paul Street, London <br /> England EC2A 4NE <br /> demo@gmail.com'
  //             varient='tm_invoice_right tm_text_right'
  //           /> */}
  //         </div>
  //         <div className="tm_table tm_style1 tm_mb30">
  //           <div className="tm_round_border">
  //             <div className="tm_table_responsive">
  //               <Table data={tableData} itemCount={true}/>
  //             </div>
  //           </div>
  //           <div className="tm_invoice_footer">
  //             {/* <PaymentInfo
  //               varient='tm_left_footer'
  //               title='Payment Info'
  //               cardType='Cradit Card'
  //               cardNumber='236***********928'
  //               amount={grandTotal}
  //             /> */}
  //             <div className="tm_right_footer">
  //               <SubTotal 
  //                 subTotal={subTotal} 
  //                 taxPersent={taxPersent} 
  //                 licenseFee={licenseFee}
  //                 taxAmount={taxAmount} 
  //                 grandTotal={grandTotal}
  //                 borderBtm={true}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //         <Terms 
  //           varient='tm_round_border'
  //           title='Terms & Conditions:' 
  //           data={termsAndCondition}
  //         />
  //       </div>
  //     </div>
  //     <Buttons  invoicePage={invoicePage}/>
  //   </>
  // )
}

