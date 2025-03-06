import TextField from "../../components/atoms/text-field/TextField.tsx";
import { useEffect, useState, KeyboardEvent, useContext } from "react";
import validator from "validator";
import  { useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { AppDispatch } from "../../redux/store.tsx";
import { Token } from "../../types/interfaces/Token.ts";
import { server } from "../../utils/config.tsx";
import { destroyAuth, setLoginAuth } from "../../redux/Slices/userSlice.tsx";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router";
import { UserType } from "../../types/interfaces/UserType.ts";
import { UserStateType } from "../../vite-env";
import { ToastContext } from "../../context/toast-context.tsx";
import useLocalStorage from "../../hooks/useLocalStorage.tsx";
import Logo from "../../components/atoms/logo/Logo.tsx";

export default function Login(){

    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated} = useSelector((state:{ user:UserStateType})=>state.user);
    const { success, error } = useContext( ToastContext);
    const navigate = useNavigate();
    const [ value, setValue] = useLocalStorage("docs-sphere-refresh-token", "");

    const [ email, setEmail] = useState<string>("test419@gmail.com"); 
    const [ emailErrors, setEmailErrors] = useState<Array<string>>([]);
    const [ password, setPassword] = useState<string>("11111111"); 
    const [ passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
    const [ isLoading, setIsLoading] = useState<boolean>(false);


    const inputValidator = ()=>{

        let isValid = true;

        if(!validator.isEmail(email)){
            isValid = false;
            setEmailErrors(["Must enter a valid email"]);
        }

        if(validator.isEmpty(password)){
            isValid = false;
            setPasswordErrors(["Must enter a password"]);
        }

        return isValid;
    }

    const handleLoginUser = async ()=>{

        if(!inputValidator()){
            return;
        }

        try{

            setIsLoading(true);
            const { data} = await axios.post<Token>(`${server}/auth/login`, { email, password}, {  headers:{ "Content-Type":"application/json"}});
                
                dispatch( setLoginAuth( data));

                //set refreshToken in localStorage
                setValue(data.authResponse.refreshToken); 

                setIsLoading(false);
                success("Successfully logged in!");
                navigate("/document/create");



                const decodedData:UserType = jwtDecode(data.authResponse.accessToken);

                // setTimeout for expiration of accessToken and refresh data
                 const msExpiration = Math.abs( new Date().getTime() - new Date( (decodedData?.exp)*1000 ).getTime() )     // Multiply by 1000 to convert seconds to milliseconds
               
                 //after expiration of access Token , user logout automatically
                 setTimeout(()=>{
                    dispatch( destroyAuth());
                 }, msExpiration);
                

        }
        catch(err:any ){

            
            setIsLoading(false);

            if("AxiosError"===err.name){

                //network error
                if(err.message==="Network Error"){
                    error("Network Error");
                    return;
                }


                // empty email, password
                const errors = err?.response?.data?.errors ;
                const emailFieldErrors = errors
                                      .filter((error:any)=>error.path==="email")
                                      .map((error:any)=>error.msg);
                const passwordFieldErrors = errors
                                          .filter((error:any)=>error.path==="password")
                                          .map((error:any)=>error.msg);
                                          
                if(emailFieldErrors.length>0){ setEmailErrors(emailFieldErrors);};
                if(passwordFieldErrors>0){ setPasswordErrors(passwordFieldErrors)};


                //not found
                if( emailFieldErrors.length===0 && passwordFieldErrors.length===0 && err?.response?.data?.errors[0].msg=== "Your email or password is incorrect"){
                    error("Your email or password is incorrect");
                    return;
                }

                if( emailFieldErrors.length===0 && passwordFieldErrors.length===0){
                    error("An Unknown error has occured, Please Try Again");
                    return;
                }



            }
            else{
                error("An Unknown error has occured, Please Try Again");
            }
            
        }
    
       
    }

    const handleInputEmail = (value:string)=>{
        setEmailErrors([]);
        setEmail(value);
    }

    const handleInputPassword = (value:string)=>{
        setPasswordErrors([]);
        setPassword(value);
    }

    const handleKeyDown = (e:KeyboardEvent<HTMLDivElement>)=>{
    
            if(e.code === "Enter"){
                handleLoginUser();
            }
            
        }

    useEffect(()=>{

        if(isAuthenticated){
            navigate("/document/all/create/");
        }
       
    },[ isAuthenticated]);


    return(
        <>
        <div onKeyDown={handleKeyDown} className="w-screen  h-[100vh] lg:h-[100vw] flex flex-col justify-start items-center bg-gray-100">
            <div className="w-5/6 sm:w-[480px] mt-20 bg-white shadow-md rounded p-4">
                <div className="flex justify-center p-2">
                    <Logo marginLeft={0} width={40}/>
                </div>
                <div className="px-5">
                    <h1 className="text-center text-3xl font-semibold tracking-tighter">Sign in</h1>
                    <p className="text-center font-medium">to continue to Docs</p>
                    <div className="flex flex-col items-start mt-2">
                        
                        <TextField 
                        value={email}
                        label={"Email"}
                        placeholder={"Email"}
                        type={"text"}
                        errors={emailErrors}
                        onInput={handleInputEmail}
                        />
                        <Link to="/register" className="text-sm font-semibold text-blue-400 hover:underline my-2">
                            Need an account? - router to register
                        </Link>

                        <TextField
                        value={password}
                        label={"Password"}
                        placeholder={"password"}
                        type={"password"}
                        errors={passwordErrors}
                        onInput={handleInputPassword}
                        />

                        <Link to={"/user/email"}>
                          <button className="text-sm font-semibold text-blue-400 hover:underline m-2">
                              Forgot Password?
                          </button>
                        </Link>

                        <button 
                            onClick={handleLoginUser}
                            className={`${isLoading ? "bg-gray-500" : "bg-blue-700"} hover:bg-blue-900  transition duration-300 text-white rounded w-full py-1 tracking-wide shadow-lg mt-4`}
                            disabled={isLoading}
                        >
                            <span className={`${isLoading && "opacity-0"}`}>Login</span>   
                        </button>

                    </div>
                </div>
            </div>

            <div className="space-x-4 space-y-3">
                <button className="font-semibold text-blue-400 hover:underline">
                    Terms
                </button>
                <button className="font-semibold text-blue-400 hover:underline">
                    Privacy Policy
                </button>
            </div>
    
        </div>
        </>
    )
}





















































// export default function Login(){

//     return(
//         <>
//     {/*         
//         <div className="bg-purple-600 rounded w-4/6 h-96 relative">
//             <div className="bg-green-500 rounded h-32 absolute inset-x-10 top-16 hover:h-16 hover:inset-x-20"></div>
//         </div>
//         */}


//         {/*
//             <div className="flex flew-row bg-purple-600 rounded w-4/6 h-96 flex-wrap hover:rounded-lg border-red-500 hover:border-8 ">
//             <div className="bg-red-500 basis-1/4 w-10 rounded-3xl hover:bg-blue-500">01</div>
//             <div className="bg-blue-500 basis-1/4 w-16 rounded-3xl hover:bg-green-500">02</div>
//             <div className="bg-green-500 basis-1/4 w-20 rounded-3xl hover:bg-gray-500">03</div>
//             <div className="bg-yellow-400 basis-1/4 w-10 rounded-3xl hover:bg-black">04</div>
//             <div className="bg-pink-400 basis-1/4 w-16 grow rounded-3xl hover:bg-green-400">05</div>
//             <div className="bg-gray-900 basis-1/4 shrink-1 w-20 rounded-3xl hover:bg-blue-900">06</div>
//         </div>
//         */}


//         {/*<>
//         <div className="grid grid-cols-6 gap-4 ">
//             <div className="bg-red-500">01</div>
//             <div className="bg-blue-500 ">02</div>
//             <div className="bg-green-500 ">03</div>
//             <div className="bg-yellow-400 ">04</div>
//             <div className="bg-pink-400 ">05</div> 
//             <div className="bg-gray-900 ">06</div>
//             <div className="bg-orange-500">07</div>

//             <div className="grid grid-cols-6 gap-4">
//                 <div className="bg-gray-500 ">08</div>
//                 <div className="bg-red-700 ">09</div>
//                 <div className="bg-blue-900 ">10</div>
//                 <div className="bg-yellow-800 ">11</div> 
//             </div>

//             <div className="bg-gray-500 ">12</div>
//             <div className="bg-pink-600 ">13</div> 
//             <div className="bg-gray-800 ">14</div>
//             <div className="bg-orange-600">15</div>

//             <div className="grid col-span-3 grid-cols-subgrid gap-4 border-4 ">
//                 <div className="bg-gray-500 ">16</div>
//                 <div className="bg-red-700 ">17</div>
//                 <div className="bg-blue-900 ">18</div>
//                 <div className="bg-yellow-800 ">19</div> 
//             </div>

//             <div className="bg-yellow-700 ">20</div>
//             <div className="bg-green-700">21</div>

//         </div> 
//         </> 
        
//         */}


//         {/* 
//         <div className="grid grid-cols-6 gap-4 ">
//             <div className="bg-red-500 ">01</div>
//             <div className="bg-blue-500 ">02</div>
//             <div className="bg-green-500 col-span-3">03</div>
//             <div className="bg-yellow-400 ">04</div>
//             <div className="bg-pink-400 ">05</div> 
//             <div className="bg-gray-900 ">06</div>
//             <div className="bg-orange-500 col-span-2">07</div>
//         </div> 
//         */}


//         {/* <div className="grid grid-cols-6 gap-4 ">
//             <div className="bg-red-500 col-start-2 col-end-6">01</div>
//             <div className="bg-blue-500 ">02</div>
//             <div className="bg-green-500 col-span-3 col-start-2">03</div>
//             <div className="bg-yellow-400 ">04</div>
//             <div className="bg-pink-400 col-end-4">05</div> 
//             <div className="bg-gray-900 ">06</div>
//             <div className="bg-orange-500 col-start-1 col-end-3">07</div>
//         </div> */}

//         {/* <>
//         <div className="grid grid-flow-col grid-rows-6 gap-4 ">
//             <div className="bg-red-500">01</div>
//             <div className="bg-blue-500 ">02</div>
//             <div className="bg-green-500 ">03</div>
//             <div className="bg-yellow-400 ">04</div>
//             <div className="bg-pink-400 ">05</div> 
//             <div className="bg-gray-900 ">06</div>
//             <div className="bg-orange-500">07</div>

//             <div className="grid grid-cols-6 gap-4 border-4  border-red-500">
//                 <div className="bg-gray-500 ">08</div>
//                 <div className="bg-red-700 ">09</div>
//                 <div className="bg-blue-900 ">10</div>
//                 <div className="bg-yellow-800 ">11</div> 
//             </div>

//             <div className="bg-gray-500 ">12</div>
//             <div className="bg-pink-600 ">13</div> 
//             <div className="bg-gray-800 ">14</div>
//             <div className="bg-orange-600">15</div>

//             <div className="grid row-span-3 grid-rows-subgrid gap-4 border-4  border-red-500">
//                 <div className="bg-gray-500 ">16</div>
//                 <div className="bg-red-700 ">17</div>
//                 <div className="bg-blue-900 ">18</div>
//                 <div className="bg-yellow-800 ">19</div> 
//             </div>

//             <div className="bg-yellow-700 ">20</div>
//             <div className="bg-green-700">21</div>

//         </div> 
//         </>  
//     */}

//     {/* 
//         <div className="flex justify-between border-red-400 border-2">
//             <div className="bg-red-500 ">01</div>
//             <div className="bg-blue-500 ">02</div>
//             <div className="bg-green-500 ">03</div>
//             <div className="bg-yellow-400 ">04</div>
//             <div className="bg-pink-400 ">05</div> 
//             <div className="bg-gray-900 ">06</div>
//             <div className="bg-orange-500">07</div>
//         </div>
//         <div className="grid grid-cols-3 justify-items-end border-2 border-green-400">
//             <div className="bg-red-500 ">01</div>
//             <div className="bg-blue-500 ">02</div>
//             <div className="bg-green-500 ">03</div>
//             <div className="bg-yellow-400 justify-self-center">04</div>
//             <div className="bg-pink-400 ">05</div> 
//             <div className="bg-gray-900 ">06</div>
//             <div className="bg-orange-500">07</div>
//             <div className="bg-pink-400 justify-self-start ">08</div> 
//             <div className="bg-gray-900 ">09</div>
//             <div className="bg-orange-500">10</div>
//             <div className="bg-pink-400 ">11</div> 
//             <div className="bg-gray-900 ">12</div>
//             <div className="bg-orange-500 justify-self-center">13</div>
//         </div> */}

//         {/* 
//         <div className="grid h-72 grid-cols-2 place-content-center gap-4 border-2 border-green-400">
//             <div className="bg-red-500 w-10 h-10">01</div>
//             <div className="bg-blue-500  w-10 h-10">02</div>
//             <div className="bg-green-500  w-10 h-10">03</div>
//             <div className="bg-yellow-400  w-10 h-10">04</div>
//         </div> */}

// {/* 
//         <div className="flex justify-between items-start  h-40 px-40 border-4 m-20 ">
//             <div className="bg-red-500 ">01</div>
//             <div className="bg-blue-500">02</div>
//             <div className="bg-green-500 ">03</div>
//             <div className="bg-yellow-400">04</div>
//         </div> */}
     
//         {/* 
//         <div>
//             <p className="tracking-widest font-bold">i am ironman</p>
//             <p className="tracking-[8px] font-thin">i am loki, and i am burning with glorious purpose</p>
//             <p className="leading-10">i am thor from asgard </p>
//             <p className="leading-[10] text-red-400">i can do this all day</p>


//             <p className="text-start border-4 text-red-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est vitae harum necessitatibus atque molestias deserunt cum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi sed consequatur. Temporibus tempore vero exercitationem praesentium hic, similique officiis a ut quam soluta nihil, sapiente laborum corporis rerum dolorem!
//             Cupiditate nulla accusantium iure eius beatae consequuntur, perferendis commodi provident sapiente! Sint quidem minima cupiditate porro quod minus sit officiis optio dignissimos necessitatibus, maxime cumque tempore asperiores eius pariatur beatae?
//             </p>
//             <p className="text-end border-4 text-blue-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est vitae harum necessitatibus atque molestias deserunt cum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi sed consequatur. Temporibus tempore vero exercitationem praesentium hic, similique officiis a ut quam soluta nihil, sapiente laborum corporis rerum dolorem!
//             Cupiditate nulla accusantium iure eius beatae consequuntur, perferendis commodi provident sapiente! Sint quidem minima cupiditate porro quod minus sit officiis optio dignissimos necessitatibus, maxime cumque tempore asperiores eius pariatur beatae?
//             </p>
//             <p className="text-center border-4 text-green-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est vitae harum necessitatibus atque molestias deserunt cum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi sed consequatur. Temporibus tempore vero exercitationem praesentium hic, similique officiis a ut quam soluta nihil, sapiente laborum corporis rerum dolorem!
//             Cupiditate nulla accusantium iure eius beatae consequuntur, perferendis commodi provident sapiente! Sint quidem minima cupiditate porro quod minus sit officiis optio dignissimos necessitatibus, maxime cumque tempore asperiores eius pariatur beatae?
//             </p>
//             <p className="text-left border-4 text-yellow-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est vitae harum necessitatibus atque molestias deserunt cum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi sed consequatur. Temporibus tempore vero exercitationem praesentium hic, similique officiis a ut quam soluta nihil, sapiente laborum corporis rerum dolorem!
//             Cupiditate nulla accusantium iure eius beatae consequuntur, perferendis commodi provident sapiente! Sint quidem minima cupiditate porro quod minus sit officiis optio dignissimos necessitatibus, maxime cumque tempore asperiores eius pariatur beatae?
//             </p>
//             <p className="text-right border-4 text-pink-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est vitae harum necessitatibus atque molestias deserunt cum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi sed consequatur. Temporibus tempore vero exercitationem praesentium hic, similique officiis a ut quam soluta nihil, sapiente laborum corporis rerum dolorem!
//             Cupiditate nulla accusantium iure eius beatae consequuntur, perferendis commodi provident sapiente! Sint quidem minima cupiditate porro quod minus sit officiis optio dignissimos necessitatibus, maxime cumque tempore asperiores eius pariatur beatae?
//             </p>
//             <p className="text-justify border-4 text-orange-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est vitae harum necessitatibus atque molestias deserunt cum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi sed consequatur. Temporibus tempore vero exercitationem praesentium hic, similique officiis a ut quam soluta nihil, sapiente laborum corporis rerum dolorem!
//             Cupiditate nulla accusantium iure eius beatae consequuntur, perferendis commodi provident sapiente! Sint quidem minima cupiditate porro quod minus sit officiis optio dignissimos necessitatibus, maxime cumque tempore asperiores eius pariatur beatae?
//             </p>


//             <p className="text-start border-4 text-red-500 underline">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est</p>
//             <p className="text-end border-4 text-blue-500 overline">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
//             <p className="text-center border-4 text-green-500 line-through">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est vitae harum necessitatibus atque molestias deserunt cum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi sed consequatur. Temporibus tempore vero exercitationem praesentium hic, similiqu</p>
//             <p className="text-left border-4 text-yellow-500 no-underline">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure minima libero, neque cumque quo reiciendis facilis placeat animi vel inventore ullam est vitae harum necessitatibus atque molestias deserunt cum quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi sed consequatur. Temporibus tempore vero exercitationem praesentium hic, similique officiis a ut quam soluta nihil </p>


//         </div>
//         */}
        
        
//         {/*  
//         <div>
//             <img src="/images/jack-white-o8i42y9SYDk-unsplash.jpg" >
//             </img>
//             <div className="bg-[url(/images/jack-white-o8i42y9SYDk-unsplash.jpg)] bg-fixed text-green-900 ">
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             </div>
//         </div>
//         */}

//         {/* 
//         <div className="bg-[url(/images/jack-white-o8i42y9SYDk-unsplash.jpg)] border-4 border-red-900 bg-clip-text p-3">
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//             <h1>i am ironman</h1>
//         </div> 
//         */}

// {/*       
// <div className="bg-[url(/images/jack-white-o8i42y9SYDk-unsplash.jpg)] h-[200px] blur"></div>
// <div className="bg-[url(/images/jack-white-o8i42y9SYDk-unsplash.jpg)] h-[200px] brightness-200"></div>
// <div className="bg-[url(/images/jack-white-o8i42y9SYDk-unsplash.jpg)] h-[200px] backdrop-invert-65"></div>
// <div className="bg-[url(/images/jack-white-o8i42y9SYDk-unsplash.jpg)] h-[200px]  backdrop-saturate-125"></div>


// <div className="flex justify-center -space-x-20">
//   <div className="bg-yellow-500 mix-blend-multiply w-40 h-40 rounded-full blur"></div>
//   <div className="bg-green-500 mix-blend-multiply w-40 h-40 rounded-full brightness-200"></div>
// </div>


//          */}

//          <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-800 transition delay-300 hover:scale-120">i am button</button>




//         </>
    
//     )
// }
