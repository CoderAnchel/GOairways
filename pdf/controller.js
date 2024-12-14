import express from 'express';
import { buildPDF, buildRoutePDF } from './libs/pdfKit.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from pdf service!');
});

router.get('/pdf', (req, res) => {

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Content-Disposition': 'attachment; filename=resumen.pdf'
    });

    buildPDF((data) => {
        stream.write(data);
    }, (end) => {
        stream.end(end);
    })

});

router.post('/generate-pdf', (req, res) => {
    const routeData = req.body;

    if (!routeData || !routeData.airportFrom || !routeData.airportTo) {
        return res.status(400).send('Invalid route data');
    }

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Content-Disposition': 'attachment; filename=route.pdf'
    });

    buildRoutePDF((data) => {
        stream.write(data);
    }, () => {
        stream.end();
    }, routeData);
});

router.post('/test', (req, res) => {
    const data = req.body;

    console.log(data);

    return res.json(data);
});


export default router;
