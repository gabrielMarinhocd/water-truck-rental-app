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
    const servico = req.body;
  

    await pool.query(
      "INSERT INTO servico( tipo, nome, ativo, descricao, imagem) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        servico.tipo,
        servico.nome,
        1,
        servico.descricao,
        servico.imagem,
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


    await pool.query("SELECT * FROM servico where id = $1",[req.query.id], (err, results) => {
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
  try {


    await pool.query("SELECT * FROM servico  ORDER BY id ASC", (err, results) => {
      if (err) {
        throw err;
      }
     
      res.status(200).send(results.rows);
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/ativo", async (req, res) => {
  try {


    await pool.query("SELECT * FROM servico WHERE ativo = 1 ORDER BY id ASC", (err, results) => {
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
    
   await pool.query("UPDATE servico SET ativo = $1  WHERE id = $2", [2, client.id], (err, results) => {
      if (err) {
        throw err;
      }
      
      res.status(200).send("Item desativado");
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default router;
