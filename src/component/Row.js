import React from 'react';
import Square from './Square';

function Row(props){
    var indents = [];
for (var i = 0; i < props.length; i++) {
  indents.push(
    <Square height={props.height}
    isQueen={props.item.position==i?true:false}
    color={i%2==props.position?'orange':'white'}
   width={props.width}
   />);
}
    return (<div style={{display:'flex'}}>
        {indents}
    </div>);

}

export default Row;