import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountProfile } from "../../store/accounts";

export default function AccountProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.accounts[id]);
  const user = useSelector(state => state.session.user)
  // Debugging: Check the id and profile state
  console.log("Account ID:", id);
  console.log("Profile:", profile);
console.log("User", user)
  // useEffect(() => {
  //     dispatch(fetchAccountProfile(id));
    
  // }, [dispatch, id]);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/accounts/company/${id}`,
        {
          method: "GET",
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
          // },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      // setAccount(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if(user && user.id === profile.ownerId){

      fetchAccounts();
    }
  }, []);

  // const [account, setAccount] = useState({});
  // const [addressInfo, setAddressInfo] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phoneNumber: "",
  //   address: "",
  //   address2: "",
  //   city: "",
  //   zipCode: "",
  // });

 

  return (
    <>
    <div>Account Profile</div>
    {user && profile ? (
      <>
      <h2>{profile.companyName}</h2>
      <p>Vocation: {profile.businessType}</p>
      <p>Equipment: {profile.equipmentType}</p>
      <p>Fleet Size: {profile.fleetSize}</p>
      <p>Looking For: {profile.lookingFor}</p>
      <p>Phone #: {profile.phoneNumber}</p>
      <p>City: {profile.city}</p>
      </>
    ) : (
      <div>Must be logged in</div>
    ) }
    </>
  )
    
  // return (
  //   <div>
  //     {account && (
  //       <div>
  //         <Profile
  //           handleSubmit={handleSubmit}
  //           handleChange={handleChange}
  //           companyName={account.companyName}
  //           businessType={account.businessType}
  //           fleetSize={account.fleetSize}
  //           firstName={account.firstName}
  //           lastName={account.lastName}
  //           email={account.email}
  //           phoneNumber={account.phoneNumber}
  //           address={account.address}
  //           address2={account.address2}
  //           city={account.city}
  //           zipCode={account.zipCode}
  //           equipmentType={account.equipmentType}
  //           lookingFor={account.lookingFor}
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
}