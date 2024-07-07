import React from 'react'
import Card from '../Card/Card'
import './List.scss'

const List = ({posts}) => {
  return (
    <div className='List'>
      {posts.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List
