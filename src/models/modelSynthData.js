const mongoose = require('mongoose');

// Schema für Synthesizer-Muster
// Schema für Punkte ohne _id
const pointSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    color: String
}, { _id: false });

// Schema für Synthesizer-Muster
const synthDataSchema = new mongoose.Schema({
    name: String,
    points: [pointSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


const SynthData = mongoose.model('SynthData', synthDataSchema);

module.exports = SynthData;