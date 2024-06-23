
// const express = require('express');
// const routerSynth = express.Router();
// const SynthData = require('../models/modelSynthData');
//
// // Route zum Erstellen eines neuen Synthesizer-Musters
// routerSynth.post('/', async (req, res) => {
//     console.log("POST /api/synthdata aufgerufen"); // Überprüfung des Route-Aufrufs
//     console.log("Request Body:", req.body); // Überprüfung des Request-Bodys
//     try {
//         const synthData = new SynthData({
//             name: req.body.name,
//             points: req.body.points,
//             created_at: new Date(),
//             updated_at: new Date()
//         });
//         await synthData.save();
//         console.log("SynthData erfolgreich gespeichert"); // Bestätigung der erfolgreichen Speicherung
//         res.status(201).send(synthData);
//     } catch (error) {
//         console.log("Fehler beim Speichern der SynthData:", error); // Fehlerprotokollierung
//         res.status(400).send(error);
//     }
// });
//
// // Route zum Abrufen aller Synthesizer-Muster
// routerSynth.get('/', async (req, res) => {
//     console.log("GET /api/synthdata aufgerufen"); // Überprüfung des Route-Aufrufs
//     try {
//         const synthData = await SynthData.find();
//         res.status(200).send(synthData);
//     } catch (error) {
//         console.log("Fehler beim Abrufen der Synthesizer-Muster:", error); // Fehlerprotokollierung
//         res.status(500).send(error);
//     }
// });
//
// // Route zum Aktualisieren eines Synthesizer-Musters
// routerSynth.put('/:id', async (req, res) => {
//     console.log("PUT /api/synthdata/:id aufgerufen");
//     console.log("Request Body:", req.body);
//     try {
//         const synthData = await SynthData.findByIdAndUpdate(
//             req.params.id,
//             {
//                 name: req.body.name,
//                 points: req.body.points,
//                 updated_at: new Date()
//             },
//             { new: true, runValidators: true }
//         );
//         if (!synthData) {
//             return res.status(404).send({ message: 'Synthesizer-Muster nicht gefunden' });
//         }
//         console.log("Synthesizer-Muster erfolgreich aktualisiert");
//         res.status(200).send(synthData);
//     } catch (error) {
//         console.log("Fehler beim Aktualisieren des Synthesizer-Musters:", error);
//         res.status(400).send(error);
//     }
// });
//
// // Route zum Abrufen eines Synthesizer-Musters nach ID
// routerSynth.get('/:id', async (req, res) => {
//     console.log("GET /api/synthdata/:id aufgerufen");
//     try {
//         const synthData = await SynthData.findById(req.params.id);
//         if (!synthData) {
//             return res.status(404).send({ message: 'Synthesizer-Muster nicht gefunden' });
//         }
//         console.log("Synthesizer-Muster abgerufen:", synthData);
//         res.status(200).json(synthData);
//     } catch (error) {
//         console.log("Fehler beim Abrufen des Synthesizer-Musters:", error);
//         res.status(500).send(error);
//     }
// });
//
// // Route zum Löschen eines Synthesizer-Musters nach ID
// routerSynth.delete('/:id', async (req, res) => {
//     console.log("DELETE /api/synthdata/:id aufgerufen");
//     try {
//         const synthData = await SynthData.findByIdAndDelete(req.params.id);
//         if (!synthData) {
//             return res.status(404).send({ message: 'Synthesizer-Muster nicht gefunden' });
//         }
//         console.log("Synthesizer-Muster erfolgreich gelöscht");
//         res.status(200).send({ message: 'Synthesizer-Muster erfolgreich gelöscht' });
//     } catch (error) {
//         console.log("Fehler beim Löschen des Synthesizer-Musters:", error);
//         res.status(500).send(error);
//     }
// });
//
//
//
// module.exports = routerSynth;



const express = require('express');
const router = express.Router();
const SynthData = require('../models/modelSynthData');

// Route to save synth data
router.post('/save', async (req, res) => {
    const { name, lines } = req.body;
    const newSynthData = new SynthData({ name, lines });
    try {
        await newSynthData.save();
        res.status(201).send({ message: 'Synth data saved successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error saving synth data', error });
    }
});

// Route to load synth data
router.get('/load/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const synthData = await SynthData.findOne({ name });
        if (synthData) {
            res.status(200).send(synthData);
        } else {
            res.status(404).send({ message: 'Synth data not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error loading synth data', error });
    }
});

module.exports = router;
