# FBEventPub
https://event-monkey.appspot.com/#/
###	Web app that initializes a payload with event info using API’s, stores it into a “serverless” NoSQL database (Google Cloud Datastore), and posts the event to Facebook.
###	Frontend UI written using React (NodeJS) while backend database is in NoSQL.
###	Several public API’s are used to retrieve and upload event data:
- OAuth2
- Facebook Graph
- YouTube Data v3
- Google Maps
###	Google Cloud Functions are used in conjunction with the cloud platform to execute the mentioned API’s when triggered by specific events.
###	The website’s dashboard provides the user with access to the list of events, a link to create new events, and the ability to delete current and past events.
