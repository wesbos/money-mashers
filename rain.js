var container = document.getElementById('animate');
var emoji = ['💸', '💎', '💵'];
var circles = [];

for (var i = 0; i < 15; i++) {
  addCircle(i * 1500, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
  addCircle(i * 1500, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
}



function addCircle(delay, range, color) {
  setTimeout(function() {
    var c = new Circle(range[0] + Math.random() * range[1], 0.000000001 + Math.random() * 0.0002, color, {
      x: -0.00015 + Math.random() * 0.0000000003,
      // SPEED
      y: 0.0001 + Math.random() * 0.000000001
    }, range);
    circles.push(c);
  }, delay);
}

function Circle(x, y, c, v, range) {
  var _this = this;
  this.x = x;
  this.y = y;
  this.color = c;
  this.v = v;
  this.range = range;
  this.element = document.createElement('span');
  /*this.element.style.display = 'block';*/
  this.element.style.opacity = 0;
  this.element.style.position = 'absolute';
  this.element.style.fontSize = '56px';
  this.element.style.color = 'hsl('+(Math.random()*360|0)+',80%,50%)';
  this.element.innerHTML = c;
  container.appendChild(this.element);

  this.update = function() {
    if (_this.y > 1500) {
      _this.y = 0.0001 + Math.random() * 2;
      _this.x = _this.range[0] + Math.random() * _this.range[1];
    }
    _this.y += _this.v.y;
    _this.x += _this.v.x;
    this.element.style.opacity = 1;
    this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';

  };
}

export function animate() {
  for (var i in circles) {
    circles[i].update();
  }
  requestAnimationFrame(animate);
}

