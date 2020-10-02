import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar'
import Square from './component/Square';
import Row from './component/Row';
import Button from '@material-ui/core/Button'
const YeuCau= 20;
var arr ={
  lenght:YeuCau,
  height:(window.screen.availHeight-200)/YeuCau,
  width:(window.screen.availHeight-200)/YeuCau,
  items:[{key:1,type:0,position:1}],
}
 
function App() {
  const [data,setData] = useState();
  const [txtNum,setTxtNum] = useState("");
  

  function DrawChesBoard(num)
  {
    arr.height = (window.screen.availHeight-200)/num;
    arr.width = (window.screen.availHeight-200)/num;

    var indents = [];
    for (var i = 0; i < num; i++) {
      indents.push(
        <Grid
        item>
          <Row
          item={arr.items[0]}
          length={num}
          height={arr.height}
          width={arr.width}
          position={i%2}
          />
        </Grid>
      )
    }
    setData(indents)
  }

  useEffect(()=>{
    DrawChesBoard(4);
  },[])
     
  return (
    <div
    style={{justifyContent: 'center',margin:50,display:'flex'}}
    className="App">
      <form style={{width:100,height:"100%",marginRight:10,display:'inline-block'}}  noValidate autoComplete="on">
      <TextField
      value={txtNum}
      onChange={(text) => setTxtNum(text.target.value)}
       id="standard-basic" label="Nhập Số Ô" />
      <Button
      onClick={() =>   DrawChesBoard(txtNum)}
    variant="contained" color="primary" disableElevation
      >
        Chạy
      </Button>
      </form>
      <Grid 
      justify="center"
      direction="column"
      alignItems="center"
      style={{borderRadius:20,backgroundColor:'black'}}
      container wrap="nowrap">
        {data}
      </Grid>

    </div>
  );
}

export default App;
