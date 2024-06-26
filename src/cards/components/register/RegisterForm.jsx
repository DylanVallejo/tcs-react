import React, { useEffect } from 'react';
import { useForm } from '../../../hooks/useForm';
import { baseUrl } from '../../data/urls';
import { useNavigate, useLocation } from 'react-router-dom';
import './registerForm.css';

export const RegisterForm = () => {
    let postUrl = `${baseUrl}/bp/products`;

    const { 
        formState, onInputChange, onResetForm, setFormState, isValid, id, name, description, logo, date_release, date_revision 
    } = useForm({
        id: "", 
        name: "", 
        description: "", 
        logo: "", 
        date_release: "",
        date_revision: ""
    });

    const location = useLocation();
    const { card } = location.state || {};

    const navigate = useNavigate();

    useEffect(() => {
        if (card) {
            const formattedDateRelease = new Date(card.date_release).toISOString().split('T')[0];
            const formattedDateRevision = new Date(card.date_revision).toISOString().split('T')[0];
            setFormState({ ...card, date_release: formattedDateRelease, date_revision: formattedDateRevision });
        }
    }, [card, setFormState]);

    const createItem = async (form) => {
        try {
            const requestOptions = {
                method: card ? 'PUT' : 'POST', // Usa PUT si estás editando, POST si estás creando
                headers: {
                    'AuthorId': '1811',
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                credentials: "same-origin",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(form)
            };

            const response = await fetch(postUrl, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert(`Producto ${card ? 'actualizado' : 'creado'} exitosamente`);
            navigate('/');
        } catch (error) {
            console.error('Error al crear o actualizar el producto:', error);
            alert("Fallo en la creación o actualización del producto");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createItem(formState);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="register-form-container">
            <h1>{card ? 'Editar Producto' : 'Formulario de registro'}</h1>
            <button className="cancel" onClick={() => navigate('/')}>Cancelar</button>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className='col'>
                    <input
                        required
                        minLength={3}
                        maxLength={10}
                        type="text"
                        placeholder="id"
                        name="id"
                        value={id}
                        onChange={onInputChange}
                        readOnly={!!card}
                    />
                    <input
                        required
                        minLength={5}
                        maxLength={100}
                        type="text"
                        placeholder="name"
                        name="name"
                        value={name}
                        onChange={onInputChange}
                    />
                    <input
                        required
                        minLength={10}
                        maxLength={200}
                        type="text"
                        placeholder="description"
                        name="description"
                        value={description}
                        onChange={onInputChange}
                    />
                </div>
                <div className='col'>
                    <input
                        type="text"
                        placeholder="logo"
                        name="logo"
                        value={logo}
                        onChange={onInputChange}
                    />
                    <input
                        required
                        type="date"
                        placeholder="date_release"
                        name="date_release"
                        value={date_release}
                        onChange={onInputChange}
                        min={today}
                    />
                    <input
                        type="date"
                        placeholder="date_revision"
                        name="date_revision"
                        value={date_revision}
                        readOnly
                    />
                </div>
            </form>
            <div className='buttonCenter'>
                <button type="button" className="delete" disabled={!!card} onClick={onResetForm}>Borrar</button>
                <button type="submit" disabled={!isValid}>{card ? 'Actualizar' : 'Registrar'}</button>
            </div>
        </div>
    );
};
