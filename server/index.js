var mailjet = require('node-mailjet').connect(
  '510e9a56788082db786c3e605dedfc34',
  'bc5f979541f754150aea16aa2049a89e',
);
var CreatePayment = require('./CreatePaymentInstrument');
var path = require('path');
var filename = path.join('./files', 'output.xlsx');
const port = 8000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const XLSX = require('xlsx');
const mailer = require('./mailer');
var pdf = require('html-pdf');
const app = express();
app.use(cors());
var request = require('request');
const { Pool, Client } = require('pg'); // node-postgres npm package

const userDb = 'zodio';
const passDb = 'zodio123*';
const hostDb = 'portalfornecedores.ckf1stnp9q64.sa-east-1.rds.amazonaws.com';
const portDb = '5432'; // default
const nameDb = 'portalFornecedores';
const connectionString = 'postgres://' + userDb + ':' + passDb + '@' + hostDb + ':' + portDb + '/' + nameDb;
const client = new Client({ connectionString });
client.connect();
const pool = new Pool({ connectionString });
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  }),
);
app.use(bodyParser.json({ limit: '50mb' }));

async function getToken(req, res) {
  CreatePayment.createPaymentInstrument(
    req.body.input.nome_fornecedor,
    req.body.input.cardMonth,
    req.body.input.cardYear,
    req.body.input.cardNumber,
    async response => {
      console.log(response.id);
      let token = response.id;
      console.log(req.body);
      var found_cnpj = await client.query(`SELECT COUNT(*) FROM fornecedores WHERE CNPJ = '${req.body.input.CNPJ}'`);
      found_cnpj = found_cnpj.rows[0].count;

      if (found_cnpj == 0) {
        await client.query(
          `INSERT INTO visa_fornecedores (nome_fornecedor, CNPJ, compras, limite_1, limite_2, limite_3, limite_4,
         desconto_1, desconto_2, desconto_3, desconto_4, taxa_antecipacao, token) VALUES ( '${
           req.body.input.nome_fornecedor
         }',
            '${req.body.input.CNPJ}',  '${req.body.input.compras}', '${req.body.input.limite_1}', 
            '${req.body.input.limite_2}', '${req.body.input.limite_3}', '${req.body.input.limite_4}', 
            '${req.body.input.desconto_1}', '${req.body.input.desconto_2}', '${req.body.input.desconto_3}', 
            '${req.body.input.desconto_4}', '${req.body.input.taxa_antecipacao}', 
            '${token}' );`,
          (err, results) => {
            if (err) {
              return res.send(err);
            } else {
              return res.json({
                data: results,
              });
            }
          },
        );
      }
      return response.id;
    },
  );
}

app.post('/', async function(req, res) {
  getToken(req, res);
});

app.get('/fornecedores_total', (req, res) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query('SELECT * from visa_fornecedores ORDER BY nome_fornecedor;', (err, results) => {
      done();
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          data: results,
        });
      }
    });
  });
  // client.end();
});

//app.use('/', routes);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
