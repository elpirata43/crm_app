import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
// import { json } from "express/lib/response";

export default function AccountProfile() {
  const { id } = useParams();
  const [account, setAccount] = useState({});
  const [addressInfo, setAddressInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    address2: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
  
    switch (name) {
      case "firstName":
        setAccount((prevAccount) => ({ ...prevAccount, firstName: value }));
        break;
      case "lastName":
        setAddressInfo((prevAddressInfo) => ({ ...prevAddressInfo, lastName: value }));
        break;
      case "email":
        setAddressInfo((prevAddressInfo) => ({ ...prevAddressInfo, email: value }));
        break;
      case "phoneNumber":
        setAddressInfo((prevAddressInfo) => ({ ...prevAddressInfo, phoneNumber: value }));
        break;
      case "address":
        setAddressInfo((prevAddressInfo) => ({ ...prevAddressInfo, address: value }));
        break;
      case "address2":
        setAddressInfo((prevAddressInfo) => ({ ...prevAddressInfo, address2: value }));
        break;
      case "city":
        setAddressInfo((prevAddressInfo) => ({ ...prevAddressInfo, city: value }));
        break;
      case "zipCode":
        setAddressInfo((prevAddressInfo) => ({ ...prevAddressInfo, zipCode: value }));
        break;
  
      // Handling equipmentType checkboxes
      case "equipmentType":
        setAccount((prevAccount) => {
          const updatedEquipmentType = checked
            ? value  // Set the value directly (assuming value is a string)
            : "";   // Treat as an empty string when unchecked
          return { ...prevAccount, equipmentType: updatedEquipmentType };
        });
        break;
  
      // Handling lookingFor checkboxes
      case "lookingFor":
        setAccount((prevAccount) => ({ ...prevAccount, lookingFor: checked ? value : "" }));
        break;
  
      default:
        break;
    }
  };
  
    

  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/accounts/company/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setAccount(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // console.log('in here')
    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8000/api/accounts/company/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jsonwebtoken')}`,
        },
        body: JSON.stringify({
          ...account,
          // Include other fields if needed (addressInfo, notes, etc.)
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      // Handle success, maybe show a success message or redirect the user
      console.log('Changes saved successfully');
    } catch (error) {
      // Handle error, maybe show an error message to the user
      console.error('Error saving changes:', error);
    }
  };
    
  return (
    <div>
      {account && (
        <div>
          <Profile
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            companyName={account.companyName}
            businessType={account.businessType}
            fleetSize={account.fleetSize}
            firstName={account.firstName}
            lastName={account.lastName}
            email={account.email}
            phoneNumber={account.phoneNumber}
            address={account.address}
            address2={account.address2}
            city={account.city}
            zipCode={account.zipCode}
            equipmentType={account.equipmentType}
            lookingFor={account.lookingFor}
          />
        </div>
      )}
    </div>
  );
}