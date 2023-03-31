const {data} = require("./sample.js");
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;
const host = process.env.HOST || '0.0.0.0';

app.use(cors())
app.use(express.json())

;(async () => {
  const sequelize = await require('./initialize-db.js')()
  console.log(sequelize.models)

  app.get('/', function (req, res) {
    res.send("simple-tracker!")
  })
  
  // employees 
  const Employee = sequelize.models.employee 
  
  app.get('/employees', function(req, res) {
    Employee.findAll().then(employees=>{
      res.send(employees.map(e=>e.dataValues))
    })    
  })

  app.get('/employees/:id', function(req, res) {
    Employee.findByPk(req.params.id).then(employee=> {
      if (employee === null) res.status(404), res.send("Employee not found")
      else res.send(employee.toJSON())
    })
  })
  
  app.post('/employees', function(req, res) {
    if (req.body.name !== undefined) {
      const employee = Employee.build(
        {
          name: req.body.name,
          github: req.body.github
        }
      )
      employee.save().then(()=>{
        console.log(`User created:`)
        for(key of Object.keys(employee.dataValues)) {
          console.log(`  ${key}: ${employee.dataValues[key]}`)
        }
        res.send(employee.toJSON())
      })
    } else {
      res.status(400).send('Missing employee name')
    }
  })
  
  app.put('/employees/:id', function(req, res) {
    Employee.findByPk(req.params.id).then(employee => {
      if(employee === null) {
        res.status(404)
        res.send("Employee not found")
      } else if (req.body.id !== undefined) {
        res.status(400)
        res.send("Cannot update primary id")
      } else { 
        console.log(`User ${employee.id} updated:`)
        for(key of Object.keys(req.body)) {
          console.log(`  ${key}: ${employee[key]} => ${req.body[key]}`)
        }
        employee.set(req.body)
        employee.save().then(()=>res.send(employee.toJSON()))
      }
    }) 
  })
  
  app.delete('/employees/:id', function(req, res) {
    Employee.findByPk(req.params.id).then(employee => {
      if(employee === null) {
        res.status(404)
        res.send("Employee not found")
        return
      }
    
      employee.destroy().then(()=>{
        console.log(`User ${employee.id} deleted.`)
        res.send('OK')
      })
    })
  })
  
  // clients
  const Client = sequelize.models.client 

  app.get('/clients', function(req, res) {
    Client.findAll().then(clients=>{
      res.send(clients.map(c=>c.dataValues))
    })
  })
  
  app.get('/clients/:id', function(req, res) {
    Client.findByPk(req.params.id).then(client => {
      if (client === null) res.status(404), res.send("Client not found")
      else res.send(client.toJSON())
    })
  })
  
  
  app.post('/clients', function(req, res) {
    if (req.body.name !== undefined) {
      const client = Client.build({
        name: req.body.name,
        url: req.body.url
      })
    
      client.save().then(()=>{
        console.log(`Client ${client.id} created:`)
        for(key of Object.keys(req.body)) {
          if (key.toLowerCase() === "id") continue
          console.log(`  ${key}: ${client[key]}`)
        }
        res.send(client.toJSON())
      })
    } else {
      res.status(400).send('Missing client name')
    }
  })

  app.put('/clients/:id', function(req, res) {
    Client.findByPk(req.params.id).then(client => {
      if(client === null) {
        res.status(404)
        res.send("Client not found")
      } else if (req.body.id !== undefined){
        res.status(400)
        res.send("Cannot update primary id")
      } else {
        console.log(`Client ${client.id} updated:`)
        for(key of Object.keys(req.body)) {
          console.log(`  ${key}: ${client[key]} => ${req.body[key]}`)
        }
        client.set(req.body)      
        client.save().then(()=>res.send(client.toJSON()))
      } 
    })
  })
  
  app.delete('/clients/:id', function(req, res) {
    Client.findByPk(req.params.id).then(client => {
      if(client === null) {
        res.status(404)
        res.send("Client not found")
        return
      }
      
      client.destroy().then(()=>{
        console.log(`Client ${client.id} deleted.`)
        res.send('OK')
      })
    })
  })
  
  // contracts 
  const Contract = sequelize.models.contract
  const Tech = sequelize.models.tech

  app.get('/contracts', function(req, res) {
    if(req.query.clientId) {
      Contract.findAll({where:{clientId: req.query.clientId}}).then(contracts=>{
        res.send(contracts.map(c=>c.dataValues))
      })
    } else {
      Contract.findAll().then(contracts=>{
        res.send(contracts.map(c=>c.dataValues))
      })
    }
  })
  
  app.get('/contracts/:id', function(req, res) {
    Contract.findByPk(req.params.id, 
      {
        include: {
          model: Tech,
          as: 'tech'
        }
      }
    ).then(contract=>{
      if (contract === null) res.status(404), res.send("Contract not found")
      else {
        let body = contract.dataValues
        body.tech = body.tech.map(t=>t.type)
        res.send(body)
      }
    })
  })
  
  app.post('/contracts', function(req, res) {
    Client.findByPk(req.body.clientId).then(client=>{
      if(client !== null) {
        let techlist = req.body.tech.map(t=> {return {type: t}})
        Contract.create({
          clientId: client.id,
          type: req.body.type,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          tech: techlist
        }, {
          include: {
            model: Tech,
            as: 'tech'
          }
        }).then(contract=>{
          console.log(`Contract ${contract.id} created:`)
          for(key of Object.keys(req.body)) {
            if (key.toLowerCase() === "id") continue
            console.log(`  ${key}: ${contract[key]}`)
          }
          let response = contract.dataValues
          response.tech = response.tech.map(t=>t.type)
          res.send(response)
        })
      } else {
        res.status(400).send('Missing or invalid client id')
      }
    })
  })
  
  app.put('/contracts/:id', function(req, res) {
    Contract.findByPk(req.params.id, 
      {
        include: {
          model: Tech,
          as: 'tech'
        }
      }
    ).then(contract=>{
      if(contract === null) {
        res.status(404)
        res.send("Contract not found")
      } else if(req.body.id !== undefined){
        res.status(400)
        res.send("Cannot update primary id")
      } else {
        let promises = []
        if (req.body.tech !== undefined) {
          for(const tech of contract.tech) {
            promises.push(tech.destroy())
          }
          for(const tech of req.body.tech) {
            promises.push(contract.createTech({type: tech}))
          }
          delete req.body.tech
        }

        console.log(`Contract ${contract.id} updated:`)
        for(key of Object.keys(req.body)) {
          console.log(`  ${key}: ${contract[key]} => ${req.body[key]}`)
        }
        
        contract.set(req.body)
        Promise.all(promises).then(()=>
          contract.reload().then(()=>
            contract.save().then(()=> {
              let response = contract.dataValues
              response.tech = response.tech.map(t=>t.type)
              res.send(response)
            })
          )
        )
      }   
    })
  })
  
  app.delete('/contracts/:id', function(req, res) {
    Contract.findByPk(req.params.id).then(contract => {
      if(contract === null) {
        res.status(404)
        res.send("Contract not found")
        return
      }
    
      contract.destroy().then(()=>{
        console.log(`Contract ${contract.id} deleted.`)
        res.send('OK')
      })
    })
  })
  
  // history
  const History = sequelize.models.history

  app.get('/history', function(req, res) {
    let params = {}
    if(req.query.employeeId) params.employeeId = req.query.employeeId
    if (req.query.contractId) params.contractId = req.query.contractId
    if(req.query.clientId) params.clientId = req.query.clientId
  
    History.findAll({where: params}).then(history=>{
      res.send(history.map(h=>h.dataValues))
    })
  })
  
  app.get('/history/:id', function(req, res) {
    History.findByPk(req.params.id).then(history=>{
      if (history === null) res.status(404), res.send("History not found")
      else res.send(history.toJSON())
    })
  })
  
  app.post('/history', function(req, res) {
    console.log(req.body)
    Promise.all([
      Client.findByPk(req.body.clientId),
      Employee.findByPk(req.body.employeeId),
      Contract.findByPk(req.body.contractId)
    ]).then(values=>{
      // console.log(values)
      if (!values.includes(null)){
        let [client, employee, contract] = values
        console.log(`------------------CONTRACT ID: ${contract.id}`)
        console.log(`------------------EMPLOYEE ID: ${employee.id}`)
        const history = History.build({
          clientId: client.id,
          clientName: client.name,
          contractId: contract.id,
          employeeId: employee.id,
          employeeName: employee.name,
          role: req.body.role
        })
        history.save().then(()=>{
          console.log(`History ${history.id} created:`)
          for(key of Object.keys(req.body)) {
            if (key.toLowerCase() === "id") continue
            console.log(`  ${key}: ${history[key]}`)
          }
          console.log(history.toJSON())
          res.send(history.toJSON())
        })
      } else {
        res.status(400).send('Missing or invalid client, contract, or employee id')
      }
    })
  })

  app.put('/history/:id', function(req, res) {
    History.findByPk(req.params.id).then(history=>{
      if(history === null) {
        res.status(404)
        res.send("History not found")
      } else if(req.body.id !== undefined){
        res.status(400)
        res.send("Cannot update primary id")
      } else {
        console.log(`History ${history.id} updated:`)
        for(key of Object.keys(req.body)) {
          console.log(`  ${key}: ${history[key]} => ${req.body[key]}`)
        }
      
        history.set(req.body)
        history.save().then(()=>res.send(history))
      } 
    })
  })
  
  app.delete('/history/:id', function(req, res) {
    History.findByPk(req.params.id).then(history=>{
      if(history === null) {
        res.status(404)
        res.send("History not found")
        return
      }
    
      history.destroy().then(()=>{
        console.log(`History ${history.id} deleted.`)
        res.send('OK')
      })
    })
  })
  
  app.listen(port, host);
  console.log(`Server started at http://${host}:${port}`);
})()
