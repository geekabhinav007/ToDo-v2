import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";


function Dashboard() {


    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");






    // Logout Implementation

    const handleSignOut = () => {
        signOut(auth).
            then(
                navigate('/')
            ).catch(err => {
                alert(err.message)
            })
    }

    // handle protection of unauthorised access of auth route

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // read
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    const data = snapshot.val();
                    if (data !== null) {
                        const newTodos = [];
                        Object.values(data).forEach((todo) => {
                            newTodos.push(todo);
                        });
                        setTodos(newTodos);
                    }
                });
            } else if (!user) {
                navigate("/");
            }
        });
    }, [navigate]);


    // add
    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        });

        setTodo("");
    };

    // update
    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    };

    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd
        });

        setTodo("");
        setIsEdit(false);
    };

    // delete
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };



    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen">
            <div class=" flex justify-center">
                <input
                    class=" m-5 shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker"
                    type="text"
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>


            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Welcome
                </a>
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-auto max-h-96">                    <div class="mb-4">

                    <div class="flex mt-4">
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                            type="text"
                            placeholder="Add todo..."
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                        />
                        {isEdit ? (
                            <button onClick={handleEditConfirm} class=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex-no-shrink p-2 border-2  ">Update</button>
                        ) : (
                            <button onClick={writeToDatabase} class=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex-no-shrink p-2 border-2  ">Add</button>
                        )}
                    </div>
                </div>
                    <div>
                        {todos.filter((todo) => todo.todo.toLowerCase().includes(searchTerm.toLowerCase())).map((todo) => (
                            <div class="flex mb-4 items-center">
                                <p class="w-full text-grey-darkest">{todo.todo}</p>
                                <div class="flex flex-row flex-nowrap">
                                    <button onClick={() => handleUpdate(todo)} class=" text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex-no-shrink p-2 border-2 ">Edit</button>
                                    <button onClick={() => handleDelete(todo.uidd)} class=" text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex-no-shrink p-2 border-2 ">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>


                    <button onClick={handleSignOut} class=" mt-5 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex-no-shrink p-2 border-2 cursor-pointer">Logout</button>
                </div>
            </div>
        </section>
    )



}

export default Dashboard