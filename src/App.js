import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Chat from '../src/components/Chat.component';
import Faq from '../src/components/Faq.component';

import './App.css';
import Header from './components/Header.component';

const App = () => {
  return (
    <div className='app-container'>
      <Header></Header>
      <Router>
          <Routes>
            <Route  exact path='/' element={<Faq/>} />
            <Route  exact path='/chat' element={<Chat/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
