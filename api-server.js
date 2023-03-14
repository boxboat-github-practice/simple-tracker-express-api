const {data} = require("./sample.js");
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;
const host = process.env.HOST || '0.0.0.0';

app.use(cors())
app.use(express.json())

function newId() {return Math.floor(Date.now() * Math.random() / 1000)}

// employees 
app.get('/employees', function(req, res) {
  res.send(data.employees)
})

app.post('/employees', function(req, res) {
  if (req.body.name !== undefined) {
    let employee = {
      name: req.body.name,
      github: req.body.github,
      id: newId(),
    }
  
    data.employees.push(employee)
    console.log(`User ${employee.id} created:`)
    for(key of Object.keys(req.body)) {
      console.log(`  ${key}: ${employee[key]}`)
    }
    res.send(employee)
  } else {
    res.status(400).send('Missing employee name')
  }
})

app.get('/employees/:id', function(req, res) {
  let employee = data.employees.filter(e=>e.id == req.params.id)[0]
  if (employee === undefined) res.status(404), res.send("Employee not found")
  else res.send(employee)
})

app.put('/employees/:id', function(req, res) {
  let i = data.employees.findIndex(e=>e?.id==req.params.id)
  let employee = data.employees[i]
  if(employee === undefined) {
    res.status(404)
    res.send("Employee not found")
  } else if (req.body.id !== undefined) {
    res.status(400)
    res.send("Cannot update primary id")
  } else { 
    console.log(`User ${employee.id} updated:`)
    for(key of Object.keys(req.body)) {
      console.log(`  ${key}: ${employee[key]} => ${req.body[key]}`)
      employee[key] = req.body[key] 
    }
  
    res.send(employee)
  }
})

app.delete('/employees/:id', function(req, res) {
  let i = data.employees.findIndex(e => e?.id==req.params.id)
  if(i === -1) {
    res.status(404)
    res.send("Employee not found")
    return
  }

  let id = data.employees[i].id
  delete data.employees[i]
  data.employees = data.employees.filter(e => e !== null)
  console.log(`User ${id} deleted.`)
  res.send('OK')
})

// clients
app.get('/clients', function(req, res) {
  res.send(data.clients)
})

app.post('/clients', function(req, res) {
  if (req.body.name !== undefined) {
    let client = {
      name: req.body.name,
      url: req.body.url,
      id: newId(),
    }
  
    data.clients.push(client)
    console.log(`Client ${client.id} created:`)
    for(key of Object.keys(req.body)) {
      if (key.toLowerCase() === "id") continue
      console.log(`  ${key}: ${client[key]}`)
    }
    res.send(client)
  } else {
    res.status(400).send('Missing client name')
  }
})

app.get('/clients/:id', function(req, res) {
  let client = data.clients.filter(e=>e?.id == req.params.id)[0] 
  if (client === undefined) res.status(404), res.send("Client not found")
  else res.send(client)
})

app.put('/clients/:id', function(req, res) {
  let i = data.clients.findIndex(e => e?.id==req.params.id)
  let client = data.clients[i]

  if(client === undefined) {
    res.status(404)
    res.send("Client not found")
  } else if (req.body.id !== undefined){
    res.status(400)
    res.send("Cannot update primary id")
  } else {
    console.log(`Client ${client.id} updated:`)
    for(key of Object.keys(req.body)) {
      console.log(`  ${key}: ${client[key]} => ${req.body[key]}`)
      client[key] = req.body[key] 
    }
  
    res.send(client)
  } 
})

app.delete('/clients/:id', function(req, res) {
  let i = data.clients.findIndex(e=>e?.id==req.params.id)
  if(i === -1) {
    res.status(404)
    res.send("Client not found")
    return
  }
  
  let id = data.clients[i].id
  delete data.clients[i]
  data.clients = data.clients.filter(c => c !== null)
  console.log(`Client ${id} deleted.`)
  res.send('OK')
})

// contracts 
app.get('/contracts', function(req, res) {
  if(req.query.clientId) {
    let contracts = data.contracts.filter(e=>e.clientId == req.query.clientId)
    res.send(contracts)
  } else {
    res.send(data.contracts)
  }
})

