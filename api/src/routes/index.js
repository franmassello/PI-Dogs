const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async()=>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map(el => {
        return 
    })
}

module.exports = router;
