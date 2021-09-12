const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Razas , Temperament } = require ('../db');
const { combineTableNames } = require('sequelize'); // sequelize/types/lib/utils
const { noExtendLeft } = require('sequelize'); // /types/lib/operators
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async()=>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            img: el.image.url,
            height: el.height.metric,
            weight: el.weight.metric,
            lifespan: el.life_span,
            temperament: el.temperament?.split(", ")
        };
    });
    return apiInfo
}
const getDbInfo = async () => {
    return await Razas.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}
const getAllDogs = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    let infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}

const chargeTempApiToDb = async () => {
    let allData = await getApiInfo();
    let alltemps = [];
    allData.map((el) => {
      let elTemp = el.temperament;
      if(elTemp !== undefined){
      for (let i = 0; i < elTemp.length; i++) {
        let tem = el.temperament[i];
        if (!alltemps.includes(tem)) {
          alltemps.push(tem);
        }}
      }
    });
    alltemps.forEach((temp) => {
      Temperament.findOrCreate({
        where: { name: temp },
      });
    });
  };

chargeTempApiToDb()

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
    chargeTempApiToDb()
    const allTemperaments = await Temperament.findAll()
    res.send(allTemperaments)
})

router.post('/dogs', async(req,res, next) =>{
    const datos = req.body
    Razas.create(datos)
        .then(datos => res.send(datos))
        .catch(error => next(error))
})

router.get('/dogs/:idRaza', async(req,res) =>{
    const id = req.params.idRaza
    let razasTotal = await getAllDogs()
    //console.log(razasTotal)
    if(id){
        let dogId = await razasTotal.filter(el => el.id.toString() === id.toString()) //Antes estaba como parseInt
        dogId.length?
        res.status(200).send(dogId) :
        res.status(404).send('No se ha encontrado el perro!')
    }
}) 

module.exports = chargeTempApiToDb;
module.exports = router;

