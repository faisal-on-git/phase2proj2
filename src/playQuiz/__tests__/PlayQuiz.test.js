import PlayQuiz from "../PlayQuiz.jsx"
import {render,fireEvent,waitFor} from '@testing-library/react' 
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "../../redux/store.js";


describe('check Input Box',() => {
    it('should update  input box',() =>{
        
        const { getByLabelText, getByRole } = render(

            <BrowserRouter>
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PlayQuiz />
            </PersistGate>
        </Provider>
        </BrowserRouter> 
        )
        const input = getByRole('textbox'); 
        fireEvent.change(input, { target: { value: 'New value' } });
    
    })


    it ("should have play button",() =>{

        const {getByTestId} = render(

            <BrowserRouter>
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PlayQuiz />
            </PersistGate>
        </Provider>
        </BrowserRouter> 
        )
        expect(getByTestId('play-button')).toHaveTextContent('Play!') 
    })
})


