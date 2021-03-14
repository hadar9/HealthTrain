import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import jwt_decode from "jwt-decode";
import { logout, setToken, setUser } from "./redux/reducers/UserReducer";


const persistStorage = JSON.parse(localStorage.getItem("persist:root"));
console.log(persistStorage);

// load user when refresh
if (persistStorage && persistStorage.token !== null) {
  try {
    const currentTime = Date.now() / 1000;
    const t = persistStorage.token;
    // console.log(persistStorage.token);
    let decoded;
    decoded = jwt_decode(persistStorage.token);
    if (decoded.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/Login";
    } else {
      // console.log(persistStorage.token)
      store.dispatch(setUser({user: persistStorage.token}));
      store.dispatch(setToken({token: t}));
    }
  } catch (e) {
    console.log(e.message);
  }
}

ReactDOM.render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
