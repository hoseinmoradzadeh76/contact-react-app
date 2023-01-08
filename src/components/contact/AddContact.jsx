import { useContext } from "react";
import { contactContext } from "../../Context/contactContext";
import { Link } from "react-router-dom";
import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { Form, Formik,Field,ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactvalidations";

const AddContact = () => {
    const { loading, groups, createContact,/*errors*/ } = useContext(contactContext);

    return (
        <>
            {loading ? (<Spinner />) : (
                <>
                    <section className="p-3">
                        <img src={require("../../assets/man-taking-note.png")}
                            height="400px"
                            style={{
                                position: "absolute", zIndex: "-1", top: "130px", left: "100px", opacity: "50%"
                            }}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 fw-bold text-center" style={{ color: GREEN }} >
                                        ساخت مخاطب جدید
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: GREEN }} />
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    {/*{
                                        errors?.map((error,index)=>(
                                            <p key={index} className='bg-danger'>{error.message}</p>
                                        ))
                                    }*/}
                                    <Formik
                                        initialValues={{//تمام این مقادیر هنگام ساخت مخاطب خالی هست برای همین خالی قرار می دهیم
                                            fullname: '',
                                            photo: '',
                                            mobile: '',
                                            email: '',
                                            job: '',
                                            group: ''
                                        }}
                                        validationSchema={contactSchema}
                                        onSubmit={(values) => {//هنگامی که کلیک شد تمام مقادیر ساخته شده در valuesریخته می شود
                                            createContact(values);//به تابع createcontactمی فرستادvaluesها را
                                        }}>
                                                <Form >
                                                    <div className="mb-2">
                                                        <Field name="fullname"
                                                         /*value={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur}*/  type="text" className="form-control" placeholder="نام و نام خانوادگی" />
                                                       <ErrorMessage name="fullname" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                                    </div>
                                                    <div className="mb-2">
                                                        <Field name="photo" type="text" className="form-control" placeholder="ادرس تصویر" />
                                                       <ErrorMessage name="photo" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                                    </div>

                                                    <div className="mb-2">
                                                        <Field name='mobile' type="number" className="form-control" placeholder="شماره موبایل" />
                                                        <ErrorMessage name="mobile" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>

                                                    </div>
                                                    <div className="mb-2">
                                                        <Field name="email" type="email" className="form-control" placeholder="ایمیل" />
                                                       <ErrorMessage name="email" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                                    </div>
                                                    <div className="mb-2">
                                                        <Field name="job"  type="text" className="form-control" placeholder="شغل" />
                                                       <ErrorMessage name="job" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
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
                                                       <ErrorMessage name="group" render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                                    </div>
                                                    <div className="mx-2">
                                                        <input  type="submit" className="btn mx-2" style={{ backgroundColor: PURPLE }} value="ساخت مخاطب" />
                                                        <Link to={"/Contacts"} className="btn" style={{ backgroundColor: COMMENT }} value="انصراف">انصراف</Link>
                                                    </div>




                                                </Form>
                                      

                                    </Formik>

                                </div>
                            </div>
                        </div>

                    </section>
                </>
            )}
        </>
    )
}
export default AddContact;