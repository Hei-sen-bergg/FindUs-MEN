import React, { useContext } from 'react'
import './Home.scss'
import { AuthContext } from '../../context/AuthContext'
import SearchBar from '../../components/SearchBar/SearchBar'



const Home = () => {
  const {currentUser} = useContext(AuthContext)

  console.log(currentUser);

  return (
 <div>
    <div className='homePage'>
      <div className="imgContainer"><img src="bg.png" alt="" /></div>
      <div className="textContainer"><h1 className='title'>And finally you found us...</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Distinctio aut nam, et possimus architecto consequuntur, 
        facere, deleniti ducimus tempore praesentium consequatur? 
        Blanditiis incidunt omnis autem vel doloribus. Corrupti, 
        provident consequatur?
      </p>
        <SearchBar />
      <div className="boxes">
        <div className="box">
          <h1>5+</h1>
          <h2>Years of experience</h2>
        </div>
      
        <div className="box">
          <h1>20+</h1>
          <h2>Award gained</h2>
        </div>

        <div className="box">
          <h1>500K</h1>
          <h2>FindUs members</h2>
        </div>
      </div>
      


      </div>
    </div>
    </div>
  )
}

export default Home
