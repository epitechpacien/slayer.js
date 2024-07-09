import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Landing } from './Landing';
import AudioPlayer from './Audio_player';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Landing />
    <AudioPlayer />
  </React.StrictMode>
);

reportWebVitals();

/*start game loop*/
