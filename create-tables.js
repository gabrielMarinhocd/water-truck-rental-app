import  pg from 'pg';
const connectionString = 'postgres://sdqjmgffzasoyt:2a065c8ddd816801d452eb957d5621e7f1b148d3555a56731b3a547dc4b3eacb@ec2-3-208-79-113.compute-1.amazonaws.com:5432/d70fd4sne97o1p'

const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})


const client = new pg.Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
  })
  

// client.connect()
// client.query('CREATE TABLE cliente(id SERIAL PRIMARY KEY, cpf varchar(30), nome VARCHAR(255), email varchar(100), cep varchar(45), telefone varchar(14) , ativo int )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// client.connect()
// client.query('CREATE TABLE servico(id SERIAL PRIMARY KEY, tipo varchar(45), nome varchar(255), ativo int )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })


// client.connect()
// client.query('CREATE TABLE pedido(id SERIAL PRIMARY KEY, date DATE, valor DECIMAL(10,2), data_pagamento DATE, id_cliente int, ativo int, FOREIGN KEY (id_cliente) REFERENCES cliente(id) )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// client.connect()
// client.query('CREATE TABLE pedido_servico(id SERIAL PRIMARY KEY, id_servico int, id_pedido int, quantidade int, local varchar(255), data_inicio DATE, hora TIME, forma_pagamento varchar(45), data_termino varchar(45), quatidade_litros INT, FOREIGN KEY (id_servico) REFERENCES servico(id),FOREIGN KEY (id_pedido) REFERENCES pedido(id) )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// NO

// client.connect()
// client.query('CREATE TABLE user(id SERIAL PRIMARY KEY, nome varchar(255) )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })
