import { useContext } from "react";
import { useState, useEffect } from "react";
import { contactContext } from "../../Context/contactContext";
import { Link, useParams } from "react-router-dom";
import { getContact, getgroup } from "../../services/contactService";
import { CYAN, CURRENTLINE, PURPLE } from "../../helpers/colors";
import { Spinner } from "../";
const ViewContact = () => {
    const { contactId } = useParams();
    const [state, setState] = useState(
        {
            contact: {},
            group: {}
        }
    );
    const {loading , setloading } = useContext(contactContext);
    useEffect(() => {
        const fechData = async () => {
            setloading(true);
            try {
                setState({ ...state});
                const { data: contactData } = await getContact(contactId);
                const { data: groupData } = await getgroup(contactData.group);

                setloading(false);
                setState({
                    ...state, contact: contactData, group: groupData
                });

            } catch (err) {
                setloading(false);

            }

        }
        fechData();
    }, []);
    const { contact, group } = state;
    return (
        <>
            <section className="view-contact-intro p3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{ color: CYAN }}>
                            اطلاعات مخاطب
                        </p>
                    </div>
                </div>
            </section>
            <hr style={{ backgroundColor: CYAN }} />
            {loading ? (<Spinner />) : (
                <>
                    {
                        Object.keys(contact).length > 0 && (
                            <section className="view-contact mt-e">
                                <div className="container p-2" style={{ borderRadius: "1rem", backgroundColor: CURRENTLINE }}>
                                    <div className="row align-items-center ">
                                        <div className="col-md-3">
                                            <img src={contact.photo} alt="" />
                                        </div>
                                        <div className='col-md-8 col-sm-8'>
                                            <ul className='list-group'>
                                                <li className='list-group-item list-group-item-dark'>
                                                    نام ونام خانوادگی:{" "}
                                                    <span className='fw-bold'>
                                                        {contact.fullname}
                                                    </span>
                                                </li>
                                                <li className='list-group-item list-group-item-dark'>
                                                    شماره موبایل:{" "}
                                                    <span className='fw-bold'>
                                                        {contact.mobile}
                                                    </span>
                                                </li>
                                                <li className='list-group-item list-group-item-dark'>
                                                    ادرس ایمیل:{" "}
                                                    <span className='fw-bold'>
                                                        {contact.email}
                                                    </span>
                                                </li>
                                                <li className='list-group-item list-group-item-dark'>
                                                    شغل:{" "}
                                                    <span className='fw-bold'>
                                                        {contact.job}
                                                    </span>
                                                </li>
                                                <li className='list-group-item list-group-item-dark'>
                                                    گروه:{" "}
                                                    <span className='fw-bold'>
                                                        {group.name}
                                                    </span>
                                                </li>
                                            </ul>
                                            <Link to={"/contacts"} className="btn mt-2" style={{backgroundColor:PURPLE,border:"none"}}>بازگشت به صحفه اصلی</Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                    }

                </>
            )}
        </>
    )
}
export default ViewContact;