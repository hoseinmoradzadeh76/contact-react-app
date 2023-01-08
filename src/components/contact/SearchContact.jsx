import { useContext } from 'react';
import { contactContext } from "../../Context/contactContext"
import { PURPLE } from "../../helpers/colors";
const SearchContact = () => {
    const { contactSearch } = useContext(contactContext);
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: PURPLE }}>
                <i className="fa fa-search"></i>
            </span>
            <input type="text" dir="rtl" onChange={(event) => contactSearch(event.target.value)}
                className="form-control" placeholder="جستجومخاطب" aria-label="search" aria-aria-describedby="basic-addon1" />


        </div>
    );
}
export default SearchContact;