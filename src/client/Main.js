import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import CreateEvent from './routes/CreateEvent';
import Dashboard from './routes/Dashboard';
import UploadVideo from './routes/UploadVideo';
import SignIn from './routes/SignIn';
import ViewPlaylist from './routes/ViewPlaylist';

// Renders other components
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/sign-in' component={SignIn}/>
      <Route path='/create-event' component={CreateEvent}/>
      <Route path='/upload-video' component={UploadVideo}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/view-playlist' component={ViewPlaylist}/>
    </Switch>
  </main>
);

export default Main;
