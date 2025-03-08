import React, { use, useState, useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    typeof: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGM1NGZkN2MxOTEzNDBlZjU0ZGJjN2I3ZjA3NjNjOSIsIm5iZiI6MTczNjk1MjQxMi45ODU5OTk4LCJzdWIiOiI2Nzg3Y2E1Y2I1MGM3MWRiNWM0ZTY5NmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WwhF3doAdurJrUSghlR2I1GDFFp-If62gKtEiK93KII'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=fr`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, []);


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='back' className='back-arrow' onClick={() => { navigate(-2) }} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameborder="0" allowfullscreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}-</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player