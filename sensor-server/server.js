const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = 3000;

let ledHabilitado = false;
let ultimoDato    = {};
let historial     = [];

// ESP32 envía datos
app.post('/sensor', (req, res) => {
  const { distancia, unidad, timestamp, led } = req.body;

  const hora = new Date().toLocaleTimeString('es-PE');
  ultimoDato = { distancia, unidad, timestamp, led, hora };

  // Guardar en historial para el gráfico
  historial.push({ distancia: parseFloat(distancia), hora, led });
  if (historial.length > 50) historial.shift();

  console.log(`📏 ${distancia} cm | LED: ${led ? 'ON' : 'OFF'} | ${hora}`);
  res.json({ status: 'ok' });
});

// ESP32 consulta interruptor
app.get('/led', (req, res) => {
  res.json({ led: ledHabilitado });
});

// Web cambia interruptor
app.post('/led', (req, res) => {
  ledHabilitado = req.body.led;
  console.log(`🌐 Interruptor web: ${ledHabilitado ? 'ON' : 'OFF'}`);
  res.json({ status: 'ok', led: ledHabilitado });
});

// Web consulta último dato
app.get('/datos', (req, res) => {
  res.json(ultimoDato);
});

// Web consulta historial para gráfico
app.get('/historial', (req, res) => {
  res.json(historial);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor en puerto ${PORT}`);
});
