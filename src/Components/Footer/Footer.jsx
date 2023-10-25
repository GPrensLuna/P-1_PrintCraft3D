import React from 'react'
import styles from "./Footer.module.css";
import logo from "../../imagenes/logo.png";

function Footer() {
  return (
        <div className={styles.Footer}> 
        <div >
        {/* Columna 1 */}
          <h4>Contacto:</h4>
          <ul>
            <li>Telefono:</li>
            <li>Email:</li>
            <li>ubicacion:</li>
          </ul>
        {/* Columna 2 */}
          <h4>Redes Sociales:</h4>
          <ul >
            <li>Facebook:</li>
            <li>Twitter:</li>
            <li>Instagram:</li>
          </ul>
          </div>


        <p>
        <img className={styles.logo} src={logo} alt=''/>
          &copy;{new Date().getFullYear()} PrintCraft3D - All Rights Reserved.
        </p>
</div>
  );
}

export default Footer




// function Footer () {

//   return (
//     <div className={styles.footer}>
//       <hr className={styles.footerSeperator} />
//       <section className={styles.footerSocialMedia}>
//         <a href="/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
//       </section>
//       <section className={styles.footerInfo}>
//         <section className={styles.footerInfoLeft}>
//           <section className={styles.footerInfoName}>
//              PrintCraft3D
//           </section>
//           <section className={styles.footerInfoReturns}>
//             Returns Policy
//             <br />
//             Delivery
//           </section>        
//         </section>
//         <section className={styles.footerInfoCenter}>
//           <section className={styles.footerInfoEmail}>
//             shop.info@gmail.com
//           </section>
//           <section className={styles.footerInfoTerms}>
//             Terms and Conditions
//             <br />
//             Copyright
//           </section>
//         </section>
//         <section className={styles.footerInfoRight}>
//           <section className={styles.footerInfoNumber}>
//             99999999999
//           </section>
//           <section className={styles.footerInfoContact}>
//             My Story
//             <br />
//             Contact Us
//           </section>
//         </section>
//       </section>
//       <hr className={styles.footerSeperator} />
//     </div>
//   )

// }

// export default Footer;

// import logo from "../../imagenes/logo.png";


