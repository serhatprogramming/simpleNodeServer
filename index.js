const express = require("express");
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  let note = req.body;

  if (note.content) {
    note = {
      ...note,
      important: note.important || false,
      id: generateId(),
    };
    notes = notes.concat(note);
    res.json(note);
  } else {
    res.status(400).json({ error: "missing content" });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const PORT = 3001;

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
