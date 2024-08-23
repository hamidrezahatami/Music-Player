import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import MusicsContext from '../context/MusicsContext';
import LoadingUsers from '../lodaing/loadingUsers';

const RelatedMusic = ({ id }) => {
    const [isLoading, setIsLoading] = useState(true);
    const musicsContext = useContext(MusicsContext);
    const music = musicsContext.song.find(m => m.id === parseInt(id));
    const relatedMusics = musicsContext.song.filter(m => m.singerName === music.singerName && m.id !== music.id);

    const handleSelectRelateMusic = () => {
        if (musicsContext.Playing === true) {
            musicsContext.Playing = false;
        }
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <div className='container'>
            {
                isLoading ? (
                    <LoadingUsers />
                ) : (
                    <div className="row mb-5 mt-5 text-center">
                        <div className="col-12 mb-4">
                            <span className='bg-primary text-light p-3 rounded-2'>Related Music...</span>
                            <hr />
                        </div>
                        {relatedMusics.map(m => (
                            <div key={m.id} className="col-6 col-md-4 col-lg-3 mb-4 text-center p-2">
                                <img
                                    src={m.avatar}
                                    className="img-fluid"
                                    style={{ objectFit: 'cover', borderRadius: "5px" }}
                                    alt="singerPic"
                                />
                                <h6 className='mt-2 text-light fs-6 fs-md-5 fs-lg-4'>{m.name} - {m.singerName}</h6>
                                <Link onClick={handleSelectRelateMusic} to={`/musics/${m.id}`}>
                                    <button className='btn btn-info btn-sm btn-block text-nowrap'>Go To Music</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default RelatedMusic;
