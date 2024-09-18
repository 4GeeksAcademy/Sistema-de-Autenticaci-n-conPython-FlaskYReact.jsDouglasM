import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '/workspaces/Sistema-de-Autenticaci-n-conPython-FlaskYReact.jsDouglasM/src/front/js/store/flux.js'; // Verifica la ruta
import '/workspaces/Sistema-de-Autenticaci-n-conPython-FlaskYReact.jsDouglasM/src/front/styles/login.css'; // Asegúrate de crear este archivo CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions, store } = useContext(Context);
    const navigate = useNavigate(); // Hook para la navegación

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const success = await actions.login(email, password);
            if (success) {
                alert('Inicio de sesión exitoso.');
                navigate('/private'); // Redirige si el login es exitoso
            } else {
                alert('Credenciales incorrectas. Por favor, intenta nuevamente.'); // Muestra alerta si el login falla
            }
        } catch (error) {
            console.error('Login error:', error); // Maneja posibles errores
            alert('Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.'); // Muestra alerta en caso de error
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                {store.error && <p className="error-message">{store.error}</p>}
                {store.success && <p className="success-message">{store.success}</p>}
            </div>
        </div>
    );
};

export default Login;
