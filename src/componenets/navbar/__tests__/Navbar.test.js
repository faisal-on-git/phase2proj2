import Navbar from "../Navbar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "../../../redux/store";
import { Provider } from "react-redux";

test("username not present", () => {
  
  const { getByRole, getByTestId, getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
  const logoutButton = screen.queryByText("Logout");
  expect(logoutButton).toBeNull();
});

test("username present", () => {
  store.dispatch({
    type: "LOGIN",
    payload: "Faisal",
  });
  const { getByRole, getByTestId, getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
  const logoutButton = screen.queryByText("Logout");
  expect(logoutButton).toBeInTheDocument();
  const username = screen.queryByText("Faisal");
    expect(username).toBeInTheDocument(); 
});
