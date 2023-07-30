import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [quote, setQuote] = useState('');

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://catfact.ninja/fact');
      const data = response.data;
      setQuote(data.fact);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  }
  useEffect(() => {
    fetchRandomQuote();
  }, [])

  return (
    <div className='flex flex-col gap-3 items-center p-4 m-2 mb-5'>
      <h1 className='text-black font-semibold text-[20px]'>Fun Facts</h1>
        <blockquote>
          <p className='text-gray-700 font-semibold text-2'>"{quote}"</p>
        </blockquote>
    </div>
  );
};

export default Home;