import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../UserContext';
import axios from 'axios';
import { CONFIG } from '../../config';

export const AnagramIndex = () => {
    const [anagrams, setAnagrams] = useState([]);
    const anagramRef = useRef();
    const {user} = useContext(UserContext);

    const handleInput = async(e) => {
        try {
            e.preventDefault();

            const searchWord = anagramRef.current.elements.searchword.value;

            if (!searchWord) {
                return null;
            }

            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            }

            const res = await axios.post(CONFIG.ANAGRAM_ENDPOINT, { word: searchWord }, config);

            if(res.data.status === 200) {
                setAnagrams(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form ref={anagramRef} onSubmit={handleInput}>
                <div class="mb-6">
                    <label for="searchword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search for anagram:</label>
                    <input type="text" id="searchword"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required></input>
                    <label for="searchword" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        <div class="pl-2">
                        {anagrams.map((item) => {
                            return (<h1 key={item.id} class="text-red-500">{item.word}</h1>)
                        })}
                        </div>
                    </label>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}