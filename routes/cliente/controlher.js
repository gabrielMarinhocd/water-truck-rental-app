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
    const cliente = req.body;
    

    await pool.query(
      "INSERT INTO cliente( cpf, nome, email, cep, telefone, ativo) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        cliente.cpf,
        cliente.nome,
        cliente.email,
        cliente.cep,
        cliente.telefone,
        1,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(results.rows);
      }
    );
    
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get("/id", async (req, res) => {
  try {
    

    await pool.query("SELECT * FROM cliente where id = $1",[req.query.id], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send(results.rows);
    });
    
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get("/", async (req, res) => {
  let clientes
  try {
    

   await pool.query("SELECT * FROM cliente", (err, results) => {
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
    

    await pool.query("UPDATE cliente SET ativo = $1  WHERE id = $2", [2, client.id], (err, results) => {
      if (err) {
        throw err;
      }
      
      res.status(200).send("Item desativado");
    });
    ;
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default router;
