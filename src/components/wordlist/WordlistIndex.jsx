import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { CONFIG } from '../../config';

export const WordlistIndex = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [wordList, setWordList] = useState([]);
    const urlInputRef = useRef();
    const {user} = useContext(UserContext);

    useEffect(()=> {
        if(!user.token){
            return;
        }

        const config = {
            // TODO: don't use hardcoded token please :)
            headers: { Authorization: `Bearer ${user.token}` },
            params: { page: currentPage }
        }

        const getWordList = async() => {
            const res = await axios.get(CONFIG.WORDLIST_ENDPOINT, config);
            if (res.status === 200) {
                setWordList(res.data);
            }
        };

        getWordList();
    },[currentPage]);

    const paginationClick = ((url)=> {
        if(!url){
            return;
        }

        const requestedPage = (url.split('=')).pop();
        setCurrentPage(requestedPage);
    });

    const handleUrlInput = async(e) => {
        e.preventDefault();

        const url = urlInputRef.current.elements.url.value;

        const config = {
            headers: { Authorization: `Bearer ${user.token}` },
        }

        try {
            const res = await axios.post(CONFIG.WORDLIST_ENDPOINT, {"url": url}, config);

            if(res.status === 200){
                setCurrentPage(parseInt(res.current_page));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            { user.username ? user.username : '' }
            <form ref={urlInputRef} onSubmit={handleUrlInput}>
                <div class="mb-6">
                    <label for="url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">url for file import:</label>
                    <input type="text" id="url"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required defaultValue='http://www.eki.ee/tarkvara/wordlist/lemmad2013.txt'></input>
                    <label for="url" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    </label>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{wordList.total ? wordList.total : 0} total words</h2>
            <ul class="space-y-0 max-w-md list-none list-inside text-gray-500 dark:text-gray-400">
                {Array.isArray(wordList.data) &&
                    wordList.data.map((item, index)=> (
                        <li key={index}>{item.id}. {item.word}</li>
                ))}
            </ul>
            <div class="mt-3">
                <nav aria-label="Page navigation example">
                <ul class="inline-flex items-center -space-x-px">
                    { wordList.prev_page_url
                        && <button type="button" onClick={() => paginationClick(wordList.prev_page_url)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Prev.</button>
                    }
                    { wordList.next_page_url
                        && <button type="button" onClick={() => paginationClick(wordList.next_page_url)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
                    }
                </ul>
                </nav>
            </div>
        </div>
    )
}