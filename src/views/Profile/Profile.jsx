import React from 'react';
import styles from './profile.module.css';

export default function Profile({ userData }) {
  return (
    <div className={styles.container}>
      {userData ? (
        <div>
          <h1 className={styles.greeting}>Hola {userData.email}, bienvenido a tu perfil</h1>
          <br />
          <h1 className={styles.greeting}>Hola {userData.name}, bienvenido a tu perfil</h1>
        </div>
      ) : (
        <p className={styles.loading}>Cargando perfil...</p>
      )}
    </div>
  );
}

