var s;
var particles = [];
var maxParticles = 300;
var particleIndex = 0;
var WindSpeed = 0;
var WindFactor = .2;
var WindTimer;

function Particle(){
  this.size = random(3);
  this.x = random(s.width);
  this.y = 0;
  this.vx = random(-.5,.5);
  this.vy = random(1,2);
  this.life = 0;
  this.maxLife = 1000;
  this.index = particleIndex;
  particles[particleIndex] = this;
}

Particle.prototype.update = function(){
  if(this.x >= 0 && this.x <= s.width && this.y >= 0 && this.y <= s.height && this.life <= this.maxLife){
    this.x += this.vx + WindSpeed;
    this.y += this.vy;
    this.life++;
  } else {
    this.makeNew();
  }
};

Particle.prototype.draw = function(){
  s.fillStyle = 'white';
  s.beginPath();
  s.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
  s.fill();
};

Particle.prototype.makeNew = function(){
  this.x = random(s.width);
  this.y = 0;
  this.vx = random(-.5,.5);
  this.vy = random(1,2);
  this.life = 0;
};

function CreateSnow(){
	s = Sketch.create({autoclear: false,container: $('#snow')[0]});
	
	s.draw = function(){
	  for(var i in particles){
		particles[i].draw();
	  }
	};

	s.update = function(){
	  this.clearRect(0, 0, s.width, s.height);
	  for(var i in particles){
		particles[i].update();
	  }
	}
	
	$('#snow').show();
	if(particles.length == 0){
		for(var i=0; i<maxParticles; i++){
		  setTimeout(function(){
			particles.push(new Particle());
			particleIndex++;
		  }, 40 * i);
		}
	}
	WindTimer = setInterval(ChnageWind,1000);
}

function DestroySnow(){
	$('#snow').hide();
	s.destroy();
	clearInterval(WindTimer);
}

function ChnageWind(){
	if(WindSpeed == 1){
		WindFactor = -.2;
	}else if(WindSpeed == -1){
		WindFactor = .2;
	}
	WindSpeed += WindFactor;
}
