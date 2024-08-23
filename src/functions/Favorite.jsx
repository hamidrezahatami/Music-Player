import { useContext, useRef, useState, useEffect } from "react";
import MusicsContext from "../context/MusicsContext";
import { Link } from "react-router-dom";
import LoadingUsers from '../lodaing/loadingUsers'

const Favorite = () => {
    const musicsContext = useContext(MusicsContext);
    const inputRef = useRef(null);
    const [favoriteMusics, setFavoriteMusics] = useState([]);

    useEffect(() => {
        const filteredMusics = musicsContext.song.filter(m =>
            m.singerName.toLowerCase().includes(inputRef.current.value.toLowerCase())
        );
        setFavoriteMusics(filteredMusics);
    }, [musicsContext.song]);

    const handleSearchMusic = () => {
        const filteredMusics = musicsContext.song.filter(m =>
            m.singerName.toLowerCase().includes(inputRef.current.value.toLowerCase())
        );
        setFavoriteMusics(filteredMusics);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredMusics = musicsContext.song.filter(m =>
            m.singerName.toLowerCase().includes(inputRef.current.value.toLowerCase())
        );
        setFavoriteMusics(filteredMusics);
    }

    return (
        <div className="container">
            <form className="mb-4">
                <div className="row align-items-center">
                    <label 
                        className="text-light col-12 col-sm-4 col-md-3 col-form-label col-form-label-md mb-2 mb-sm-0" 
                        htmlFor="fave">
                        Enter Your Favorite Singer
                    </label>
                    <div className="col-12 col-sm-8 col-md-9">
                        <input 
                            ref={inputRef} 
                            className="form-control form-control-sm" 
                            id="fave" 
                            type="text" 
                            placeholder='Search By SingerName' 
                            onInput={handleSearchMusic} 
                        />
                    </div>
                </div>
            </form>
            <ol className="list-unstyled">
                {favoriteMusics.map((music, index) => (
                    <li key={index} className="d-flex align-items-center text-light mb-2">
                        <img 
                            style={{
                                borderRadius: '50%', 
                                width: '30px', 
                                height: '30px',
                                marginRight: '10px'
                            }} 
                            src={music.avatar} 
                            alt="avatar" 
                        />
                        <span className="me-2">{music.singerName} - {music.name}</span>
                        <Link className="btn btn-link p-0 text-light" to={`/musics/${music.id}`}>
                            Go To Music
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Favorite;
