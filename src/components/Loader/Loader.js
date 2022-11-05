import React from 'react';
import { Puff } from 'react-loader-spinner';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loader}>
      <Puff
        type="Puff"
        color="#4a56e2"
        height={300}
        width={300}
        timeout={3000}
      />
    </div>
  );
}

export default Loader;
