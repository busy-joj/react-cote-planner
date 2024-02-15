import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import store from "@/reducer/store.js";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App
          value={store.getState()}
          Login={() => store.dispatch({ type: "SUCCESS" })}
          Logout={() => store.dispatch({ type: "FAIL" })}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
