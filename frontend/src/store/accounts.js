import { csrfFetch } from "./csrf";

const LOAD_ACCOUNTS = "accounts/loadAccounts";
const USERS_ACCOUNTS = "accounts/userAccounts";
const FILTER_ACCOUNTS = "accounts/filterAccounts";
const CREATE_ACCOUNT = "accounts/createAccount"

const loadAccounts = (payload) => ({
  type: LOAD_ACCOUNTS,
  payload,
});

const userAccounts = (payload) => ({
  type: USERS_ACCOUNTS,
  payload,
});

const filterAccounts = (payload) => ({
  type: FILTER_ACCOUNTS,
  payload,
});

const createAccount = (payload) => ({
  type: CREATE_ACCOUNT,
  payload
})

export const createNewAccount = (account) => async (dispatch) => { 
  try {
      const res = await csrfFetch("/api/accounts", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(account)
      })

      if (res.ok) {
          const newAccount = await res.json();
          dispatch(createAccount(newAccount));
          return newAccount
      }
  } catch (err) {
      console.error("Error creating spot", err);
  }
}

export const fetchFilterAccounts =
  (filterType, selection) => async (dispatch) => {
    let urlRoute;

    switch (filterType) {
      case "equipmentType":
        urlRoute = `/api/accounts/equipmentType/${encodeURIComponent(
          selection
        )}`;
        break;
      case "businessType":
        urlRoute = `/api/accounts/businessType/${encodeURIComponent(
          selection
        )}`;
        break;

      case "companyName":
        urlRoute = `/api/accounts/companyName/${encodeURIComponent(selection)}`;

        break;
      case "lookingFor":
        urlRoute = `/api/accounts/lookingFor/${encodeURIComponent(selection)}`;
        break;

      default:
        throw new Error("Invalid filter type");
    }
console.log("URL Route", urlRoute)
    try {
      const response = await csrfFetch(urlRoute);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("Filtered Data", data)
      dispatch(filterAccounts(data)); // Dispatch action with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

export const fetchUserAccounts = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/accounts/current");
    if (res.ok) {
      const data = await res.json();
      dispatch(userAccounts(data));
    }
  } catch (err) {
    console.error("Error loading accounts", err);
  }
};

const initialState = {};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ACCOUNTS: {
      const newState = {};
      action.payload.Accounts.forEach((account) => {
        newState[account.id] = account;
      });
      return { ...state, ...newState };
    }
    case USERS_ACCOUNTS: {
      const newState = {};
      action.payload.forEach((account) => {
        newState[account.id] = account;
      });

      return { ...newState };
    }
    case FILTER_ACCOUNTS: {
      const newState = {}
      action.payload.forEach(account => {
        newState[account.id] = account
      });
      return { ...newState}
    }
    case CREATE_ACCOUNT: {
      const newState = { ...state };
      const newAccount = action.payload;
      newState[newAccount.id] = newAccount;
      return newState
    }
    default:
      return state;
  }
};

export default accountReducer;
