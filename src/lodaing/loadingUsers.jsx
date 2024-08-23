import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css' ;
import { useContext } from 'react';
import MusicsContext from '../context/MusicsContext';
const LoadingUsers = () => {
    const musicsContext = useContext(MusicsContext)
    return Array(musicsContext.song.length).fill({}).map(() => {
        return (
            <div className="col-3 text-center p-5">
             <Skeleton className='mb-4' squre={true} height={200} width={200}/>
             <Skeleton className='mb-2' height={30} count={3}/>
            </div>
        )
    })
}

export default LoadingUsers ;