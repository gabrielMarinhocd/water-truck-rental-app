import express from 'express';
import cors from 'cors';
import routeCliente from'./routes/cliente/controlher.js';
import routeServico from './routes/servico/controlher.js';
import routePedido from './routes/pedido/controlher.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/cliente', routeCliente);
app.use('/servico', routeServico);
app.use('/pedido', routePedido);

const APP_PORT = process.env.PORT || 3001;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${APP_PORT}`);
});
