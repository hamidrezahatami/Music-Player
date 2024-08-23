import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import MusicsContext from '../context/MusicsContext'
import LoadingUsers from '../lodaing/loadingUsers'
import { useParams } from 'react-router-dom'
import MusicPlayer from './musicPlayer'
import RelatedMusic from './relatedMusic'


const Music = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const musicsContext = useContext(MusicsContext);
  const music = musicsContext.song.find(m => m.id === parseInt(id))
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className='row'>
      {
        isLoading ? (
          <LoadingUsers />
        ) : (
          (
            <div>
              <div className='row'>
                  <MusicPlayer stateFave={music.stateFave} id={music.id} music={music} musicSrc={music.Src} musicName={music.name} singerName={music.singerName} avatar={music.avatar} />
                  <RelatedMusic id={id} music={music}/>
                </div>
            </div>

  )
        )
      }
    </div >
  )
}

export default Music;