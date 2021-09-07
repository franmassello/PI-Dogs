import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { DOGS_URL } from "../../constants"
import { getDogs } from "../../actions/dogActions";

export default function DogCards() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  return (
    <div>
      {allDogs?.map((dog) => {
        return (
          <div>
            <p>{dog.name}</p>
            <img src={dog.img.url} alt="IMG NOT FOUND" />
          </div>
        );
      })}
    </div>
  );
}
