import { createContext } from 'react';
export const contactContext = createContext({
    loading: false,
    setloading: () => { },//چون در همه کامپوننت ها استفاده می کنیم
    //contact:{},//چون ابجکت هست به این صورت می نویسم
    setContacts:()=>{},//در بیشتر کامپوننت ها از ان استفاده می شود
    contacts:[],//مخاطبین به صورت یه ارایه وجود دارد|
    setFilteredContacts:()=>{},
    filteredContacts:[],
    //errors:[],
    groups:[],
    //onContactChange:()=>{},
    deleteContact:()=>{},
  
    contactSearch:()=>{},
    createContact:()=>{}

});