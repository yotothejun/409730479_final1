let points = [[-6, 1], [-6, 2], [-3, 5],[3,7],[1,5],[2,4],[4,3],[5,2],[6,2],[8,4],[8,-1],[6,0],[0,-3],[-2,-6],[-2,-3],[-4,-2],[-5,-1],[-6,1]]; //list資料，

var fill_colors = "d6ccc2-edede9-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)
var line_colors = "22223b-4a4e69-9a8c98-c9ada7-f2e9e4".split("-").map(a=>"#"+a)

class Obj{ //宣告一個類別，針對一個你畫的圖案 //class:類別，粒子
  constructor(args){ //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置。。。。)
    this.p =  args.p || {x:random(width), y:random(height) }//描述為該物件的初始位置
                    //||(or)當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有傳參數，就已||後面設定產出，如果沒有傳參數，就已||後面設定產出
    this.p = args.p || createVector(random(width),random(height))
                    //this.v = {x:random(-1,1), y:random(-1,1)}  //設定一個物件的移動速度
    this.v = createVector(random(-1,1),random(-1,1)) 
    this.size = random(10,15)  //一個物件的放大倍率
    this.color = random(fill_colors)
    this.stroke = random(line_colors)
}
draw(){  //劃出單一物件形狀
  push() //執行push()後，依照我的設定，設定原點(0,0)的位置
   translate(this.p.x,this.p.y) //
   scale(this.v.x<0?1:-1,-1) //X軸的放大倍率，如果this.v.x<0條件成立，值為1，某則為-1，Y軸的-1，為上下翻轉，Y軸的-1，為上下翻轉
   fill(this.color)
   stroke(this.stroke)
   strokeWeight(4)
   beginShape()
   for(var k=0;k<points.length;k=k+1){
    //line(points[k][0],points[k][1],points[k+1][0],points[k+1][1])
    //vertex(points[k][0]*this.size,points[k][1]*this.size) //只要設定一個點，當指令到endshape()，會把所有的點串接在一起
    curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫線為圓弧方式畫圖
  }
   endShape()
  pop() //執行pop()，原點設定回到整個視窗的左上角
 }
 update(){ //移動的程式碼內容
  // this.p.x = this.p.x+this.v.x //X軸目前位置(this.p.x)加上X軸的移動速度(this.v.x)
  // this.p.y = this.p.y+this.v.y //Y軸目前位置(this.p.y)加上Y軸的移動速度(this.v.y)
  this.p.add(this.v) //設定好向量後，使用add，就可以與上面兩行指令一樣的效果
  //向量add等於減號

  //知道滑鼠的位置，並建立一個滑鼠的向量
  let mouseV = createVector(mouseX,mouseY)  //把滑鼠的位置轉換成一個向量值
  let delta = mouseV.sub(this.p).limit(this.v.mag()) //sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.p)的距離，每次以3移動
  //this.v.mag()代表該物件的速度大小(一個向量值有大小與方向)
  this.p.add(delta)



  if(this.p.x<=0 || this.p.x>=width){ //X軸碰到左邊(<=0)，或是碰到右邊(>=width)
    this.v.x = -this.v.x //把速度方向改變
  }
  if(this.p.y<=0 || this.p.y>=height){
    this.v.y = -this.v.y  
  }
 }
 isBallInRanger(){ //功能:判斷滑鼠按下的位置是否在物件的範圍內
   let d = dist(mouseX,mouseY,this.p.x,this.p.y) //計算兩點之間的距離，放到d變數內
   if(d<4*this.size){
     return true  //滑鼠與物件的距離小於物件的寬度，代表沒有碰觸，則傳回true的值(碰觸)
   } else{
    return false ////滑鼠與物件的距離大於物件的寬度，代表有碰觸，則傳回false的值(未碰觸)
   }
  }
}


//+++++++++畫points所有的物件定義
var ball //目前要處理的物件，暫時放在ball變數內
var balls = [] //把產生的"所有"的物件，為物件的倉庫，所有的資料都在此
//+++++++++設定飛彈物件的變數
var bullet //"目前要處理的物件"，暫時放在bullet變數內
var bullets =[] //把產生的所有物件，為物件的倉庫，所有的物件資料都在此
//++++++++設定怪物物件的變數
 var monster
 var monsters = []

var score = 0

function preload(){ //在程式碼準備執行之前，比set up更早執行
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
}     

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i = 0;i<50;i=i+1){ //i=0,1,2,3,4,5........8,9
    ball = new Obj ({}) //產生一個Obj class物件
    balls.push(ball) //把ball這個物件放入balls陣列內
    
  }
  //  for(var i = 0;i<10;i=i+1){
  //     monster = new Monster({}) 
  //     monsters.push(monster) 
    
  //   }
}

function draw() {
  background(220);
  //for(var j=0;j<balls.length;j=j+1){
    //ball = balls[j]
    //ball.draw()
    //ball.update()
  //}
  //大象的顯示
  for(let ball of balls) //只要是陣列的方式，都可以利用此方式處理
  {
   ball.draw()
   ball.update()
    for(let bullet of bullets){
     if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball)，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score+1
        elephant_sound.play()
     }
   }
}
//飛彈的顯示  
for(let bullet of bullets)
  {
    bullet.draw()
    bullet.update()
  }
  
 for(let monster of monsters)
   {
     monster.draw()
     monster.update()
   }

  
  textSize(50)
  text(score,50,50) //在(50,50)上顯示score的內容
  push() //重新規劃原點(0,0)，在視窗的中間
   let dx = mouseX-width/2
   let dy = mouseY-height/2
   let angle = atan2(dy,dx) 
   translate(width/2,height/2)
   fill("#ffc03a")
   noStroke()
   rotate(angle) 
   triangle(-25,25,25,-25,50,0) //設定三個點，畫成一個三角形
   ellipse(0,0,50)
  pop() //恢復原本設定，原點(0,0)在視窗的左上角
}
 function mousePressed(){

  //++++++++++產生一個物件++++++++++++
  // ball = new Obj ({
  //   p:{x:mouseX,y:mouseY}
  // }) //在滑鼠按下的低方，產生一個Obj class物件
  // balls.push(ball) //把ball這個物件放入balls陣列內(丟到倉庫)
 //++++++++++++++++++++++++++++++++++++++++++++++++

 //在物件上按下滑鼠，物件消失不見，分數加一分
//  for(let ball of balls){
//   if(ball.isBallInRanger(mouseX,mouseY)){
//     balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball)，只取1個
//     score = score+1
//   }
//  }
 //+++++++++按一下產生一個飛彈++++++++++++++++
  bullet = new Bullet({
    r:25,
    color:"red"
  }) //在滑鼠按下的低方，產生一個bullet class物件(產生一個飛彈)
  bullets.push(bullet) 
  bullet_sound.play()
 }