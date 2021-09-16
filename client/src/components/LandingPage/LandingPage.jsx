import React from 'react';
import {Link} from 'react-router-dom';

import './LandingPage.css'
import '../../images/backgroundLanding.jpg'

export default function LandingPage(){
    return( 
        <div>
            <div className='landingContainer'> </div>
            <div className='landingContainer2'>
                <div className='boxContainer'>
                    <h1 className='h1'>WikiDogs</h1>
                    <Link to='/home'>
                    <button type='submit' className='button button1'>Ingresar</button>
                    </Link>
            </div>
            </div>
        </div>
    )
}