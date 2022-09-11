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

router.post("/", async (req, res) => {
  try {
    const servico = req.body;
    await pool.connect();

    await pool.query(
      "INSERT INTO servico( tipo, nome, ativo) VALUES($1, $2, $3) RETURNING *",
      [
        servico.tipo,
        servico.nome,
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
    await pool.connect();

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
    await pool.connect();

    await pool.query("SELECT * FROM servico", (err, results) => {
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
    await pool.connect();

    await pool.query("DELETE  FROM servico  WHERE id = $1", [client.id], (err, results) => {
      if (err) {
        throw err;
      }

      res.status(200).send(results);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default router;
