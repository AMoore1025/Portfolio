const canvas = document.getElementById('Galaxy');
            const c = canvas.getContext('2d');
            
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            
            // const mouse = {
            //     x: innerWidth / 2,
            //     y: innerHeight / 2
            // };
            
            function randomIntFromRange(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            
            function randomColor(colors) {
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            function distance(x1, y1, x2, y2) {
                const xDist = x2 - x1;
                const yDist = y2 - y1;
                
                return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            }
            
            const colors = ['#2185C5', '#7ECEFD', '#FFF6E5'];
            
            let center = {
                x: canvas.width / 2,
                y: canvas.height / 2
            };
            
            let angle = 25;
            
            // Event Listeners
            // addEventListener('mousemove', event => {
            //     mouse.x = canvas.width / 2;
            //     mouse.y = canvas.height / 2;
                
            //     angle = Math.atan2(mouse.y, mouse.x);
            // });
            

            // Updates canvas when the window is resized
    addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        center.x = canvas.width / 2;
        center.y = canvas.height / 2;

        galaxy.galaxyRadius = Math.min(canvas.width, canvas.height) * 0.6;
                
        init();
    });
            
            //Objects
    function Star(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.opacity = 0 //starts invisible, then fades in
    }
      
      // draws each star onto the canvas
      Star.prototype.draw = function() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        c.shadowColor = '#E3EAEF';
        c.shadowBlur = 20;
        c.fill();
        c.closePath();
        c.restore();
      };
      
      Star.prototype.update = function() {
        this.draw();
        
      };   
            function Particle (x, y, radius, color, distanceFromCenter) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.distanceFromCenter = distanceFromCenter;

                this.offsetX = (Math.random() - 0.5) * 50;
                this.offsetY = (Math.random() - 0.5) * 2;
            }
            
            Particle.prototype.draw = function() {
                c.beginPath();
                c.arc((this.x + this.offsetX), (this.y + this.offsetY), this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();
                c.closePath();
            };
            
            Particle.prototype.update = function(timer) {
                const {cos, sin} = Math;
                const {distanceFromCenter} = this;
                
                this.x = center.x + distanceFromCenter * cos(0.5) * cos(timer + distanceFromCenter);
                this.y = center.y + distanceFromCenter * sin(angle) * sin(timer + distanceFromCenter);

                this.draw();
            };
            
            // Implementation
            let particles;
            let backgroundStars;
            let galaxy = {
                particleCount: 3000,
                galaxyRadius: Math.min(canvas.width, canvas.height) * 0.6,
                maxRadius: 2
            };
            let rotationSpeed = 0.0001;
            function init() {
                particles = [];
                backgroundStars = [];
                
                const starCount = 200;
                const hueIncrement = 100 / galaxy.particleCount;
                const lightIncrement = -100 / galaxy.particleCount;
                
                // Create the galaxy particles
                createGalaxy(galaxy.particleCount, galaxy.galaxyRadius, galaxy.maxRadius);
                
                for (let u = 0; u < starCount; u++) {
                    const x2 = Math.random() * canvas.width;
                    const y2 = Math.random() * canvas.height;
                    const radius = Math.random() * 1;
                    
                    backgroundStars.push(new Star(x2, y2, radius, 'white'));
                }
            }
            
            //Animation Loop
            let timer = 0;
            function animate() {
                requestAnimationFrame(animate);
                c.fillStyle = 'rgba(0, 0, 0, 0.15)';
                c.fillRect(0, 0, canvas.width, canvas.height);
                
                backgroundStars.forEach(backgroundStar => {
                    backgroundStar.opacity += 0.005; // Fade in the background stars
                    backgroundStar.draw();
                });
                
                 particles.forEach(particle => {
                    particle.update(timer);
                });
                 
                timer += rotationSpeed;
            }

            function createGalaxy(particleCount, galaxyRadius, maxRadius) {

                for (let i = 0; i < particleCount; i++) {
                    particleSetup(particleCount, galaxyRadius, maxRadius, i);
                }
            }

            //Initializes each galaxy particle

            function particleSetup(particleCount, galaxyRadius, maxRadius, i) {
                // Spread stars across the galaxy radius
                    const distance = Math.pow((i / particleCount), 2) * galaxyRadius;

                    // Add slight randomness to placement
                    const angle = Math.random() * 2 * Math.PI;
                    const distanceOffset = Math.random() * 20 - 10;

                    const x = center.x + (distance + distanceOffset) * Math.cos(angle);
                    const y = center.y + (distance + distanceOffset) * Math.sin(angle);
                    const radius = Math.random() * maxRadius;

                    // Calculate color based on distance from center
                    const hue = distance / galaxyRadius;

                    const color = `hsl(200, ${hue * 100}%, ${100 - hue * 100}%)`;

                    particles.push(new Particle(x, y, radius, color, distance + distanceOffset));
            }

            // Updates the features of the galaxy in real time
            function updateGalaxyStars(value) {
                galaxy.particleCount = value;

                rebuildGalaxy();

                document.getElementById("starNumText").textContent = `Star Count: ${value}`;
            }

            // Changes the speed at which the stars rotate
            function updateGalaxySpeed(value) {
                rotationSpeed = Number(value);

                document.getElementById("starSpeedText").textContent = `Star Speed: ${value}`;
            }

            function rebuildGalaxy() {
                particles = [];

                createGalaxy(galaxy.particleCount, galaxy.galaxyRadius, galaxy.maxRadius);
            }

            
            init();
            animate();