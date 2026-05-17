app.post('/sensor', (req, res) => {
  const { distancia, unidad, timestamp, led } = req.body;

  // Guarda historial para el gráfico (máximo 50 puntos)
  if (!global.historial) global.historial = [];
  global.historial.push({
    distancia,
    unidad,
    timestamp,
    led,
    hora: new Date().toLocaleTimeString('es-PE')
  });
  if (global.historial.length > 50) global.historial.shift();

  ultimoDato = { distancia, unidad, timestamp, led };

  console.log(`📏 ${distancia} cm | LED: ${led ? 'ON' : 'OFF'}`);
  res.json({ status: 'ok' });
});

// Nuevo endpoint para el gráfico
app.get('/historial', (req, res) => {
  res.json(global.historial || []);
});
