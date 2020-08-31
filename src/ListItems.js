import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'



function ListItems(props){
    const items = props.items;
    const listItems = items.map(item =>
   {
       return <div className={'list' + item.status} key={item.id}>
     <p>
         <input type="text" 
         id={item.id}
     
         value={item.titulo} onChange={(e)=>{
             props.edit(e.target.value,item.id)}}/>
       
        <span class="fa-stack fa-2x">
        
        <FontAwesomeIcon className="faicons-check" onClick={
            () => {
                props.edit(item.id)
            }
        } icon={faCheckCircle} />
        <FontAwesomeIcon className="faicons" onClick={
            () => {
                props.deleteItem(item.id)
            }
        } icon="trash" />
        </span>
     </p>
     
    </div>})
    return <div>
        <FlipMove duration={300} easing="ease-in-out">
        {listItems}
        </FlipMove>
    
    </div>;
  }
  
  export default ListItems;