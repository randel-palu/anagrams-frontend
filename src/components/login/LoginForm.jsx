import React, { useContext, useRef} from 'react'
import { UserContext } from '../UserContext';
import { Login } from './Login';

export const LoginForm = () => {
    const formRef = useRef();
    const {setUser} = useContext(UserContext);

    const submitHandler = async(e) => {
        e.preventDefault();

        // TODO: some input checks and validation please.
        const details = {
            'email': formRef.current.elements.email.value,
            'password': formRef.current.elements.password.value
        }

        const login = await Login(details);

        if(login.status === true) {
            setUser(login.user);
        }
    };

    return (
        <div>
            <form ref={formRef} onSubmit={submitHandler}>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                    <input type="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="uptime" required></input>
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                    <input type="password" id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="uptime" required></input>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-lg sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}