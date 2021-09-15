import React from 'react';
import {Link} from 'react-router-dom';
import styles from "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div>
            <form className={styles.box}>
                <h1 className={styles.h1}>Bienvenido a WikiDogs!</h1>
                <Link to='/home'>
                <button type='submit' className={styles.submit}>Ingresar</button>
                </Link>
            </form>
        </div>
    )
}