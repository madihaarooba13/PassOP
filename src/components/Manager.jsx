
import React from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [editIndex, seteditIndex] = useState(null)
    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)


    }
    useEffect(() => {
        getPassword()

    }, [passwordArray])

    const editPassword = (id) => {
        console.log("Editing password with id ", id)
        const index = passwordArray.findIndex(item => item.id === id)
        const itemedit = passwordArray[index]
        console.log(itemedit)
        seteditIndex(index)
        setform(itemedit)
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {

            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(newArray))
            // console.log(newArray)
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })


            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        console.log(id)



    }

    const copyText = (text) => {
        // alert("Copied to clipboard "+text)
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }




    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            let newArray = [...passwordArray];

            if (editIndex !== null) {
                const oldId = passwordArray[editIndex].id;

                // ✅ Update local array in same position
                newArray[editIndex] = { ...form, id: oldId };
                setpasswordArray(newArray);

                // ✅ Update in Mongo (no delete + reinsert)
                await fetch("http://localhost:3000/update", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, id: oldId }),
                });

                toast.info("Password updated!", { autoClose: 800 });
                seteditIndex(null);
            }
            else {
                // ✅ New password case
                const newPassword = { ...form, id: uuidv4() };
                newArray.push(newPassword);
                setpasswordArray(newArray);

                await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPassword),
                });

                toast.success("Password saved!", { autoClose: 800 });
            }

            setform({ site: "", username: "", password: "" });
        }
        else {
            toast.error("All fields must be at least 3 characters long!", { autoClose: 1500 });
        }
    };




    const showPassword = () => {
        // passwordref.current.type="text"
        // alert("show the password")
        if (ref.current.src.includes("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9809ku1l9OC6QM7kT2UimZhtywkCrB_0aQ&s")) {
            passwordref.current.type = "password"
            ref.current.src = "https://cdn-icons-png.flaticon.com/512/159/159078.png"

        }
        else {
            passwordref.current.type = "text"
            ref.current.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9809ku1l9OC6QM7kT2UimZhtywkCrB_0aQ&s"

        }

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-full w-full rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div> */}

            <div className=" w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-20 py-17 sm:py-20 md:py-23 min-h-[88.2vh] overflow-x-hidden">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-6 text-black gap-8 items-center ">
                    <input autoComplete='off' value={form.site} onChange={handleChange} placeholder='Enter website URL' className='bg-white rounded-full border border-green-500 w-10/12 md:w-10/12 lg:w-11/12 xl:w-full p-3 py-2 ' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row gap-8 w-10/12 md:w-10/12 lg:w-11/12 xl:w-full justify-between">
                        <input autoComplete='off' onChange={handleChange} value={form.username} placeholder='Enter Username' className='bg-white rounded-full border border-green-500 w-full p-3 py-2 ' type="text" name="username" id="username" />

                        <div className="flex items-center w-full md:w-[48%] relative ">

                            <input autoComplete='off' onChange={handleChange} value={form.password} placeholder='Enter Password' className='bg-white rounded-full border border-green-500 w-full p-3 py-2 pr-10' ref={passwordref} type="password" name="password" id="password" />
                            <span className='absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer' onClick={showPassword} >
                                <img ref={ref} className='p-1 items-center' width={35} src="https://cdn-icons-png.flaticon.com/512/159/159078.png" alt="eye" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 
             cursor-pointer rounded-full px-8 py-2 w-fit border border-green-900 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:shadow-lg active:scale-95 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="min-w-full table-auto border-collapse text-sm sm:text-base">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>

                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span onClick={() => editPassword(item.id)} className='edit cursor-pointer mx-1' >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span onClick={() => deletePassword(item.id)} className=' delete cursor-pointer mx-1'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>}


                </div>

            </div>
        </>
    )
}

export default Manager


