import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewAccount } from "../store/accounts";
import { useNavigate } from "react-router-dom";

function CreateAccount({ account }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [address, setAddress] = useState( "");
  const [city, setCity] = useState("");
  const [state, setState] = useState( "");
  const [zipCode, setZipCode] = useState( "");
  const [companyName, setCompanyName] = useState( "");
  const [businessType, setBusinessType] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [equipmentType, setEquipmentType] = useState("")
  const [fleetSize, setFleetSize] = useState("")
  const [lookingFor, setLookingFor] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({});

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      ownerId: user.id,
      address,
      city,
      state,
      zipCode,
      companyName,
      businessType,
      phoneNumber,
      equipmentType,
      fleetSize,
      lookingFor,
      firstName,
      lastName,
      email,
    };

    let newAccount;
    try {
     
      newAccount = await dispatch(createNewAccount(payload));
     
        navigate(`/spots/${newSpot.id}`);
      
    } catch (err) {
      const data = await err.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  if (!user) {
    return <p>Please Login</p>;
  }
return (
  <>
    <h1>{"Create New Account"}</h1>
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Account Information</h2>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="input-field"
        />
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="input-field"
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-field"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="input-field"
        />
        {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

        <h2>Company Information</h2>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="input-field"
        />
        {errors.companyName && <p className="error-message">{errors.companyName}</p>}
        <input
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="Business Type"
          className="input-field"
        />
        {errors.businessType && <p className="error-message">{errors.businessType}</p>}
        <input
          value={fleetSize}
          onChange={(e) => setFleetSize(e.target.value)}
          placeholder="Fleet Size"
          className="input-field"
        />
        {errors.fleetSize && <p className="error-message">{errors.fleetSize}</p>}
        <input
          value={lookingFor}
          onChange={(e) => setLookingFor(e.target.value)}
          placeholder="Looking For"
          className="input-field"
        />
        {errors.lookingFor && <p className="error-message">{errors.lookingFor}</p>}
        <input
          value={equipmentType}
          onChange={(e) => setEquipmentType(e.target.value)}
          placeholder="Equipment Type"
          className="input-field"
        />
        {errors.equipmentType && <p className="error-message">{errors.equipmentType}</p>}

        <h2>Location Information</h2>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="input-field"
        />
        {errors.address && <p className="error-message">{errors.address}</p>}
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="input-field"
        />
        {errors.city && <p className="error-message">{errors.city}</p>}
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          className="input-field"
        />
        {errors.state && <p className="error-message">{errors.state}</p>}
        <input
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Zip Code"
          className="input-field"
        />
        {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}

        <div className="button-group">
          <button type="submit" className="form-button">
            Create new Account
          </button>
          <button type="button" onClick={() => navigate(-1)} className="form-button cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </section>
  </>
);
}

export default CreateAccount;