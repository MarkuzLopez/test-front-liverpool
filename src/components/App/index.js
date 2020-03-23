import React from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';
import Footer from '../Footer/Footer';

const App = () => (
  <React.Fragment>
    <GithubCorner />
    <main>
      <Filter />
      <Shelf />
    </main>
    <FloatCart />
    <Footer />
  </React.Fragment>
);

export default App;
