import React from 'react';
import Footer from './components/footer';
import Header from './components/Header';
import Stage from './components/Stage';

import './general.scss';

const App = () => {
  return (
    <div class='main-container'>
      <Header />
      <section className='container main-content'>
        <div className='stage-container'>
          <Stage />
        </div>
      </section>
    </div>
  );
};

export default App;
