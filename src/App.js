import { useEffect } from "react";
import { contactContext } from "./Context/contactContext";
import "./App.css";

import { AddContact, ViewContact, Contacts, EditContact, Navbar } from "./components";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getAllContacts, getAllgroup, createCantact, deleteContact } from "./services/contactService";
import { confirmAlert } from "react-confirm-alert";
import { useImmer } from 'use-immer';
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from "./helpers/colors";
import { ToastContainer, toast, Icons } from 'react-toastify';

import _, { set } from 'lodash';

const App = () => {
  const [loading, setloading] = useImmer(false);

  const [contacts, setcontacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  //const [contact, setContact] = useState({});//formikاین کار را انجام می دهد
  //const [errors, setErrors] = useState([]);//برای ثبت خطا های فرم ها


  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);

        const { data: contactData } = await getAllContacts();
        const { data: groupsData } = await getAllgroup();

        setcontacts(contactData);
        setFilteredContacts(contactData);
        setGroups(groupsData);

        setloading(false);

      } catch (err) {
        console.log(err.message);
        setloading(false);

      }

    }
    fetchData();
  }, []);

  const createContactForm = async (values) => {

    try {
      setloading((draft) => !draft);
      // await contactSchema.validate(contact, { abortEarly: false });//اعتبارسنجی تمام داده داخل کانتکت با contactSchema
      //abortEralyتمام خطاها را نشان بده

      const { status, data } = await createCantact(values);
      if (status === 201) {
        toast.success("مخاطب با موفقیت  ساخته شد", { icon: <i className="fa fa-plus-circle"></i> });
        //const allContacts = [...contacts, data];   
        setcontacts(draft => {//draft- همه کانتکت ها داخل draftاست یعنی مقدار پیش نویس
          draft.push(data);
        });
        setFilteredContacts(draft => {
          draft.push(data);
        })

        //setContact({});
        //setErrors([]);

        setloading((draft) => !draft);

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      //setErrors(err.inner);//تمام خطا ها را بریز تو set
      setloading((draft) => !draft);

    }

  };
  {/* const onContactChange = (event) => {
    setContact({
      ...contact, [event.target.name]: event.target.value,
    });

  };*/}
  const removContact = async (contactId) => {
    const contactBackup = [...contacts];

    try {
      setcontacts((draft) => (draft.filter((c) => c.id !== contactId)));
      setFilteredContacts((draft) => (draft.filter((c) => c.id !== contactId)))
      //فرستادن درخواست به سرور
      const { status } = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت حذف شد", { icon: <i className="fa fa-plus-circle"></i> });
      if (status !== 200) {

        setcontacts(contactBackup);
        setFilteredContacts(contactBackup);

      }

    }
    catch (err) {
      setcontacts(contactBackup);
      setFilteredContacts(contactBackup);

    }


  };
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return <div dir="rlt" style={{ background: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: "1em" }} className="p-4">
          <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
          <p style={{ color: FOREGROUND }}>مطمئنی می خوای مخاطب {contactFullname}را حذف کنی?</p>
          <button onClick={() => { removContact(contactId); onClose(); }} className="btn mx-2" style={{ backgroundColor: PURPLE }}>مطمئن هستم </button>
          <button onClick={onClose} className="btn" style={{ backgroundColor: COMMENT }}>انصراف</button>

        </div>

      }

    })

  };
  //let filterTimeout;
  const contactSearch = _.debounce((query) => {
    //clearTimeout(filterTimeout);
    if (!query) return setFilteredContacts([...contacts]);

    //filterTimeout=setTimeout(()=>{

    setFilteredContacts(draft => (draft.filter((c) => c.fullname.toLowerCase().includes(query.toLowerCase()))));
    //},1000);

  }, 1000);


  return (
    <contactContext.Provider value={{
      loading,
      setloading,
      //contact,
      contacts,
      filteredContacts,
      setcontacts,
      setFilteredContacts,
      groups,
      //errors,//تمام خطاها را می ریزد
      //onContactChange,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      contactSearch,

    }}>
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored" />
       
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />

          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact /*forceRender={forceRender} setForceRender={setForceRender}*/ />} />

        </Routes>



      </div>


    </contactContext.Provider>

  );
}

export default App;
