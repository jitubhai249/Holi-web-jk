 function toggleMenu() {
   var menu = document.querySelector(".menu");
   menu.style.display = menu.style.display === "block" ? "none" : "block";
 }
 
 function showAbout() {
   document.getElementById("aboutMe").style.display = "block";
 }
 
 function hideAbout() {
   document.getElementById("aboutMe").style.display = "none";
 }
 
 const canvas = document.getElementById("holiCanvas");
 const ctx = canvas.getContext("2d");
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 
 let particles = [];
 
 function Particle(x, y, color) {
   this.x = x;
   this.y = y;
   this.size = Math.random() * 8 + 2;
   this.color = color;
   this.speedX = (Math.random() - 0.5) * 5;
   this.speedY = (Math.random() - 0.5) * 5;
   this.life = 100;
 }
 
 Particle.prototype.update = function() {
   this.x += this.speedX;
   this.y += this.speedY;
   this.life--;
 };
 
 Particle.prototype.draw = function() {
   ctx.fillStyle = this.color;
   ctx.beginPath();
   ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
   ctx.fill();
 };
 
 function createParticles(x, y) {
   let colors = ["red", "yellow", "blue", "green", "pink", "purple"];
   for (let i = 0; i < 15; i++) {
     let color = colors[Math.floor(Math.random() * colors.length)];
     particles.push(new Particle(x, y, color));
   }
 }
 
 function animateParticles() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   particles.forEach((particle, index) => {
     particle.update();
     particle.draw();
     if (particle.life <= 0) {
       particles.splice(index, 1);
     }
   });
   requestAnimationFrame(animateParticles);
 }
 
 window.addEventListener("click", function(e) {
   createParticles(e.clientX, e.clientY);
 });
 
 animateParticles();