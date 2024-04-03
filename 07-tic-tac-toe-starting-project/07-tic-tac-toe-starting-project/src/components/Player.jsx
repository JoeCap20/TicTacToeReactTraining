//Cuaseing the ui to update and allows us to update the value
import { useState } from "react";

{
  /*It is important to keep the function name easy to know
    We used props to make the component configurable which are name and symbol becuase they makeup the player*/
}
export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
  {
    /*This line below is setting an initial value and the array returns two elements and use array destructoring
    in order to store weather we are or are not currently edditing the player name
    Set initially to false so we arent editing the player and there is no input field to edit*/
  }
  const [isEditing, setIsEditing] = useState(false);

  // This is a new function to use setIsEditing
  function handleEditClick() {
    {
      /*calling and passing a new state value when the button is clicked and updating the state and cause
        react to reexecute the player component function as well as reevaluate the jsx code in the return and to see if anything changed
        if anything changed then they will be refelected*/
    } 
    // When updating a state based on the previous value of that state you should not do !isEditing but the best practice is 
    // a function should be passed instead
    setIsEditing((editing) => !editing);

    if (isEditing) {
    onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  //   this is a teranery name and the span is stored jsx code a a variable
  let editablePlayerName = <span className="player-name">{playerName}</span>;
//  Setting edit as a default
//   let btnCaption = "Edit";
  // this will check if it is true and does not neeed the === true in it
  if (isEditing) {
    // an input element as a value for player name and the text is required more attributes to come
    // the value={name} is to show the name as a value in that input becuase it will be different but it also overrides anything we try to do 
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
    // btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {/* The player name  variable should be outputed down here and either outputting the spane for playerName 
        or if is editing is true then the input*/}
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* This is to use the clicking of the button and adding () to handleEditClick is 
      wrong becuase you dont want to execute the function  and will eventually be executed by react*/}
      {/* Must replace hard coded edit with a dynamic value using {} and conditonal content for edit or save depending on isediting*/}
      {/* <button onClick={handleEditClick}>{btnCaption}</button> */}
      {/* This below uses a ternary expression and the line above needs to have the let btnCaption and btnCaption in isEditing function */}
      <button onClick={handleEditClick}>{isEditing ? "Save": "Edit"}</button>
    </li>
  );
}
