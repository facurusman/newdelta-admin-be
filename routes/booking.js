const express = require('express');

const conexion = require('../database');

const router = express.Router();

router.post('/cancelar', async (req, res, next) => {
  const idReserva = req.body.idReserva;
  conexion.query('UPDATE reservas SET estado = 2 WHERE (id = ?);', [idReserva], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(200).json({ status: 'fail' });
    }
    res.status(200).json({ status: 'ok' });
  });
});

router.post('/completar', async (req, res, next) => {
  const idReserva = req.body.idReserva;
  conexion.query('UPDATE reservas SET estado = 3 WHERE (id = ?);', [idReserva], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(200).json({ status: 'fail' });
    }
    res.status(200).json({ status: 'ok' });
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM reservas WHERE estado = 1 ORDER BY id ASC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//Este es el endpoint que trae la informacion de la reserva dado un ID

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM reservas WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


router.post('/asignar/:id', async (req, res, next) => {
  const { id } = req.params;
  const { auto } = req.body;
  conexion.query('UPDATE reservas SET auto = ? WHERE (id = ?);', [auto, id], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(200).json({ status: 'fail' });
    }
    res.status(200).json({ status: 'ok' });
  });
});

module.exports = router;
