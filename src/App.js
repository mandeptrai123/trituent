import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar'
import Square from './component/Square';
import Row from './component/Row';
import Button from '@material-ui/core/Button'
import { configure } from '@testing-library/react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



var ok_row = [];
var ok_col = [];
var ok_diagonal_plus = [];
var ok_diagonal_minus = [];
var solution = [];
var _KetQuaCuoiCung = [];
var SLKetQua = 0;
var soCach = 0;
var num;
var numDef;
// var arr ={
//   lenght:YeuCau,
//   height:(window.screen.availHeight-300)/YeuCau,
//   width:(window.screen.availHeight-300)/YeuCau,
//   items:[
//     {key:1,type:0,position:7},
//     {key:2,type:0,position:3},
//     {key:3,type:0,position:0},
//     {key:4,type:0,position:2},
//     {key:5,type:0,position:5},
//     {key:6,type:0,position:1},
//     {key:7,type:0,position:6},
//     {key:8,type:0,position:4}],
// }
 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function App() {
  const [data,setData] = useState();
  const [txtNum,setTxtNum] = useState("");

  const [txtSLKetQua,setTxtSLKetQua] = useState();

  const [stateOpen,setStateOpen] = useState(false);

  const [arrKetQua,setArrSLKetQua] = useState([]);
  const [arrMess,setMess] = useState("");
  

  function Try_now(i)
  {
    for(var x=0;x<num;x++)
    {
      if(ok_row[i] != 1 && ok_col[x] != 1 && ok_diagonal_plus[i+x-1] != 1 && ok_diagonal_minus[i-x+num] != 1 )
      {
        solution[i] = x;
        ok_col[x] = 1;
        ok_diagonal_plus[i+x-1] = 1;
        ok_diagonal_minus[i-x+num] = 1;

        if (i < (num-1))
        {
          Try_now(i+1)
        }
        else{
          printSolution()
        }
           
        ok_row[i] = 0;
        ok_col[x] = 0;
        ok_diagonal_minus[i-x+num] = 0;
        ok_diagonal_plus[i+x-1] = 0;
      }
    }
  }

  function  printSolution()
  {
    _KetQuaCuoiCung.push([]);
    for(var i = 0; i < num;i++)
    {
      _KetQuaCuoiCung[SLKetQua].push(
        {key:(i+1),type:0,position:solution[i]}
        );
    }
    
    SLKetQua++;
  }

  function Setting(_num)
  {
    _KetQuaCuoiCung = [];
    num = _num;
    numDef = num + 1;

    for(var j=0;j<numDef+1;j++)
    {
      solution.push(0);
    }

    for(var j=0;j<numDef+1;j++)
    {
      solution.push(0);
    }

    

    for(var j=0;j<numDef+1;j++)
    {
      ok_col.push(0);
      ok_row.push(0);
    }

    for(var j=0;j<numDef*2;j++)
    {
      ok_diagonal_minus.push(0);
      ok_diagonal_plus.push(0);
    }

    Try_now(0);

  }

  useEffect(()=>{
  soCach = 0;
  });


  function DrawChesBoard(num)
  {
    if(num == "2" || num == "3")
    {
      setMess("Không Có Kết Quả Sắp Xếp Của Bàn Cờ: "+num+"x"+num)
      setStateOpen(true);
      return;
    }

    if(parseInt(num) > 11)
    {
      setMess("Số Lượng Kết Quả Lớn Hơn: "+1787+", Không Đủ Bộ Nhớ Để Tính Toán Và Hiển Thị");
      setStateOpen(true);
      return;
    }

    SLKetQua = 0 ;
    // Chay Thuat Toan
    Setting(num);
    soCach = 0;
    setArrSLKetQua(_KetQuaCuoiCung);
    setTxtSLKetQua(SLKetQua);


    var arr ={
      lenght:num,
      items:
        _KetQuaCuoiCung[0],
    }
    arr.height = (window.screen.availHeight-200)/num;
    arr.width = (window.screen.availHeight-200)/num;
    var indents = [];
    for (var i = 0; i < num; i++) 
    {
      indents.push(
        <Grid
        item>
          <Row
          item={arr.items[i]}
          length={num}
          height={arr.height}
          width={arr.width}
          position={i%2}
          />
        </Grid>
      )
    }
    setData(indents);

  }

  useEffect(()=>{
    setTxtNum(4);
    DrawChesBoard(4);
  },[])
     
  return (
    <div
    style={{justifyContent: 'center',
  marginLeft:50,marginRight:50}}
    className="App">

      <div
      style={{marginTop:5,marginBottom:5,fontSize:25,alignSelf:'center',textAlign:'center',color:'blue'}}
      >
        Bài Tập Mô Phỏng Thuật Toán Xếp Hậu
      </div>
      <div
      style={{display:'flex',marginTop:10}}
      >
          <form 
      style={{width:250,height:"100%",marginRight:10,
      height:400,
      backgroundColor:'orange',
      padding:10,
      borderRadius:20,
      display:'inline-block'}}  noValidate autoComplete="on">
      <TextField
      value={txtNum}
      style={{textAlign:'center',alignSelf:'center',padding:5,
      color:'white',fontWeight:'bold'}}
      onChange={(text) => setTxtNum(text.target.value)}
       id="standard-basic" label="Nhập Số Ô" />
      <Button
      onClick={() =>   DrawChesBoard(txtNum)}
    variant="contained" color="primary" disableElevation
      >
        Chạy Thuật Toán
      </Button>
      <div
      style={{fontWeight:'bold',color:'black',fontSize:14,marginTop:10}}
      >
        Số Lượng Kết Quả: {txtSLKetQua}
      </div>

      <div
      style={{fontSize:15,marginTop:10,fontWeight:'bold'}}
      >
        Chọn Kết Quả Bạn Muốn Xem
      </div>
      <Select

        style={{width:200}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={e=>{
            
    var arr ={
      lenght:num,
      items:
        _KetQuaCuoiCung[parseInt(e.target.value)-1],
    }
    arr.height = (window.screen.availHeight-200)/num;
    arr.width = (window.screen.availHeight-200)/num;
    var indents = [];
    for (var i = 0; i < num; i++) 
    {
      indents.push(
        <Grid
        item>
          <Row
          item={arr.items[i]}
          length={num}
          height={arr.height}
          width={arr.width}
          position={i%2}
          />
        </Grid>
      )
    }
    setData(indents);
          }}
        >
          {arrKetQua.map(e=>{
            soCach+=1;
          return <MenuItem value={parseInt(soCach)-SLKetQua}>Cách {parseInt(soCach)-SLKetQua}</MenuItem>
          })}
        </Select>

      {/* <div
      style={{fontWeight:'bold',color:'black',fontSize:14,marginTop:10}}
      >
        Độ Phức Tạp Thuật Toán: .....
      </div>

      <div
       style={{fontWeight:'bold',color:'black',fontSize:14,marginTop:10}}
      >
        Thời Gian Chạy : ....
      </div> */}

      </form>
      <Grid 
      justify="center"
      direction="column"
      alignItems="center"
      style={{borderRadius:20,backgroundColor:'white',width:'100%'}}
      container wrap="nowrap">
        {data}
      </Grid>


      </div>

      <Dialog
        open={stateOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>{
          setStateOpen(false);
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{arrMess}</DialogTitle>
       
        <DialogActions>
          <Button onClick={()=>{
              setStateOpen(false)
          }} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
  );
}

export default App;
