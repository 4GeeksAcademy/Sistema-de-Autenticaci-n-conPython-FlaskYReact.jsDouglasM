import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '/workspaces/Sistema-de-Autenticaci-n-conPython-FlaskYReact.jsDouglasM/src/front/js/store/flux.js'; // Verifica la ruta
import '/workspaces/Sistema-de-Autenticaci-n-conPython-FlaskYReact.jsDouglasM/src/front/styles/register.css'; // Asegúrate de crear este archivo CSS

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { actions, store } = useContext(Context);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook para la navegación

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'El email no es válido';
        }

        if (!password) {
            errors.password = 'La contraseña es obligatoria';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const success = await actions.register(email, password);
            if (success) {
                navigate('/login'); // Redirige si el registro es exitoso
            } else {
                setErrors({ ...errors, submit: 'Error al registrar. Por favor, intente de nuevo.' });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className='main-container'>
            <div className="register-container">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    </div>
                    {errors.submit && <p className="error-message">{errors.submit}</p>}
                    <button type="submit">Registrar</button>
                </form>
                {store.error && <p className="text-danger">{store.error}</p>}
                {store.success && <p className="text-success">{store.success}</p>}
            </div>
        </div>
    );
};

export default Register;
