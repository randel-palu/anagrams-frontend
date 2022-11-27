import { Routes, Route, Link } from 'react-router-dom';
import { AnagramIndex } from './components/anagram/AnagramIndex';
import { WordlistIndex } from './components/wordlist/WordlistIndex';
import { LoginForm } from './components/login/LoginForm';
import { useState } from 'react';
import { UserContext} from './components/UserContext';

function App() {
  const [user, setUser] = useState({name:''});

  return (
    <div className="bg-slate-200">
      <div className="pl-10 max-w-7x mx-auto min-h-screen">
        <nav>
          <ul className='flex'>
            <li className='m-2 p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-md'>
              <Link to="/">Anagram</Link>
            </li>
            <li className='m-2 p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-md'>
              <Link to="/wordlist">Wordlist</Link>
            </li>
          </ul>
        </nav>
        <div>
          <div>
            <UserContext.Provider value={{user, setUser}}>
            {(user.name !== "") ? (
              <Routes>
                <Route path='/' exact element={<AnagramIndex />} />
                <Route path='/wordlist' element={<WordlistIndex />} />
              </Routes>
             ) : (
              <div><LoginForm /></div>
             )}
            </UserContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
