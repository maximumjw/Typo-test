
import {buttonflag} from './app.js';

function changeBtnName(get) {
  console.log(this);
  if(buttonflag==1){
    const btnElement = document.getElementById('myBtn1');
    get.btnElement.innerText = 'RESET';
  }
  else{
    const btnElement = document.getElementById('myBtn1');
    get.btnElement.innerText = 'MOVE';
  }
  return false;
}
