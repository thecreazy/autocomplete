function particle(canvas) {
 this.x = Math.random() * canvas.width;
 this.y = canvas.height + Math.random() * 300;
 this.speed = 0.2 + Math.random();
 this.radius = Math.random() * 3;
 this.opacity = (Math.random() * 100) / 1000;
}

export default class BeerCanvas {
 constructor(id = 'beerCanvas') {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext('2d');
  this.particles = Array(280).fill().map(_ => new particle(this.canvas));

  this.loop = this.loop.bind(this)
  this.draw = this.draw.bind(this)

  this.loop();
 }

 loop(){
  requestAnimationFrame(this.loop);
  this.draw();
 }

 draw(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.globalCompositeOperation = 'lighter';
  this.particles.forEach(p => {
   this.ctx.beginPath();
   this.ctx.fillStyle = 'rgba(255,255,255,' + p.opacity + ')';
   this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
   this.ctx.fill();
   p.y -= p.speed;
   if (p.y <= -10) p = new particle(this.canvas);
  });
 }
}