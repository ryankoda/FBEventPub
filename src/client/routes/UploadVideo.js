/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';


class UploadVideo extends Component {
  render() {
    return (
      <Paper>
        <div>
          <span id="signinButton" className="pre-sign-in">
            <span
              className="g-signin"
              data-callback="signinCallback"
              data-clientid="702182989125-jfn8dmrtm3vo0141bt20651t2u5dho5j.apps.googleusercontent.com"
              data-cookiepolicy="single_host_origin"
              data-scope="https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube"
            />
          </span>
        </div>
        <div className="post-sign-in">
          <div>
            <img id="channel-thumbnail" />
            <span id="channel-name" />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input id="title" type="text" value="Default Title" />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description">Default description</textarea>
          </div>
          <div>
            <label htmlFor="privacy-status">Privacy Status:</label>
            <select id="privacy-status">
              <option>public</option>
              <option>unlisted</option>
              <option>private</option>
            </select>
          </div>

          <div>
            <input type="file" id="file" className="button" accept="video/*" />
            <button id="button">Upload Video</button>
            <div className="during-upload">
              <p><span id="percent-transferred" />% done (<span
                id="bytes-transferred"
              />/<span id="total-bytes" /> bytes)
              </p>
              <progress id="upload-progress" max="1" value="0" />
            </div>

            <div className="post-upload">
              <p>Uploaded video with id <span id="video-id" />. Polling for status...</p>
              <ul id="post-upload-status" />
              <div id="player" />
            </div>
            <p id="disclaimer">By uploading a video, you certify that you own all rights to the content
                                or that you are authorized by the owner to make the content publicly available on
                                YouTube, and that it otherwise complies with the YouTube Terms of Service located at <a
                                  href="http://www.youtube.com/t/terms"
                                  target="_blank"
                                >http://www.youtube.com/t/terms
                                </a>
            </p>
          </div>
        </div>
      </Paper>
    );
  }
}

export default UploadVideo;
