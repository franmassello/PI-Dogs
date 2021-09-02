const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Razas , Temperamentos } = require ('../db')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async()=>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            img: el.image,
            height: el.height,
            weight: el.weight,
            lifespan: el.life_span,
            temperament: el.temperament
        };
    });
    return apiInfo
}

const getDbInfo = async () => {
    return await Razas.findAll({
        include: {
            model: Temperamentos,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}

router.get('/dogs', async(req,res) =>{
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send('No existe el perro!')
    } else {
        res.status(200).send(dogsTotal)
    }
})

router.get('/temperament', async(req,res) =>{
    const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds')
    const temperaments = temperamentApi.data.map(el => el.temperament)
    const tempEach = temperaments.map(el => {
        //console.log(typeof el) // es una string
        el = [el]
        for(let i=0; i < el.length; i++) return el[i]})
        //console.log(tempEach)
    tempEach.forEach(el => {
        Temperamentos.findOrCreate({
            where: { name: el }
        })
    })
        const allTemperaments = await Temperamentos.findAll()
        res.send(allTemperaments)
    
})



router.post('/dogs', async(req,res) =>{
    let {
        name,
        img,
        height,
        weight,
        lifespan,
        temperament,
        createdInDb,
    } = req.body

    let dogCreated = await Razas.create({
        name,
        img,
        height,
        weight,
        lifespan,
        createdInDb
    })

    let temperamentDb = await Temperamentos.findAll({
        where: { name: temperament}
    })
    dogCreated.addTemperament(temperamentDb)
    res.send('Raza creada!')
})

/* router.get('/dogs/:idRaza', async(req,res) =>{

}) */


module.exports = router;

