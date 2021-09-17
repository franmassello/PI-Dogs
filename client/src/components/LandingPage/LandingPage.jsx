import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'
import '../../images/backgroundLanding.jpg'
import '../images/1.jpg'

export default function LandingPage(){

    var imageLink = 'https://diarioconvos.com/wp-content/uploads/2021/07/perro.jpg'//'/images/1.jpg'//
    /* imageLink[1] = 'https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560'//'/images/2.jpg'//'https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560'
    imageLink[2] = 'https://diarioconvos.com/wp-content/uploads/2021/07/perro.jpg'//'/images/3.jpg'//'https://diarioconvos.com/wp-content/uploads/2021/07/perro.jpg'

    var indiceImagenes = 0

    function mostrarImagenes(){
        document.slider.src = imageLink[2]
        if (indiceImagenes < 2){
            indiceImagenes++
        } else {
            indiceImagenes = 0;
        }
    
    }
    
    setInterval(mostrarImagenes, 50000) */
    
    return( 
        <div className='landingContainer'>
            <img src={imageLink} id="bg" alt=""/>
                <div className='belowContainer'>
                    <h1 className='h1Text'>WikiDogs</h1>
                    <Link to='/home'>
                        <button type='submit' className='button1'>Ingresar</button>
                    </Link>
                </div>
        </div>
    )
}