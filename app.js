import{
  Visual
} from './visual.js';
let stageflag=0;
export let buttonflag=0;
class App{
  constructor(){
    

    this.canvas=document.createElement('canvas');
    document.body.appendChild(this.canvas);

    this.ctx=this.canvas.getContext('2d');

    this.pixelRatio=window.devicePixelRatio>1?2:1;

    //this.stageWidth=document.body.clientWidth;
    //this.stageHeight=document.body.clientHeight;

    var myButton = document.getElementById("myBtn");
    myButton.addEventListener("click", this.buttonfunc.bind(this));
    var myButton1 = document.getElementById("myBtn1");
    myButton1.addEventListener("click", this.button_flagfunc.bind(this));

        //this.resize();
        //alert("버튼이 클릭되었습니다.");
      //});

    WebFont.load({
      google:{
        families: ['Hind:700']
      },
      fontactive:()=>{
        this.visual=new Visual();

        window.addEventListener('resize',this.resize.bind(this),false)
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
      }
    });
  }

  buttonfunc(){
    console.log(stageflag);
    console.log(buttonflag);
    stageflag=(stageflag+1)%2;
    buttonflag=0;
    this.visual.flagon();
    var myButton1 = document.getElementById("myBtn1");
    myButton1.innerText = 'MOVE';
    

    this.stageWidth=document.body.clientWidth;
    this.stageHeight=document.body.clientHeight;

    this.canvas.width=this.stageWidth*this.pixelRatio;
    this.canvas.height=this.stageHeight*this.pixelRatio;
    this.ctx.scale(this.pixelRatio,this.pixelRatio);

    if(stageflag==1){
      this.visual.reshow(this.stageWidth,this.stageHeight);
    }
    else if(stageflag==0){
      this.visual.show(this.stageWidth,this.stageHeight);
    }
  }

  button_flagfunc(){
    console.log(buttonflag);
    buttonflag=(buttonflag+1)%2;
    if(buttonflag==1){
      var myButton1 = document.getElementById("myBtn1");
      myButton1.innerText = 'RESET';
    }
    else{
      var myButton1 = document.getElementById("myBtn1");
      myButton1.innerText = 'MOVE';
    }
    if(buttonflag==1){
      this.visual.flagoff();
    }
    else if(buttonflag==0){
      this.visual.flagon();
    }
  }

  resize(){
    this.stageWidth=document.body.clientWidth;
    this.stageHeight=document.body.clientHeight;

    this.canvas.width=this.stageWidth*this.pixelRatio;
    this.canvas.height=this.stageHeight*this.pixelRatio;
    this.ctx.scale(this.pixelRatio,this.pixelRatio);

    this.visual.show(this.stageWidth,this.stageHeight);
  }

  animate(t){
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

    this.visual.animate(this.ctx,t);
  }
}


window.onload=()=>{
  new App();
};