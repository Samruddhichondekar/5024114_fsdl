const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Create file if not exists
if (!fs.existsSync('notes.json')) {
    fs.writeFileSync('notes.json', '[]');
}

// Read notes
function getNotes(callback) {
    fs.readFile('notes.json', 'utf8', (err, data) => {
        if (err) return callback([]);
        try {
            callback(JSON.parse(data));
        } catch {
            callback([]);
        }
    });
}

// Save notes
function saveNotes(notes, callback) {
    fs.writeFile('notes.json', JSON.stringify(notes, null, 2), (err) => {
        if (err) return callback("Error ❌");
        callback("Saved ✅");
    });
}

// Add note
app.post('/add-note', (req, res) => {
    const text = req.body.text;

    if (!text) {
        return res.send("Enter note!");
    }

    getNotes((notes) => {
        notes.push({
            text: text,
            important: false,
            time: new Date().toLocaleString()
        });

        saveNotes(notes, (msg) => res.send(msg));
    });
});

// Get notes
app.get('/notes', (req, res) => {
    getNotes((notes) => res.json(notes));
});

// Delete note
app.post('/delete-note', (req, res) => {
    const index = req.body.index;

    getNotes((notes) => {
        notes.splice(index, 1);
        saveNotes(notes, () => res.send("Deleted"));
    });
});

// Toggle important
app.post('/toggle-note', (req, res) => {
    const index = req.body.index;

    getNotes((notes) => {
        notes[index].important = !notes[index].important;
        saveNotes(notes, () => res.send("Updated"));
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});