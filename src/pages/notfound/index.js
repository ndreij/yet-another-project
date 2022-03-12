import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../pages.module.css';
import pageNotFound from "../../images/notfound.svg";

export const NotFound404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img alt="page not found" src={pageNotFound} width="200px"/>
        <p className={styles.caption}>Страница не найдела</p>
        <Link to='/' className={styles.link2}>Перейти на главную страницу</Link>
      </div>
    </div>
  );
}; 