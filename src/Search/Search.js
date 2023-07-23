import React from 'react'
import "./Search.css"
import { searchedContext } from '../App/App'
import { useContext } from 'react'


function Search() {

    const { searchedBooks } = useContext(searchedContext);

   
    function randomColor(){
       const letter = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d", "e", "f"]; 
       let generate = "#";
       
       for(let i = 0; i < 6; i++){
           generate += letter[Math.floor(Math.random() * letter.length)]
       } 

        generate += 60; 
       return generate;
    }


    let colorGenerated = randomColor(); 
    console.log(colorGenerated);



  return (
    <div className='searchInside'> 

        {
           searchedBooks.map((book, index) => {
            return <div className='row-img' key={index} style={{background: `linear-gradient(${colorGenerated}, rgba(0, 0, 0, 0))`}}>
              <div className='searced-img'>
              <img src={book.image} alt="searchBooks" />
              </div>
              <div className='searchedCnt'>
              <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p className='description'>{book.description.slice(0, 100)}</p>
                <button className='read-more'>Read More..</button>
              </div> 
            </div>
           })
        }
    </div>
  )
}

export default Search