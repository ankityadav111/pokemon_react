import { useEffect, useState } from 'react';
import './index.css';
import { Pokemoncards } from './Pokemoncards';

export const Pokemon = ()=>{

    const [Pokemon , setPokemon] = useState([]);
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(null)

    const [search , setSearch] = useState('')

    
    

    const api = "https://pokeapi.co/api/v2/pokemon?limit=24";

    const fetchPokemon = async() =>{
        try {
            const res = await fetch(api);
            const data = await res.json();
            // console.log(data);

            const detailedpokemon = data.results.map(async(curpokemon)=>{
                
                const res = await fetch(curpokemon.url);
                const data = await res.json();
                return data;        
            })

            const detailedpromise = await Promise.all(detailedpokemon);
               
                
            setPokemon(detailedpromise);

            setLoading(false)
            
        } catch (error) {
            setLoading(false)
            setError(error)
            
        }
    }
    
    useEffect(()=>{
        fetchPokemon()
    }, [])


    const searchData = Pokemon.filter((curpokemon) => 
        curpokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    

    


    if(loading){
        return(
            <div>
                <h1>Loading....</h1>
            </div>
        )
    }
    if(error){
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }

    return (
        <>
            <section className='container'>
                <header>
                    <h1>Lets Catch Pokémon</h1>
                </header>

                <div className='pokemon-search'>
                    <input type="text" placeholder='Search Pokémon' value={search} onChange={(e)=> setSearch(e.target.value)}  />
                </div>

                <div>
                        <ul className='cards'>

                            {
                                // Pokemon.map((curpokemon)=>{
                                searchData.map((curpokemon)=>{
                                    return ( <Pokemoncards key={curpokemon.id} pokemonData={curpokemon} />)
                                })
                            }

                        </ul>
                </div>

            </section>
        </>
    ) 
    
}