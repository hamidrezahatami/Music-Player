import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Favorite from './Favorite';
import Musices from './musics';
import Music from './music';
import Navbar from './navbar';
import Home from './Home';
import MusicsContext from '../context/MusicsContext';

document.body.style = 'background : #000'

const App = () => {
  const musicsContext = useContext(MusicsContext)
  const [isPlaying, setIsPlaying] = useState(false);
  const [musics, setMusics] = useState([
    {
      singerName: 'Mehdi Ahmadvand',
      Src: '../audio/bazandeh.mp3',
      avatar: '../assets/mehdi1.jpg',
      name: 'Bazandeh',
      id: 1 ,   } , 
      {
        singerName: 'Mehdi Ahmadvand',
        Src: '../audio/Falsh.mp3',
        avatar: '../assets/mehdi2.jpg',
        name: 'Falsh',
        id: 2,   
      },

      {
        singerName: 'Mehdi Ahmadvand',
        Src: '../audio/Sargijeh.mp3',
        avatar: '../assets/mehdi3.jpg',
        name: 'Sargijeh',
        id: 3,   } , 

        {
          singerName: 'Mehdi Ahmadvand',
          Src: '../audio/Eshtebah.mp3',
          avatar: '../assets/mehdi4.jpg',
          name: 'Eshtebah',
          id: 4,   
        }
  ]);

  useEffect(() => {
    const receiveArray = localStorage.getItem('musicList');
    const musicList = JSON.parse(receiveArray);
    setMusics(musics)
    setMusics(musicList);
  }, []);

  useEffect(() => {
    localStorage.setItem('musicList', JSON.stringify(musics));
  }, [musics]);

  return (
    <div>
      <MusicsContext.Provider
        value={{
          Playing: isPlaying,
          song: musics,
          onAdd: handleAdd,
          onDelete: handleDelete,

        }}>
        <Navbar />
        <Routes>
          <Route path="/favorite" element={<Favorite />} />
          <Route path='/musics/:id' element={<Music />} />
          <Route path="/musics" element={<Musices />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MusicsContext.Provider>
    </div>
  );

  function handleAdd() {
    const newSong = {
      singerName: 'Mehdi Ahmadvand',
      Src:  '../audio/Eshghe-Aval.mp3' ,
      avatar: '../assets/mehdi5.jpg',
      name: 'Eshghe Aval',
      id: musics.length + 1,   
    };
    setMusics([...musics, newSong]);
  }

  function handleDelete(musicId) {
    const newMusics = musics.filter(music => music.id !== musicId);
    setMusics(newMusics);
  }

};

export default App;