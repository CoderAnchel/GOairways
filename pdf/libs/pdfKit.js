import PDFDocument from 'pdfkit';

export function buildPDF(dataCallback, endCallback) {
    const now = new Date();

    const doc = new PDFDocument();

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.image('../public/big-log.png',  65, 57, { width: 100 })
        .fillColor("#444444")
        .fontSize(20)
        .fontSize(10)
        .text("New Route Request", 200, 65, { align: 'right' })
        .text(now, 200, 80, { align: 'right' })
        .moveDown();

    doc.end();
}

export function buildRoutePDF(dataCallback, endCallback, route) {
    if (!route || !route.airportFrom || !route.airportTo) {
        throw new Error('Invalid route data');
    }

    const now = new Date();
    const doc = new PDFDocument();

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

// Encabezado del PDF
doc.image('../public/big-log.png', 50, 50, { width: 100 }) // Logo
   .fillColor("#444444")
   .fontSize(22)
   .text("New Route Request", 170, 50, { align: 'right', lineGap: 5 })
   .fontSize(10)
   .text(now.toLocaleString(), 170, 80, { align: 'right' })
   .moveDown(2);

// Línea divisoria
doc.moveTo(50, 110)
   .lineTo(550, 110)
   .strokeColor("#cccccc")
   .lineWidth(1)
   .stroke();

// Información de la Ruta
doc.moveDown()
   .fillColor("#222222")
   .fontSize(16)
   .text("Route Details", { align: 'left', underline: true })
   .moveDown(0.5)
   .fontSize(12)
   .fillColor("#444444")
   .text(`From: `, { continued: true })
   .fillColor("#000000").text(`${route.airportFrom.nombre} (${route.airportFrom.codigo_iata})`)
   .fillColor("#444444").text(`To: `, { continued: true })
   .fillColor("#000000").text(`${route.airportTo.nombre} (${route.airportTo.codigo_iata})`)
   .fillColor("#444444").text(`Distance: `, { continued: true })
   .fillColor("#000000").text(`${route.distance} km`)
   .fillColor("#444444").text(`Flight Time: `, { continued: true })
   .fillColor("#000000").text(`${route.flightTime.horas}h ${route.flightTime.minutos}m`)
   .moveDown(2);

// Modelos Seleccionados
doc.fillColor("#222222")
   .fontSize(16)
   .text("Selected Models", { align: 'left', underline: true })
   .moveDown(0.5);

route.selectedModels.forEach((model, index) => {
   doc.fontSize(12)
      .fillColor("#444444")
      .text(`Model ${index + 1}:`, { continued: true })
      .fillColor("#000000").text(` ${model.modelo}`)
      .fillColor("#444444").text(`    Capacity: `, { continued: true })
      .fillColor("#000000").text(`${model.capacidad}`)
      .fillColor("#444444").text(`    Range: `, { continued: true })
      .fillColor("#000000").text(`${model.alcanze} km`)
      .moveDown(1);
});

// Frecuencia
doc.fillColor("#222222")
   .fontSize(16)
   .text("Frequency", { align: 'left', underline: true })
   .moveDown(0.5)
   .fontSize(12)
   .fillColor("#444444")
   .text(`Daily Frequency: `, { continued: true })
   .fillColor("#000000").text(`${route.dailyFrequ}`)
   .fillColor("#444444").text(`Selected Days: `, { continued: true })
   .fillColor("#000000").text(`${route.SelectedDays.join(', ')}`)
   .moveDown(2);

// Tickets de Despegue
doc.fillColor("#222222")
   .fontSize(16)
   .text("Take Off Tickets", { align: 'left', underline: true })
   .moveDown(0.5);

route.takeOffTickets.forEach((ticket, index) => {
   doc.fontSize(12)
      .fillColor("#444444")
      .text(`Ticket ${index + 1}`, { align: 'left', underline: true })
      .fillColor("#444444").text(`    From: `, { continued: true })
      .fillColor("#000000").text(`${ticket.airportFrom.nombre} (${ticket.airportFrom.codigo_iata})`)
      .fillColor("#444444").text(`    To: `, { continued: true })
      .fillColor("#000000").text(`${ticket.airportTo.nombre} (${ticket.airportTo.codigo_iata})`)
      .fillColor("#444444").text(`    Take Off Time: `, { continued: true })
      .fillColor("#000000").text(`${ticket.takeOffTime}`)
      .fillColor("#444444").text(`    Landing Time: `, { continued: true })
      .fillColor("#000000").text(`${ticket.landingTime}`)
      .fillColor("#444444").text(`    Flight Time: `, { continued: true })
      .fillColor("#000000").text(`${ticket.flightTime.horas}h ${ticket.flightTime.minutos}m`)
      .moveDown(1);
});

// Finaliza el documento
doc.end();
}
