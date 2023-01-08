import { useContext } from 'react';
import { contactContext } from '../../Context/contactContext';
import Contact from './Contact';
import { PINK, CURRENTLINE, ORANGE } from '../../helpers/colors';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
const Contacts = () => {
    const { filteredContacts, loading, deleteContact } = useContext(contactContext);
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link to={"/contacts/add"} className="btn mx-2" style={{ backgroundColor: PINK }}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> : (
                    <section className='cantainer'>
                        <div className='row'>
                            {
                                filteredContacts.length > 0 ? filteredContacts.map((c) => (
                                    <Contact key={c.id} contact={c} deleteContact={() => { deleteContact(c.id, c.fullname) }} />
                                )) : <div className='text-center py-5' style={{ backgroundColor: CURRENTLINE }}>
                                    <h3 style={{ color: ORANGE }}>مخاطب یافت نشد...</h3>
                                    <img src={require("../../assets/no-found.gif")} className="w-25" />

                                </div>
                            }
                        </div>
                    </section>
                )
            }

        </>
    )
}
export default Contacts;