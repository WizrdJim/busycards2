import React from 'react';

const Card = (props) => {
  return (
    <div>
      <div> {props.name} </div>
      <div> {props.title} </div>
      <div> {props.link} </div>
    </div>
  )
}

export default Card;