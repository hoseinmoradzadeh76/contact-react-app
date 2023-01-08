import { useEffect, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useImmer } from "use-immer";


import { contactContext } from "../../Context/contactContext";
import { getContact, updateContact } from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { toast } from "react-toastify";

import { contactSchema } from "../../validations/contactvalidations";
const EditContact = () => {
  const { contactId } = useParams();
  const {

    setContacts,
    setFilteredContacts,
    loading,
    setloading,
    groups,
  } = useContext(contactContext);

  
  const navigate = useNavigate();

  const [contact, setContact] = useImmer({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data: contactData } = await getContact(contactId);

        setloading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setloading(false);
      }
    };

    fetchData();
  }, []);



  const submitForm = async (values) => {

    try {
      setloading(true);

      const { data, status } = await updateContact(values, contactId);
      if (status === 200) {
        setloading(false);

        toast.info('مخاطب با موفقیت ویرایش شد', { icon: <i className="fa fa-plus-circle"></i> })
        setContacts((draft) => {
          const contactIndex = draft.findIndex((c) => c.id === parseInt(contactId));
          draft[contactIndex] = { ...data };
        });
        setFilteredContacts((draft) => {
          const contactIndex = draft.findIndex((c) => c.id === parseInt(contactId));
          draft[contactIndex] = { ...data };
        });

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  return (
    <>
      {loading ?
        <Spinner />
        : (
          <>
            <section className="p-3">
              <div className="container">
                <div className="row my-2">
                  <div className="col text-center">
                    <p className="h4 fw-bold" style={{ color: ORANGE }}>
                      ویرایش مخاطب
                    </p>
                  </div>
                </div>
                <hr style={{ backgroundColor: ORANGE }} />
                <div
                  className="row p-2 w-75 mx-auto align-items-center"
                  style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                >
                  <div className="col-md-8">
                    <Formik
                      initialValues={contact}//همه موارد داخل کامپوننت کانکت هست
                      validationSchema={contactSchema}
                      onSubmit={(values) => {//هنگامی که کلیک شد تمام مقادیر ساخته شده در valuesریخته می شود
                        submitForm(values);//به تابع createcontactمی فرستادvaluesها را
                      }}>
                      <Form >
                        <div className="mb-2">
                          <Field name="fullname"
                                                         /*value={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur}*/ type="text" className="form-control" placeholder="نام و نام خانوادگی" />
                          <ErrorMessage name="fullname" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field name="photo" type="text" className="form-control" placeholder="ادرس تصویر" />
                          <ErrorMessage name="photo" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>

                        <div className="mb-2">
                          <Field name='mobile' type="number" className="form-control" placeholder="شماره موبایل" />
                          <ErrorMessage name="mobile" render={(msg) => (<div className="text-danger">{msg}</div>)} />

                        </div>
                        <div className="mb-2">
                          <Field name="email" type="email" className="form-control" placeholder="ایمیل" />
                          <ErrorMessage name="email" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field name="job" type="text" className="form-control" placeholder="شغل" />
                          <ErrorMessage name="job" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>

                        <div className="mb-2">
                          <Field as='select' name="group"
                            className="form-control" >
                            <option value="">انتخاب گروه</option>
                            {
                              groups.length > 0 && groups.map((group) => (
                                <option key={group.id} value={group.id} >
                                  {group.name}
                                </option>
                              ))
                            }

                          </Field>
                          <ErrorMessage name="group" render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mx-2">
                          <input type="submit" className="btn mx-2" style={{ backgroundColor: PURPLE }} value="ویرایش مخاطب" />
                          <Link to={"/contacts"} className="btn" style={{ backgroundColor: COMMENT }} value="انصراف">انصراف</Link>
                        </div>
                        




                      </Form>


                    </Formik>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={contact.photo}
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${PURPLE}` }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mt-1">
                <img
                  src={require("../../assets/man-taking-note.png")}
                  height="300px"
                  style={{ opacity: "60%" }}
                />
              </div>
            </section>
          </>
        )}
    </>
  );
};

export default EditContact;
