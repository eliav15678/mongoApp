import React from "react";
import { FaSignInAlt , FaSignOutAlt , FaUserAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

    const user = null;

    const onLogout = async() => {
        toast("Logout was clicked");
    } 

    return(
        <header className="header">
            <div className="l<ogo">
                <Link to='/'>mongoApp</Link>
            </div>

            <ul>
                {
                    user ? (
                        <>
                            <li>
                                <button className="btn" onClick={onLogout}><FaSignOutAlt/>Logout</button>
                            </li>
                        </>
                    ) 
                    : 
                    (
                        <>
                            <li>
                                <Link to='/'><FaSignInAlt />Login</Link>
                            </li>
                            <li>
                                <Link to='/Register'><FaUserAlt />Register</Link>
                            </li>
                        </>
                    )
                }
            </ul>

        </header>
    )
}

export default Header;