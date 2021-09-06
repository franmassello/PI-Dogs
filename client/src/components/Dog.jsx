import React from 'react';

export default function Dog({ name, image, breed}){
    return (
        <div>
            <h3>{name}</h3>
            <h5>{breed}</h5>
            <img src={image} alt='IMG not found' width='200px' height='250px'/>
        </div>
    )
}