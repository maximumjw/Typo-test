
const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particleArray =[];
let adjustX=10;
let adjustY=20;
let flag=1;
ctx.lineWidth=3;

const mouse={
    x:null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove',function(event){
mouse.x=event.x;
mouse.y=event.y;
});

ctx.fillStyle='white';
ctx.font='20px Verdana';
ctx.fillText('SASA',0, 30);
const textCoordinates=ctx.getImageData(0,0,200,100);

class Particle{
    
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.size=3;
        this.baseX=this.x;
        this.baseY=this.y;
        this.density=(Math.random()*30)+1;
    }
    draw(){
        
        ctx.fillStyle='white';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    move(){
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;
    }
    update(){//마우스에서 벗어날수록 힘이 점점 약해지는 느낌 
        let dx=mouse.x-this.x;
        let dy=mouse.y-this.y;
        let distance=Math.sqrt(dx*dx+dy*dy);
        let forceDirectionX=dx/distance;
        let forceDirectionY=dy/distance;
        let maxDistance=mouse.radius;
        let force=(maxDistance-distance)/maxDistance;
        let directionX=forceDirectionX*force*this.density;
        let directionY=forceDirectionY*force*this.density;
       // if(distance<mouse.radius){
         //   this.x-=directionX;
       //     this.y-=directionY;
      //  }
      //  else{
            if(this.x!==this.baseX){
                let dx=this.x-this.baseX;
                this.x-=dx/10;
            }
            if(this.y!==this.baseY){
                let dy=this.y-this.baseY;
                this.y-=dy/10;
            }
     //   }
}
}
function init(){
    particleArray=[];
    `for(let i=0;i<500;i++){
        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height;
        particleArray.push(new Particle(x,y));
    }`
    //글자 형태로 입자 모이게 하기
    setTimeout(10000);
    for(let y=0,y2=textCoordinates.height;y<y2;y++){
        for(let x=0,x2=textCoordinates.width;x<x2;x++){
            if(textCoordinates.data[(y*4*textCoordinates.width)+(x*4)+3]>128){
                let positionX=x+adjustX;
                let positionY=y+adjustY;
                particleArray.push(new Particle(positionX*10,positionY*10));
            }
        }
    }
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].move();
        flag=1;
    }
}
init();

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();