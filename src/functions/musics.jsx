import React, { useContext, useEffect, useState } from 'react';
import LoadingUsers from '../lodaing/loadingUsers'
import { Link } from 'react-router-dom';
import MusicsContext from '../context/MusicsContext';

const Musices = () => {
    const musicsContext = useContext(MusicsContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className='d-flex mb-4'>
                <button className='btn btn-primary' onClick={musicsContext.onAdd}>Add Music</button>
            </div>
            <div className='row'>
                {
                    isLoading ? (
                        <LoadingUsers />
                    ) : (
                        musicsContext.song.map((music) => (
                            <div key={music.id} className="col-12 col-sm-6 col-md-4 col-lg-3 text-center p-4">
                                <img src={music.avatar} style={{objectFit: 'cover', width:'100%', height:'300px', borderRadius: "5px" }} alt="" />
                                <h8 className='mt-1 text-light d-block'>{music.name} - {music.singerName}</h8>
                                <div className="row">
                                    <div className="col-6 mt-1">
                                        <button className='btn btn-danger btn-sm' onClick={() => musicsContext.onDelete(music.id)}>Delete Music</button>
                                    </div>
                                    <div className="col-6 mt-1">
                                        <Link to={`/musics/${music.id}`}>
                                            <button className='btn btn-info btn-sm'>Go To Music</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </>
    );
};

export default Musices;
