import React, { createContext } from 'react';

const Context = createContext(null);

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            token: localStorage.getItem('token') || null,
            isAuthenticated: !!localStorage.getItem('token')
        },
        actions: {
            // Ejemplo de función
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            login: async (email, password) => {
                try {
                    const response = await fetch('https://ideal-dollop-97676rgv57w42994w-3001.app.github.dev/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem('token', data.token);
                        setStore({ token: data.token, isAuthenticated: true }); // Actualiza el estado de autenticación
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error('Login failed:', errorData.msg);
                        return false;
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    return false;
                }
            },
            

            register: async (email, password) => {
                try {
					const response = await fetch('https://ideal-dollop-97676rgv57w42994w-3001.app.github.dev/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email, password })
					});
					const data = await response.json();
					if (response.ok) {
						alert('Usuario registrado exitosamente');
						return true; // Registro exitoso
					} else {
						alert(data.msg || 'Error al registrar usuario');
						return false; // Registro fallido
					}
				} catch (error) {
					alert('Error de conexión');
					return false; // Error en la conexión
				}
            },

            logout: () => {
                localStorage.removeItem('token');
                setStore({ token: null, isAuthenticated: false });
                window.location.href = '/'; // Redirige a la ruta principal después de hacer logout
            }
        }
    };
};

export { Context }; // Asegúrate de que Context esté exportado
export default getState;
