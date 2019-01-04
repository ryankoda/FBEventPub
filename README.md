# FBEventPub
###	Web app that initializes a payload with event info using API’s, stores it into a “serverless” NoSQL database (Google Cloud Datastore), and posts the event to Facebook.
###	Frontend UI written using React (NodeJS) while backend database is in NoSQL.
###	Several public API’s are used to retrieve and upload event data such as OAuth2 for Facebook/Google login, Google Maps for location, YouTube Data v3 for an optional promo video(s), and Facebook Graph API for posting events with the previously mentioned data attached.
###	Google Cloud Functions are used in conjunction with the cloud platform to execute the mentioned API’s when triggered by specific events.
###	The website’s dashboard provides the user with access to the list of events, a link to create new events, and the ability to delete current and past events.
