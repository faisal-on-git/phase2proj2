import Home from "../Home"
import {render} from '@testing-library/react' 
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from "../../../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


describe("login action",() =>{
    it('should have a login button',()=>{
        // cy.visit('http://localhost:3000/')
        // cy.get('.MuiButton-label').should('contain','Login')
       const {getByTestId} = render(

        <BrowserRouter>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Home />
        </PersistGate>
    </Provider>
    </BrowserRouter> 

       ) 

       expect(getByTestId('login-button')).toHaveTextContent('Log In')

    })
})