import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Avatar from '@material-ui/core/Avatar'
function Square (props) 
{
var value =  props.isQueen?<Avatar variant='square'  style={{height:props.height,width:props.width}} src="https://www.flaticon.com/svg/static/icons/svg/3410/3410981.svg" />:""
    return(
        <div

        style={{width:props.width,height:props.height,backgroundColor:props.color,justifyContent:'center'}}
        >
       {value}
        </div>
    )

}

export default Square;