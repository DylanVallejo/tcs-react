import React, {  useEffect, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
// import { cards as codeData } from '../../data/data'
import { baseUrl } from '../../data/urls'

export const BankList = ( { searchItem = "" }) => {
    
    const { data, hasError, isLoading } =  useFetch(`${baseUrl}/bp/products`)
    
    const [filteredData, setFilteredData] = useState([]);
    
    const [noResults, setNoResults] = useState(false);
    
    // console.log(data)
    // console.log(filteredData)
    
    
    useEffect(  () => {
        if(!data) return

        const results = data.filter((val) => {
            
            if (searchItem === "" || searchItem === undefined) {
                return val;
            } else if (val.name.toLowerCase().includes(searchItem.toLowerCase())) {
                return val;
            }
            return false;
        });
        console.log(results)
    
        if (results.length === 0 && searchItem !== "") {
            setNoResults(true);
            setFilteredData(data);
        } else {
            setNoResults(false);
            setFilteredData(results);
            searchItem = ""
        }
        

    }, [searchItem,data]);
    
    
    function cleanSearch(){
        setFilteredData(data)
        setNoResults(false)
        // searchItem = ""
    }
    
    async function filter  (){
        const results = await data.filter((val) => {
            if (searchItem === "" || searchItem === undefined) {
            return val;
            } else if (val.name.toLowerCase().includes(searchItem.toLowerCase())) {
            return val;
            }
            return false;
        });
    
        if (results.length === 0 && searchItem !== "") {
            setNoResults(true);
            setFilteredData(data);
        } else {
            setNoResults(false);
            setFilteredData(results);
            searchItem = ""
        }
        
    }
    
    return (
        <div>
            <h1>lista de items</h1>
            {noResults  ? 
                <>
                    <p>No se encontraron coincidencias para: <b>{searchItem}</b>, mostrando todos los items.</p> 
                    
                </>
                :
                <>
                    {searchItem && <p>Mostrando resultados para: <b>{searchItem}</b></p>}
                    <button onClick={ cleanSearch}>Eliminar Filtro</button>
                </>
                
            }
            <table>
                <thead>
                    <tr>
                        <th>logo</th>
                        <th>Nombre del producto</th>
                        <th>Descripción</th>    
                        <th>Fecha de liberación</th>
                        <th>Fecha de reestructuración</th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {   
                        isLoading ?  <tr><td colSpan="6">CARGANDO...</td></tr>  :
                        filteredData?.map((card, index) => {
                            // console.log(card)
                            return(
                                <tr key={index}>
                                    <td><img src={card?.logo} alt={card.name}/></td>
                                    <td>{card?.name}</td>
                                    <td>{card?.description}</td>
                                    <td>{card?.date_release.slice(0,10)}</td>
                                    <td>{card?.date_revision.slice(0,10)}</td>
                                    <td>  
                                        <select> 
                                            <option value="">...</option>
                                            <option  value="eliminar">Eliminar</option>
                                            <option value="editar">Editar</option>
                                        </select>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                {/* <tr>
                    <td>{codeData[0].logo}</td>
                    
                    <td>{codeData[0].name}</td>
                    <td>{codeData[0].description}</td>
                    <td>{codeData[0].date_release}</td>
                    <td>{codeData[0].date_revision}</td>
                </tr> */}
            </table>
            <div>
                <h4> {data?.length} </h4>   
                <select>
                    <option value={data?.length.toString()}>cantidad</option>
                    <option value={(data?.length + 5).toString()}>Siguientes</option>
                </select>
            </div>
        </div>
    )
}
