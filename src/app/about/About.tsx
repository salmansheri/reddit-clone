'use client'; 

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { FC } from 'react'

interface AboutProps {
  
}

const About: FC<AboutProps> = ({}) => {
    const { data: pokemons, isLoading, error,  } = useQuery({
        queryKey: ['pokemon'],
        queryFn: async () => {
            const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon")
            return data; 

        }, 
        
         

    }); 

    console.log(pokemons?.results); 

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>something went wrong</div>
    }

    
  return <div>
   {pokemons.results?.map((data: any) => {
    return(
        <div key={data?.name}>
            {data?.name}
        </div>

    )
   })}
  </div>
}

export default About