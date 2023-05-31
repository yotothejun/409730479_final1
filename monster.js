var monster_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)

class Monster{ //宣告一個怪物類別，名稱為Monster
    constructor(args){ //預設值，基本資料(物件顏色，移動的速度，大小，初始顯示位置。。。)
        this.r = args.r || 100 //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就已100為主
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度如果沒傳參數，就會亂數抽出ＸＹ軸的儀動速度
        this.color = args.color || random(fill_colors)

    }
    draw(){ //畫出元件
        push() //把原點座標移到物件中心位置
          translate(this.p.x,this.p.y)
          fill(this.color)
          noStroke()
          ellipse(0,0,this.r)
          fill(255)
          ellipse(0,0,this.r/2)
        pop()

    }

    update(){ //計算出移動元件後的位置
        this.p.add(this.v)

    }
}