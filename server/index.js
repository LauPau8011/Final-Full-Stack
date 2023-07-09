/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }),
);

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const questions = await con
      .db(dbName)
      .collection('questions')
      .find()
      .toArray();
    const answers = await con.db(dbName).collection('answers').find().toArray();
    await con.close();

    const questionWithAnswers = questions.map((question) => {
      const filteredAnswers = answers.filter(
        (answer) => String(answer.questionId) === String(question.id),
      );
      return { ...question, answers: filteredAnswers };
    });

    res.send(questionWithAnswers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questions/:id/answers', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('answers')
      .find({ questionId: new ObjectId(req.params.id) })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/questions/:id/answers', async (req, res) => {
  try {
    if (req.sessionStore.isLoggedIn === true) {
      const { text, userName } = req.body;
      const date = new Date();
      const con = await client.connect();
      const data = await con
        .db(dbName)
        .collection('answers')
        .insertOne({
          text,
          date,
          userName,
          questionId: new ObjectId(req.params.id),
        });
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/answers/:id', async (req, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const con = await client.connect();
      const { text } = req.body;
      const date = new Date();
      const newvalues = { $set: { text, date } };
      const data = await con
        .db(dbName)
        .collection('answers')
        .updateOne({ _id: new ObjectId(req.params.id) }, newvalues);
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/answers/:id', async (req, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const con = await client.connect();
      const data = await con
        .db(dbName)
        .collection('answers')
        .deleteOne({ _id: new ObjectId(req.params.id) });
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/answers/:id/like', async (req, res) => {
  try {
    if (req.session.isLoggedIn) {
      const con = await client.connect();
      const data = await con
        .db(dbName)
        .collection('answers')
        .updateOne(
          { _id: new ObjectId(req.params.id) },
          { $inc: { likes: 1 } },
        );
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/answers/:id/dislike', async (req, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const con = await client.connect();
      const data = await con
        .db(dbName)
        .collection('answers')
        .updateOne(
          { _id: new ObjectId(req.params.id) },
          { $inc: { dislikes: 1 } },
        );
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('questions').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/questions', async ({ body }, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const { text, userName } = body;
      const date = new Date();
      const con = await client.connect();
      const data = await con
        .db(dbName)
        .collection('questions')
        .insertOne({ text, date, userName });
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('vartotojai')
      .insertOne({ name, username, password });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const con = await client.connect();
    const query = { username, password };
    const data = await con
      .db(dbName)
      .collection('vartotojai')
      .find(query)
      .toArray();
    await con.close();

    if (data.length === 1) {
      req.session.isLoggedIn = true;
      res.status(200).send(data[0].username);
    } else {
      req.session.isLoggedIn = false;
      res.status(401).send('You need to register');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/questions/:id', async (req, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const con = await client.connect();
      const { text } = req.body;
      const newvalues = { $set: { text } };
      const data = await con
        .db(dbName)
        .collection('questions')
        .updateOne({ _id: new ObjectId(req.params.id) }, newvalues);
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/questions/:id', async (req, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const con = await client.connect();
      const data = await con
        .db(dbName)
        .collection('questions')
        .deleteOne({ _id: new ObjectId(req.params.id) });
      await con.close();
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
