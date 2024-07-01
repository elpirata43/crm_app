import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAccountOrders } from "../../store/accounts";
import Buttons from "../buttons/Buttons";
import Table from "../table/Table";
import Terms from "../termsAndConditions/Terms";
import InvoiceToPayTo from "../invoiceToPayTo/InvoiceToPayTo";
import Header from "../header/Header";
import InvoiceInfo from "../invoiceInfo/InvoiceInfo";
import PaymentInfo from "../paymentInfo/PaymentInfo";
import SubTotal from "../subTotal/SubTotal";
import { pageTitle } from "../../helper/helper";

// const termsAndCondition = [
//   'All claims relating to quantity or shipping errors shall be waived by Buyer unless made in writing to Seller within thirty (30) days after delivery of goods to the address stated.',
//   'Delivery dates are not guaranteed and Seller has no liability for damages that may be incurred due to any delay in shipment of goods hereunder. Taxes are excluded unless otherwise stated.'
// ]

const termsAndCondition = `
  This agreement and any documents which are part of this transaction or incorporated herein comprise the entire agreement affecting this Retail Purchase Agreement
  and no other agreement or understanding of any nature concerning the same has been made or entered into or will be recognized. I have read and accept all of the
  terms and conditions of this Agreement, and agree to them as if they were printed above my signature. I further acknowledge receipt of a copy of this Agreement. This
  Agreement shall not become binding until signed and accepted by an Authorized Dealership Representative.
`;

export default function SalesOrder() {
  const invoicePage = useRef();

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const user = useSelector((state) => state.session?.user);
  // const profile = useSelector((state) => {
  //   console.log({state})
  //   return state.accounts
  // });

  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/accounts/orders/${orderId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setOrderData(data); // Update state with fetched data
      setIsLoading(false); // Set loading to false once data is fetched
      console.log({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    if (user && !orderData) {
      fetchAccounts();
    } else {
      setIsLoading(false); // Set loading to false if there's no user or profile
    }
  }, [user, orderData]); // Add necessary dependencies

  if (isLoading) {
    return <p>Loading order details...</p>;
  }

  if (!orderData) {
    return <p>No order data available.</p>;
  }

  console.log(orderData);

  const tableData = [
    {
      item: `${orderData.vin}`,
      desc: `${orderData.model}, ${orderData.year}`,
      price: `${orderData.price}`,
      qty: "1",
    },
  ];

  pageTitle("General");
  // download page

  // calculation
  const subTotal = tableData.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const taxPersent = `${orderData.tax}`;
  const licenseFee = parseInt(orderData.license, 10);
  const taxAmount = (subTotal * taxPersent) / 100;
  const grandTotal = subTotal + licenseFee + taxAmount;

  return (
    <>
      <div
        className="tm_invoice tm_style1"
        id="tm_download_section"
        ref={invoicePage}
      >
        <div className="tm_invoice_in">
          <Header logo="/public/peterson-img.png" title="Invoice" />
          <InvoiceInfo id="LL93784" />
          <div className="tm_invoice_head tm_mb10">
            <InvoiceToPayTo
              title="Invoice To"
              subTitle={orderData.account.companyName}
              address={orderData.account.address}
              city={orderData.account.city}
              state={orderData.account.state}
              zipCode={orderData.account.zipCode}
              email={orderData.account.email}
              varient="tm_invoice_left"
            />
            {/* <InvoiceToPayTo
              title='Pay To' 
              subTitle='Laralink Ltd <br /> 86-90 Paul Street, London <br /> England EC2A 4NE <br /> demo@gmail.com'
              varient='tm_invoice_right tm_text_right'
            /> */}
          </div>
          <div className="tm_table tm_style1 tm_mb30">
            <div className="tm_round_border">
              <div className="tm_table_responsive">
                <Table data={tableData} itemCount={true} />
              </div>
            </div>
            <div className="tm_invoice_footer">
              {/* <PaymentInfo
                varient='tm_left_footer'
                title='Payment Info'
                cardType='Cradit Card'
                cardNumber='236***********928'
                amount={grandTotal}
              /> */}
              <div className="tm_right_footer">
                <SubTotal
                  subTotal={subTotal}
                  taxPersent={taxPersent}
                  licenseFee={licenseFee}
                  taxAmount={taxAmount}
                  grandTotal={grandTotal}
                  borderBtm={true}
                />
              </div>
            </div>
          </div>
          <Terms
            varient="tm_round_border"
            title="Terms & Conditions:"
            data={[termsAndCondition]}
          />
          <Buttons invoicePage={invoicePage} />
        </div>
        <div className="tm_padd_15_20">
          <h3>Purchaser's Signature_________________________</h3>
          <h4>Date___________________________</h4>
        </div>
      </div>
    </>
  );
}
