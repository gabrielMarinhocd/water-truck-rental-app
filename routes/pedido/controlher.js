import express from "express";
import pg from "pg";
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
const { connectionString } = process.env;

const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});


router.post("/", async (req, res) => {
  try {
    const pedido = req.body;
    
    
    await pool.query(
      "INSERT INTO pedido(date, valor, data_pagamento, id_cliente, ativo) VALUES(now(), $1, $2, $3, $4) RETURNING *",
      [
        pedido.valor,
        pedido.data_pagamento,
        pedido.id_cliente,
        1,
      ],
      (error, results) => {
        if (error) {
          throw error;
        } 
        secondQuery( results.rows[0].id);
      }
    );

   const secondQuery = (id) => {
    pool.query(
      "INSERT INTO pedido_servico(id_servico, id_pedido, quantidade, local, data_inicio, hora, forma_pagamento, data_termino, quatidade_litros) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        pedido.id_servico,
        id,
        pedido.quantidade,
        pedido.local,
        pedido.data_inicio,
        pedido.hora,
        pedido.forma_pagamento,
        pedido.data_termino,
        pedido.quantidade_litros
      ],
      (error, results) => {
        if (error) {
          throw error;
        } 
        
        res.status(200).send([pedido, results.rows]);
      }
    );
   } 
  
    
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get("/id", async (req, res) => {
  try {
    

    await pool.query("SELECT * FROM pedido where id = $1",[req.query.id], (err, results) => {
      if (err) {
        throw err;
      }
      secondQuery(results.rows)
    });

    const secondQuery = (pedido) =>{
 
    pool.query("SELECT * FROM pedido_servico where id_pedido = $1", [req.query.id], (err, results) => {
      if (err) {
        throw err;
      }
      const showPedido = [pedido, results.rows];
      
      res.status(200).send(showPedido);
    });
  }
 
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get("/", async (req, res) => {
  try {
    

    await pool.query("SELECT * FROM pedido", (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send(results.rows);
    });
   
  } catch (err) {
    
    res.status(500).send(err.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const client =  req.query
    

    await pool.query("UPDATE pedido SET ativo = $1  WHERE id = $2", [2,client.id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send("Pedido desativado");
    });
   
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default router;
