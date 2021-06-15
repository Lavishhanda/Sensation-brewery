import React from "react";
import {Link} from "react-router-dom";

export default function Cocktail(props) {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src = {props.image} alt = {props.name}></img>
      </div>
      <div className="cocktail-footer">
        <h3> {props.name} </h3>
        <h4> {props.glass} </h4>
        <p> {props.info} </p>
        <Link to={`/cocktail/${props.id}`} className="btn btn-primary btn-details">details</Link>
      </div>
    </article>
  )
}
