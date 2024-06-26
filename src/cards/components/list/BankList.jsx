import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../data/urls';
import './bankList.css';
import {useNavigate} from 'react-router-dom';
export const BankList = ({ searchItem = "" }) => {
    
    const navigate = useNavigate()
    const [callFetch, setCallFetch] = useState(false);
    
    
    const [state, setState] = useState({
        data: null, 
        isLoading: true,
        hasError: false,
        errorMessage: null
    });
    
    const { data, isLoading, hasError } = state;
    
    const [filteredData, setFilteredData] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    
    const url = `${baseUrl}/bp/products`;

    useEffect(() => {
        getFetch();
    }, []);

    useEffect(() => {
        if (!data) return;

        const results = data.filter((val) => {
            if (searchItem === "" || searchItem === undefined) {
                return true; // Mostrar todos si no hay filtro
            } else {
                return val.name.toLowerCase().includes(searchItem.toLowerCase());
            }
        });

        setFilteredData(results);
        setNoResults(results.length === 0 && searchItem !== "");
    }, [data, searchItem]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            errorMessage: null
        });
    };

    const getFetch = async () => {
        setLoadingState();

        try {
            const response = await fetch(url, {
                headers: {
                    "AuthorId": '1811'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setState({
                data: data,
                isLoading: false,
                hasError: false,
                errorMessage: null
            });
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                errorMessage: {
                    code: error.code,
                    message: error.message
                }
            });
        }
    };

    const cleanSearch = () => {
        setFilteredData(data);
        setNoResults(false);
    };

    const handleMenuClick = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    const handleMenuAction = async (action, card) => {
        if (action === "editar") {
            // Lógica para editar el item
            navigate(`update/${card.id}`, {state: {card}});
        } else if (action === "eliminar") {
            // Lógica para eliminar el item
            try {
                // console.log(`${baseUrl}?id=${card.id}`)
                const response = await fetch(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id=${card.id}`, {
                    method: "DELETE",
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        "AuthorId": '1811'
                    },
                    referrerPolicy: "no-referrer",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Actualizar datos después de eliminar
                const updatedData = data.filter((item) => item.id !== card.id);
                setState({
                    ...state,
                    data: updatedData
                });
                setFilteredData(updatedData);
                setNoResults(false); // Asegúrate de limpiar el estado de noResults si hay resultados

                console.log('Elemento eliminado exitosamente:', card.id);
            } catch (error) {
                console.error('Error al eliminar el elemento:', error);
            }
        }
        setOpenMenuIndex(null);
    };
    
    return (
        <div className="bank-list-container">
            {/* <h1>Lista de items</h1> */}
            {noResults ? 
                <p>No se encontraron coincidencias para: <b>{searchItem}</b>, mostrando todos los items.</p>
                :
                <>
                    {searchItem && <p>Mostrando resultados para: <b>{searchItem}</b></p>}
                    <button onClick={cleanSearch}>Eliminar Filtro</button>
                </>
            }
            <table>
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Nombre del producto</th>
                        <th>Descripción</th>
                        <th>Fecha de liberación</th>
                        <th>Fecha de reestructuración</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? 
                        <tr><td colSpan="6">CARGANDO...</td></tr>
                        :
                        filteredData.map((card, index) => (
                            <tr key={index}>
                                <td><img src={card?.logo} alt={card.name} className='cardsImg'/></td>
                                <td>{card?.name}</td>
                                <td>{card?.description}</td>
                                <td>{card?.date_release.slice(0,10)}</td>
                                <td>{card?.date_revision.slice(0,10)}</td>
                                <td>
                                    <button onClick={() => handleMenuClick(index)}>...</button>
                                    {openMenuIndex === index && (
                                        <div className="menu-contextual">
                                            <button onClick={() => handleMenuAction("editar", card)}>Editar</button>
                                            <button onClick={() => handleMenuAction("eliminar", card)}>Eliminar</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div>
                <h4> Cantidad: {data?.length}</h4>
                <select>
                    <option value={data?.length.toString()}>cantidad</option>
                    <option value={(data?.length + 5).toString()}>Siguientes</option>
                </select>
            </div>
        </div>
    );
};