import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpressionForm from './App';

const App = () => {
  const handleSubmit = (output) => {
    console.log(output); // Placeholder for handling the output
  };

  return (
    <div>
      <ExpressionForm onSubmit={handleSubmit} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
