import React from 'react';
import './Card.css'

const Card = (props) => {
  return (
    <div className={"Card text-center"}>
      <div> {props.name} </div>
      <div> {props.title} </div>
      <div> {props.link} </div>
    </div>
  )
}

export default Card;