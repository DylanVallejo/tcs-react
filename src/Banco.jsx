import { useState } from 'react';
import { BankList } from './cards/components/list/BankList'
import { SearchBar } from './cards/components/searchBar/SearchBar'
import { RegisterForm } from './cards/components/register/RegisterForm';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import { Main } from './cards/components/main/Main';


function Banco() {
  
  const [item, setItem] = useState('');
  
  const findItem = ( itemValue ) => {
    setItem(itemValue)
  }

  return (
    <>
      <img src='https://actoressostenibles.com/wp-content/uploads/2019/08/Logos-6-10-08.png' style={{height: '3rem', display:'flex', justifyContent:'center', margin:'auto' }} />
      <hr/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/register' element={<RegisterForm />}/>
          <Route path='/update/:id' element={<RegisterForm />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Banco
