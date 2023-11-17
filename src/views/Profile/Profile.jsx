import React, { useState, useEffect } from 'react';
import styles from './profile.module.css';
import axios from "axios";
import { URL } from "../../config.js";
import Orden from './Orden.jsx';

export default function Profile({ userData }) {

  let [orders, setOrders] = useState([])
  let [count, setCount] = useState()
  let [showOrders, setShowOrders] = useState(false)

  useEffect(()=>{
    async function fetchOrders() {
      if (userData?.userId) {
        let response = await axios.get(`${URL}Compras/${userData.userId}`);
        setOrders(response.data.orders);
        setCount(response.data.count);
      }
    }
    fetchOrders();
  }, [userData])

  let mapOrders;

  if (orders && count){
    mapOrders=orders.map((order, index) => {
      return <Orden order={order} index={index}/>
    })
  }

  const displayOrders = () => {
    setShowOrders(!showOrders);
  }

  return (
    <div className={styles.container}>
      {userData ? (
        <div>
          <div>
            <br />
            <br />
            <h1 className={styles.greeting}>Hola {userData.name}, bienvenido a tu perfil</h1>
          </div>
          <div>
            <button onClick={displayOrders}>Mostrar Órdenes</button>
            {showOrders && (
              <div>
                <ul className={styles.ul}>{mapOrders}</ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Cargando perfil...</p>
      )}
    </div>
  );
}

