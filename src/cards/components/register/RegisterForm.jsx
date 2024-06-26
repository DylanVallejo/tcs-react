import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import axios from 'axios';
import { baseUrl } from '../../data/urls';

export const RegisterForm = () => {
    
    let postUrl = `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/productos`
    
    const { 
        formState, onInputChange, onResetForm,  
        id, name, description, logo, date_release , date_revision 
    } = useForm({
        id: "", 
        name: "", 
        description: "", 
        logo: "", 
        date_release: "",
        date_revision: ""
    })
    
    const createItem = async ( form ) => {
        console.log(form)
        console.log(postUrl)
        // axios.post(postUrl ,form, {
        //     headers: {
        //         'authorId': '1811'
        //     }
        // }).then((res)=>{
        //     console.log(res)
        // }).catch((error) =>{
        //     console.log(error)
        // })
        console.log(JSON.stringify(form))
        const response = await fetch('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products', {
                method: "POST", 
                mode: "cors", // no-cors, *cors, same-origin
                // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    'AuthorId': '1811',
                    // "Content-Type": "text/plain",
                'Content-Type': 'application/json',
                },
                referrerPolicy: "no-referrer",
                body: JSON.stringify(form)
            }
        )
        const data = await response.json();
        // console.log(data)
        
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        createItem(formState)
    }
    
    
    return (
        <>
            <h1>Formulario de registro</h1>
            <hr/>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    // className=""
                    placeholder="id"
                    name="id"
                    value={ id }
                    onChange={ onInputChange }
                />
                
                
                <input
                    type="text"
                    // className=""
                    placeholder="name"
                    name="name"
                    value={ name }
                    onChange={ onInputChange }
                />
                
                <input
                    type="text"
                    // className=""
                    placeholder="description"
                    name="description"
                    value={ description }
                    onChange={ onInputChange }
                />
                
                <input
                    type="text"
                    // className=""
                    placeholder="logo"
                    name="logo"
                    value={ logo }
                    onChange={ onInputChange }
                />
                
            
                <input
                    type="text"
                    // className=""
                    placeholder="date_release"
                    name="date_release"
                    value={ date_release }
                    onChange={ onInputChange }
                />
                
                
                <input
                    type="text"
                    // className=""
                    placeholder="date_revision"
                    name="date_revision"
                    value={ date_revision }
                    onChange={ onInputChange }
                />
                
                <button  onClick={ onResetForm }>Borrar</button>
                <button  type="submit">Registar</button>
            </form>
        </>
    )
}
