class Bullet{
    constructor(args){ //預設值，基本資料(物件顏色，移動的速度，大小，初始顯示位置。。。)
      this.r = args.r || 10 //設計的飛彈有大有小時，就傳參數args.r來設定飛彈大小，沒有傳參數，就已10為主
      this.p = args.p || createVector(width/2,height/2) //建立一個向量，
      this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10)
      this.color = args.color ||"#1982c4"
    }
    draw(){ //匯出物件程式碼
        push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
    pop()
   
    }
    update(){ //計算出移動後的位置
       this.p.add(this.v)
    }
   }