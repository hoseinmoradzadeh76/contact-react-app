import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import "react-confirm-alert/src/react-confirm-alert.css";
import 'react-toastify/dist/ReactToastify.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter >
    <App />
      {/*<Routes>
        <Route path='/' element={<App />}>
          <Route path="/Books" element={<Books />} >
            <Route
            index 
            element={ 
              <main style={{padding:"1rem", color:"red"}}>
                <p>کتاب مورد نظر خود را انتخاب کنید</p>
              </main>
            }/>

            <Route path=":bookId" element={<Book/>} />

          </Route>
          </Route>
          <Route path='*' element={
            <div>
              <p>صحفه مورد نظر پیدا نشد</p>
            </div>
          }/>
        </Routes>*/}
    </BrowserRouter>
  </StrictMode>
);


