const format = require('util').format;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Multer = require('multer');
// const helmet = require('helmet');


// Google Cloud Platform project ID
const projectId = 'event-monkey';

// Google Cloud Storage Client
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

// Select Storage Bucket
const bucket = storage.bucket('event-monkey');

// Google Cloud Datastore Client
const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({
  projectId,
});

// Express requisites

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

app.use(express.static('dist'));

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});


// Google Cloud Storage POST request handler

// Process the file upload and upload to Google Cloud Storage.
app.post('/uploadHandler', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format('http://storage.googleapis.com//${bucket.name}/${blob.name}');
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

// Google Cloud Storage List Bucket Files

app.get('/listBucketItems', (req, res) => {
  const bucketName = 'event-monkey';

  storage
    .bucket(bucketName)
    .getFiles()
    .then((results) => {
      const files = results[0];
      console.log('Files:');
      files.forEach((file) => {
        console.log(file.name);
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
});


// Google Cloud Datastore GET request handler

app.get('/sendStore', (req, res) => {
  // The kind for the new entity
  const kind = 'event';
  // The name/ID for the new entity
  const name = 'Product Demonstration';
  // The Cloud Datastore key for the new entity
  const entityKey = datastore.key([kind, name]);

  // Prepares the new entity
  const entity = {
    key: entityKey,
    data: {
      description: 'Event description.',
      latitude: 33.4255,
      longitude: -111.9400,
    },
  };

  // Saves the entity
  datastore
    .save(entity)
    .then(() => {
      console.log(`Saved ${entity.key.name}: ${entity.data.description}`);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
});

// Add an event to datastore

app.post('/addEvent', (req, res) => {
  console.log(req.body);

  // The Cloud Datastore key for the new entity
  const eventKey = datastore.key('event');

  // Prepares the new entity
  const entity = {
    key: eventKey,
    data: req.body
  };

  // Saves the entity
  datastore
    .save(entity)
    .then(() => {
      console.log(`Saved ${entity.key.name}: ${entity.data.description}`);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
});

/**
* listEvents
*  @param req, unused
*  @return a JSON object with events from Google Datastore
*  Lists the 10 most recent events in Google Datastore.
*/
app.get('/listEvents', (req, res) => {
  const query = datastore.createQuery('event').limit(10).order('date', {
    descending: true,
  });
  const eventList = [];
  datastore
    .runQuery(query)
    .then((results) => {
      const events = results[0];
      events.forEach((event) => {
        const date = new Date(event.date);

        eventList.push({
          title: event.title,
          desc: event.desc,
          address: event.address,
          lat: event.lat,
          lon: event.lon,
          date: date.toLocaleDateString('en-US'),
          id: event[datastore.KEY].path[1],
          youtubeURL: event.youtubeURL
        });
      });
      // console.log(eventList);
      res.send(eventList);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
});

/**
* delete
*  @param req, a JSON object with the key of the item to be
*          deleted.
*  @return a string confirming the event was deleted
*  Desc: Deletes an event from Google Datastore
*/
app.post('/delete', (req, res) => {
  const id = parseInt(req.body.id);
  const eventKey = datastore.key(['event', id]);

  datastore
    .delete(eventKey)
    .then((r) => {
      console.log(r);
      res.send(r);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