app.post('/contracts', function(req, res) {
  let client = data.clients.filter(e=>e.id==req.body.clientId)[0]
  if(client !== undefined) {
    let contract = {
      id: newId(),
      clientId: client.id,
      type: req.body.type,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      tech: req.body.tech
    }
    data.contracts.push(contract)
    console.log(`Contract ${contract.id} created:`)
    for(key of Object.keys(req.body)) {
      if (key.toLowerCase() === "id") continue
      console.log(`  ${key}: ${contract[key]}`)
    }
    res.send(contract)
  } else {
    res.status(400).send('Missing or invalid client id')
  }
})

app.get('/contracts/:id', function(req, res) {
  let contract = data.contracts.filter(e=>e?.id == req.params.id)[0]
  if (contract === undefined) res.status(404), res.send("Contract not found")
  else res.send(contract)
})

app.put('/contracts/:id', function(req, res) {
  let i = data.contracts.findIndex(e=>e.id==req.params.id)
  let contract = data.contracts[i]
  if(contract === undefined) {
    res.status(404)
    res.send("Contract not found")
  } else if(req.body.id !== undefined){
    res.status(400)
    res.send("Cannot update primary id")
  } else {
    console.log(`Contract ${contract.id} updated:`)
    for(key of Object.keys(req.body)) {
      console.log(`  ${key}: ${contract[key]} => ${req.body[key]}`)
      contract[key] = req.body[key] 
    }

    res.send(contract)
  }   
})

app.delete('/contracts/:id', function(req, res) {
  let i = data.contracts.findIndex(e=>e?.id==req.params.id)
  if(i === -1) {
    res.status(404)
    res.send("Contract not found")
    return
  }

  let id = data.contracts[i].id
  delete data.contracts[i]
  data.contracts =  data.contracts.filter(c => c !== null)
  console.log(`Contract ${id} deleted.`)
  res.send('OK')
})

// history
app.get('/history', function(req, res) {
  let history = data.history
  if(req.query.employeeId) 
    history = history.filter(e=>e.employeeId == req.query.employeeId)
  if (req.query.contractId) 
    history = history.filter(e=>e.contractId == req.query.contractId)
  if(req.query.clientId)
    history = history.filter(e=>e.clientId == req.query.clientId)

  res.send(history)
})

app.post('/history', function(req, res) {
  let client = data.clients.filter(e=>e.id==req.body.clientId)[0]
  let employee = data.employees.filter(e=>e.id==req.body.employeeId)[0]
  let contract = data.contracts.filter(e=>e.id==req.body.contractId)[0]
  if ( 
    client !== undefined &&
    employee !== undefined &&
    contract !== undefined
  ){
    let history = {
      id: newId(),
      clientId: client.id,
      clientName: client.name,
      contractId: contract.id,
      employeeId: employee.id,
      employeeName: employee.name,
      role: req.body.role
    }
    data.history.push(history)
    console.log(`History ${history.id} created:`)
    for(key of Object.keys(req.body)) {
      if (key.toLowerCase() === "id") continue
      console.log(`  ${key}: ${history[key]}`)
    }
    res.send(history)
  } else {
    res.status(400).send('Missing or invalid client, contract, or employee id')
  }
})

app.get('/history/:id', function(req, res) {
  let history = data.history.filter(e=>e.id == req.params.id)[0]
  if (history === undefined) res.status(404), res.send("History not found")
  else res.send(history)
})

app.put('/history/:id', function(req, res) {
  let i = data.history.findIndex(e=>e?.id==req.params.id)
  let history = data.history[i]
  if(history === undefined) {
    res.status(404)
    res.send("History not found")
  } else if(req.body.id !== undefined){
    res.status(400)
    res.send("Cannot update primary id")
  } else {
    console.log(`History ${history.id} updated:`)
    for(key of Object.keys(req.body)) {
      console.log(`  ${key}: ${history[key]} => ${req.body[key]}`)
      data.history[i][key] = req.body[key] 
    }
  
    res.send(data.history[i])
  } 
})

app.delete('/history/:id', function(req, res) {
  let i = data.history.findIndex(e=>e?.id==req.params.id)
  if(i === -1) {
    res.status(404)
    res.send("History not found")
    return
  }

  let id = data.history[i].id
  delete data.history[i]
  data.history = data.history.filter(h => h !== null)
  console.log(`History ${id} deleted.`)
  res.send('OK')
})

app.listen(port, host);
console.log(`Server started at http://${host}:${port}`);
