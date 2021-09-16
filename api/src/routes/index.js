const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Razas , Temperaments } = require ('../db');
const { combineTableNames } = require('sequelize'); // sequelize/types/lib/utils
const { noExtendLeft } = require('sequelize'); // /types/lib/operators
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// On this file I have defined the routes of our API with a few functions that will help the routes

//---------------- FUNCTIONS ----------------
const getApiInfo = async()=>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds') // Here i make a get request to the API provided in the README and save the raw data on apiUrl
    const apiInfo = await apiUrl.data.map(el => { // Here i map the data that i need from the api and save it on apiInfo
        return {
            id: el.id,
            name: el.name,
            img: el.image.url,
            height: el.height.metric,
            weight: el.weight.metric,
            lifespan: el.life_span,
            temperaments: el.temperament?.split(", ")
        };
    });
    return apiInfo 
}

const getDbInfo = async () => { // This function will retrieve all the data from the table 'Razas'
    return await Razas.findAll({  // And i will save all that data in getDbInfo for future queries 
        include: {                // Where i will need all the dogs created in the db
            model: Temperaments,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllDogs = async () => {        //This function will get all the dogs from the API and the DB
  const apiData = await getApiInfo();
  const dbData = await getDbInfo();
  const dbTempFil = await dbData?.map((breed) => {
    let { id, name, height, weight, lifespan, image, createdInDb } = breed;
    return {
      id,
      name,
      height,
      weight,
      lifespan,
      image,
      createdInDb,
      temperaments: breed.temperaments?.map((temp) => {
        return temp.name;
      }),
    };
  });
  const allData = apiData.concat(dbTempFil);
  return allData;
}

const chargeTempApiToDb = async () => {   // This function will make a get request to the API 
    let allData = await getApiInfo();     // and save all that raw data (name, height, weight, etc)
    let alltemps = [];                    // Then i map all that raw data and extract the temperament for each dog 
    allData.map((el) => {                 // I push all the temperaments in alltemps and then insert alltemps 
      let elTemp = el.temperaments;        // and then for each temperament in alltemps i create a temperament in the table 'temperaments'
      if(elTemp !== undefined){
      for (let i = 0; i < elTemp.length; i++) {
        let tem = el.temperaments[i];
        if (!alltemps.includes(tem)) {
          alltemps.push(tem);
        }}
      }
    });
    alltemps.forEach((temp) => {
      Temperaments.findOrCreate({
        where: { name: temp },
      });
    });
  };

chargeTempApiToDb() // Charge the temps to the db

//-------------------------------------------


//---------------- ROUTES ----------------

router.get('/dogs', async(req,res) =>{
    const name = req.query.name
    try{
      let dogsTotal = await getAllDogs();
      if(name){
          let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
          dogName.length ?
          res.status(200).send(dogName) :
          res.status(404).send('No existe el perro!')
      } else {
          res.status(200).send(dogsTotal)
      }
    }catch(error){
      console.log(error)
    }
})

router.get('/temperament', async(req,res) =>{
    chargeTempApiToDb()
    const allTemperaments = await Temperaments.findAll()
    res.send(allTemperaments)
})

router.post('/dogs', (req, res, next) => {
    const element = req.body;
    /* console.log(element) */
    return Razas
      .create({
        ...element,
      })
      .then((breed) => {
        breed.addTemperaments(element.temperaments);  // terminar de entender esto
      })
      .then((created) => {
        return res.json(created).send(created);
      });
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

