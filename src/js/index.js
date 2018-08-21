import hi from './module';
import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>
    <h1>{title}</h1>
  </div>,
  document.getElementById('app')
);
console.log('Hell0, world!');
document.getElementById('second').innerHTML = 'kek';
hi();
