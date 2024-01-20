import React, { useEffect, useState } from 'react';
import {auth, db}from '../config/firebase';
import {createUserWithEmailAndPassword as create,signInWithEmailAndPassword,signOut}from "firebase/auth";
import { getDocs, collection, addDoc, doc, deleteDoc } from 'firebase/firestore';

function Auth() {
  const[name,setName]=useState("");
  const[password,setPassword]=useState("");

  const [movies,setMovies]=useState([]);
  const collectionn=collection(db,"movies");

  const[newMovietitle,setNewMovietitle]=useState("");
  const[newMovieDate,setnewMovieDate]=useState(0);
  const[isOscar,setIsOscar]=useState(false);


  async function getMovies(){

    try{
      const data=await getDocs(collectionn);
      
      const filteredData=data.docs.map((doc)=>(
        {
          ...doc.data(),
          id:doc.id
        }
      ));

      console.log(filteredData);
      setMovies(filteredData);
  }
    catch(err){
      console.log(err);
    }

  }

  useEffect(()=>{
    
    getMovies();
  }
  ,[]);

  console.log(auth?.currentUser?.email);


  function onClickHandler(e){
    setName(e.target.value);

  }
  

  async function signIn(){
    try{
      signInWithEmailAndPassword(auth, name, password)

    }
    
  
  catch(error) {
    console.log(error);
  };
  }

  async function signIup(){
    try{
      await create(auth,name,password);
    }
    catch(err){
      console.log(err);

    }
  }
    async function signOuut(){
      try{
        console.log(auth?.currentUser?.email);
        await signOut(auth);
        console.log(auth?.currentUser?.email);

      }
      catch(err){
        console.log(err);
  
      }
    



  }
  async function submitt(){
    try{
      console.log(newMovietitle);
      await addDoc(
        collectionn,{=
          name:newMovietitle,
          oscar:isOscar,
          release:newMovieDate,
          userId:auth?.currentUser?.uid
        }
      )
      getMovies();
    }
    catch(err){

    }
  }

  async function onDelete(id){
    try{
      const movieDoc=doc(db,"movies",id);
    await deleteDoc(movieDoc);
    console.log("err");
    getMovies();
    }
    catch(err){
      console.log(err);
    }
    
  }
  return (
    <div>
      <input placeholder='email' onChange={(e)=>onClickHandler(e) } value={name}></input><br></br>
      <input placeholder='password' onChange={(e)=>setPassword(e.target.value)}></input><br></br>
      <button onClick={signIn}>signin</button><br></br>
      <button onClick={signIup}>signup</button><br></br>

      <button onClick={signOuut}>signout</button><br></br>

      <div>
      <input placeholder='name' onChange={(e)=>setNewMovietitle(e.target.value) } ></input><br></br>
      <input placeholder='date' onChange={(e)=>setnewMovieDate(Number(e.target.value)) } type='number'></input><br></br>
      <input  type='checkbox' checked={isOscar} onChange={(e)=>setIsOscar(e.target.checked)}></input><br></br>

      <button onClick={submitt}>submit</button><br></br>
      </div>






      <div>
        <ul>
       {
        movies.map((movie)=>(
        <div>
        <li key={movie.id}>{movie.name}</li>
        <button onClick={()=>{onDelete(movie.id)}}>delete</button>
        </div>
        ))
        }
        </ul>
      </div>


    </div>
  );
}

export default Auth;
