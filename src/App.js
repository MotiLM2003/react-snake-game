import React from 'react';
import Footer from './components/footer';
import Header from './components/Header';
import Stage from './components/Stage';

import './general.scss';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <section className='container main-content'>
        <div className='stage-container'>
          <Stage />
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default App;
