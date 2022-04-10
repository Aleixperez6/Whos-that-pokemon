import "nes.css/css/nes.min.css";
import './App.css';
import { useEffect, useState } from 'react';
import POKE from './assets/poke.png'

function App() {

  const KEY = 'pokeApp'
 

  const [pokemon, setPokemon] = useState({
    id: 0,
    name: '',
    url: ''
  });
  const [bet, setBet] = useState('');
  const [result, setResult] = useState(undefined)
  const [image, setImage] = useState('pixel');   
  const [points, setPoints] = useState(0);
  

    useEffect(() => {
      const id = Math.round(Math.random() * (151 - 1)+1);
      const getApi = (id) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((res) => res.json())
          .then((data)=> {
            setPokemon({
              id: data.id,
              name: data.name,
              url: data.sprites.front_default
            })
          })
      }
      getApi(id)
       
    }, [])

    useEffect(()=>{
      const storedPoints = JSON.parse(localStorage.getItem(KEY));
      if (storedPoints) {
          setPoints(storedPoints);
      }     
  }, [])



  useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(points))
        // localStorage.setItem(KEY, JSON.stringify(mistakes))
  }, [points])
   


  const handleBet = (e) => {
    setBet(e.target.value)
  }

  const handleSet = (e) => {
    e.preventDefault();
    setBet(e);
    if (pokemon.name === bet.toLowerCase()) {
      setResult(true)
      setBet('');
      setPoints((prev) => prev + 1)
      
    } else {
      setResult(false)
      setBet('');
    }
    // setResult('')
  }

  const checkStyles = () => {
    if (image === 'pixel') {
      setImage('')      
    }
  }
  function refreshPage() {
    window.location.reload(false);
  }
  

  return (
    <div className="main">

      <div className="points"><span>Points: {points} </span></div>

      <img width={'350px'} src={POKE} alt="" />
      <img className={image} width={'400px'} src={pokemon.url} alt="" />
  
       
      {result !== undefined ? <h1>{pokemon.name}</h1> : ''}

      <form onSubmit={handleSet}  className='nes-field is-dark' action="">
      
        <input 
        autoComplete='off'
        placeholder='Pokemon name'
        type="text" 
        id="name_field" 
        name='betInput'
        className="nes-input"
        onChange={handleBet}
        value={bet}/>   
        <div className="buttons">
        <button onClick={checkStyles} type="submit" className='nes-btn is-primary'>Send</button>
        {result !== undefined ? <button  onClick={refreshPage} type="button" className="nes-btn is-warning">Play again</button> : ''}
        </div>

      </form>


      <div>     
        {result ? <h1 className="success">Success</h1> : ''}
        {result === false ? <h1 className="error">Error</h1> : ''}
      </div>
    </div>
  );

}

export default App;
