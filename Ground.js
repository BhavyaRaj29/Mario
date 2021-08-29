class Ground{
    constructor(x,y,w,h){
    options={
        isStatic:true,
    }
   this.x=x;
   this.y=y;
   this.w=w;
   this.h=h;
   this.body=Bodies.rectangle(x,y,w,h,options);
   world.add(world,this.body)
    }
display(){
   var pos =this.body.position;

   push()
   translate(pos.x,pos.y)
   rectMode(CENTER)
   fill(255,255,0)
   strokeWeight(4)
   rect(x,y,this.w,this.h)
   pop()


}

} 