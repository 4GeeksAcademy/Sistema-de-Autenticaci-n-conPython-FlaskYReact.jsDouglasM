import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '/workspaces/Sistema-de-Autenticaci-n-conPython-FlaskYReact.jsDouglasM/src/front/js/store/flux.js'; // Verifica la ruta

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    console.log('Is Authenticated:', store.isAuthenticated); // Verifica el estado de autenticación

    const handleLogout = () => {
        actions.logout();
        navigate('/'); // Redirige a la ruta principal después de hacer logout
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container ">
                <div className='text-center'>
                    <span className="navbar-brand mb-0 h1">Sistema de Autenticación con Python, Flask y React.js</span>
                </div>
                <div className="ml-auto">
                    {store.isAuthenticated ? (
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary m-2">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-secondary m-2">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
