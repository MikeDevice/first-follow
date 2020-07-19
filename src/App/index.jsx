import React from 'react';
import {hot} from 'react-hot-loader/root';
import './index.scss';

function App() {
  return (
    <div>
      <header>
        <h1>First Follow</h1>
        <p>A small tool for calculating first, follow and predict sets for the grammar</p>
      </header>
      <main>
        <section>Editor</section>
        <section>First sets</section>
        <section>Follow sets</section>
        <section>Predict sets</section>
      </main>
    </div>
  );
}

export default hot(App);
