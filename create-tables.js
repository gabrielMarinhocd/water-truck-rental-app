import  pg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();
// const { connectionString } = process.env;
const connectionString = 'postgres://yozegpeflqcbex:92127c4562788e254d58a7f289b597dd2c947d1b0461a81f2c9b2eab5e38861b@ec2-52-203-99-122.compute-1.amazonaws.com:5432/d7hmalenmpq53t'
const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});


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
// client.query('CREATE TABLE cliente(id SERIAL PRIMARY KEY, cpf varchar(30), nome VARCHAR(255), email varchar(100), cep varchar(45), telefone varchar(14) , ativo int )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// client.connect()
// client.query('CREATE TABLE servico(id SERIAL PRIMARY KEY, tipo varchar(45), nome varchar(255), ativo int, descricao varchar(255), imagem varchar(255) )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })


// client.connect()
// client.query('CREATE TABLE pedido(id SERIAL PRIMARY KEY, date DATE, valor DECIMAL(10,2), data_pagamento DATE, id_cliente int, ativo int, FOREIGN KEY (id_cliente) REFERENCES cliente(id) )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// client.connect()
// client.query('CREATE TABLE pedido_servico(id SERIAL PRIMARY KEY, id_servico int, id_pedido int, quantidade int, local varchar(255), data_inicio DATE, hora VARCHAR(10), forma_pagamento varchar(45), data_termino varchar(45), quatidade_litros INT, FOREIGN KEY (id_servico) REFERENCES servico(id),FOREIGN KEY (id_pedido) REFERENCES pedido(id) )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

pool.connect()
pool.query('ALTER TABLE servico ADD descricao char(255); imagem char(255);', (err, res) => {
  console.log(err, res)
});

// NO

// client.connect()
// client.query('CREATE TABLE user(id SERIAL PRIMARY KEY, nome varchar(255) )', (err, res) => {
//   console.log(err, res)
//   client.end()
// })
