import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import YoutubePlaylist from 'react-youtube-playlist';
import 'bootstrap/dist/css/bootstrap.min.css';
class ViewPlaylist extends Component {
    render() {
        return (
            <div>
                <Paper>
                    <YoutubePlaylist
                        width={'50%'}
                        height={'50%'}
                        api_key='AIzaSyAXkymR5RaCURjH8YCU3PAwL-DIYRUilKY'
                        playlist_id='PLQ2cPWitDZvNiuTkzSHwg-oR0BsRc0XJU'
                    //show_thumbnails
                    />
                </Paper>
            </div>
        );
    }
}

export default ViewPlaylist;