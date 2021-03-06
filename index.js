// env config
require('dotenv').config();
// depedences
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const { db } = require('./config/db');
// variable
const port = process.env.PORT;
// express
const REST = express();
REST.use(cors());
REST.use(compression());
// setting body-parser
REST.use(express.json());
REST.use(express.urlencoded({ extended: true }));
// function get data from db
const executeDB = (sql, val) => new Promise((resolve) => {
  db.query(sql, val)
    .then(async (result) => {
      resolve({
        status: true, code: 200, message: 'GET Success', data: result,
      });
    })
    .catch(async (error) => {
      console.log(error);
      resolve({ status: false, code: 500, error: 'Internal Server Error' });
    });
});
// Controller
// provinsi
REST.get('/region/province', async (req, res) => {
  const search = (req.query.search === '' || req.query.search === undefined) ? '%%' : `%${req.query.search.toLowerCase()}%`;
  const sql = 'SELECT * FROM t_region_provinces WHERE LOWER(name) LIKE $1';
  const val = [search];
  const response = await executeDB(sql, val);
  res.status(response.code).send(response);
});
// kota
REST.get('/region/regency', async (req, res) => {
  const search = (req.query.search === '' || req.query.search === undefined) ? '%%' : `%${req.query.search.toLowerCase()}%`;
  const provId = (req.query.province_id === '' || req.query.province_id === undefined) ? null : req.query.province_id;
  const sql = 'SELECT * FROM t_region_regencies WHERE LOWER(name) LIKE $1 AND ($2 is null OR province_id = $2)';
  const val = [search, provId];
  const response = await executeDB(sql, val);
  res.status(response.code).send(response);
});
// kecamatan
REST.get('/region/district', async (req, res) => {
  const search = (req.query.search === '' || req.query.search === undefined) ? '%%' : `%${req.query.search.toLowerCase()}%`;
  const regencyId = (req.query.regency_id === '' || req.query.regency_id === undefined) ? null : req.query.regency_id;
  const sql = 'SELECT * FROM t_region_districts WHERE LOWER(name) LIKE $1 AND ($2 is null OR regency_id = $2)';
  const val = [search, regencyId];
  const response = await executeDB(sql, val);
  res.status(response.code).send(response);
});
// desa
REST.get('/region/village', async (req, res) => {
  const search = (req.query.search === '' || req.query.search === undefined) ? '%%' : `%${req.query.search.toLowerCase()}%`;
  const disId = (req.query.district_id === '' || req.query.district_id === undefined) ? null : req.query.district_id;
  const sql = 'SELECT * FROM t_region_villages WHERE LOWER(name) LIKE $1 AND ($2 is null OR district_id = $2)';
  const val = [search, disId];
  const response = await executeDB(sql, val);
  res.status(response.code).send(response);
});
// handle error no route
REST.get('/*', async (req, res) => {
  res.status(404).send({
    status: false,
    code: 404,
    message: 'Service Not Found',
  });
});
// running listen port
REST.listen(port, () => {
  console.log(`Region REST Service listening on port ${port}`);
});
