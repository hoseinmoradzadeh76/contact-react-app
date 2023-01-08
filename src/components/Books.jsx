import { NavLink, Outlet, useSearchParams,useLocation } from "react-router-dom";
import { getbookes } from "../data/data";
const Books = () => {
    const book = getbookes();
    const [searchParams,setSearchParams]=useSearchParams;
    const location=useLocation();
    console.log(location);
    return (
        <div style={{ display: "flex" }}>
            <nav style={{ borderLeft: "1px solid", padding: "1rem" }}>
                <input type="text" value={searchParams.get("filter")||""}
                onChange={event=>{
                    let filter=event.target.value;
                    if(filter){
                        setSearchParams({filter});

                    }else{
                        setSearchParams({});
                    }
                }} 
                placeholder="جستجو کتاب" />
               
                {
                    book.filter((book)=>{
                        let filter=searchParams.get("filter");
                        if(!filter) return true;
                        let name=book.name.toLowerCase();
                        return name.startsWith(filter.toLowerCase());
                    })
                    .map((book) => (
                        <NavLink to={`/book/${book.numbar}${location.search}`} key={book.numbar} style={({ isActive }) => {
                            return {
                                display: "block",
                                padding: ".5rem 0",
                                color: isActive ? "red" : ""
                            }

                        }}>
                            {book.name}
                        </NavLink>
                    ))
                }

            </nav>
            <Outlet />
        </div>
    )
}
export default Books;