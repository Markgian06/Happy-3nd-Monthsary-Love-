     const messages = [
            {
                title: "3 Months Together! 💕",
                text: "Happy 3rd monthsary, my love! These three months with you have been absolutely magical. Every day feels like a new adventure when I'm with you!"
            },
            {
                title: "You Make Me Smile 😊",
                text: "Every morning I wake up grateful to have you in my life. Just knowing you’re mine makes the start of each day beautiful."
            },
            {
                title: "Perfect Together 💑",
                text: "We fit together like puzzle pieces. You complete me in ways I never knew I needed. Thank you for being my perfect match!"
            },
            {
                title: "Future Dreams 🌟",
                text: "I can't wait to create more beautiful memories with you. Our future together looks so bright and full of love!"
            },
            {
                title: "You're My Everything 💖",
                text: "You're not just my girlfriend, you're my partner, and my greatest source of happiness. I love you more each day!"
            },
            {
                title: "Sweet Moments 🥰",
                 text: "Ikaw lang at ikaw lang talaga. Wala na akong hahanapin pa. Sapat ka na para sa buong buhay ko."
            },
            {
                title: "Thank You 🙏",
                text: "Thank you for choosing me, for loving me, and for being the most amazing girlfriend anyone could ask for. I'm so grateful for you!"
            },
            {
                title: "Always & Forever 💍",
                text: "Three months down, forever to go! I promise to love you, support you, and every moment we share together!"
            },
            {
                title: "You're Beautiful 👸",
                text: "Inside and out, you're absolutely stunning. Your beauty radiates from your heart and soul. I'm so lucky to call you mine!"
            },
            {
                title: "My Love Declaration 💌",
                text: "I LOVE YOU SO MUCH! These three months have been the happiest of my life. Here's to many more monthsaries together, my darling!"
            }
        ];

        let bubblesPopped = 0;
        let bubbles = [];
        let usedMessages = [];
        let audioContext;
        let isPlaying = false;
        let currentMelody = null;

        function createRomanticMelody() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            const melody = [
                { note: 523.25, duration: 0.5 }, // C5
                { note: 587.33, duration: 0.5 }, // D5
                { note: 659.25, duration: 0.5 }, // E5
                { note: 698.46, duration: 0.5 }, // F5
                { note: 783.99, duration: 1.0 }, // G5
                { note: 659.25, duration: 0.5 }, // E5
                { note: 698.46, duration: 0.5 }, // F5
                { note: 783.99, duration: 1.0 }, // G5
                { note: 880.00, duration: 0.5 }, // A5
                { note: 783.99, duration: 0.5 }, // G5
                { note: 698.46, duration: 0.5 }, // F5
                { note: 659.25, duration: 1.5 }, // E5
                { note: 523.25, duration: 0.5 }, // C5
                { note: 587.33, duration: 0.5 }, // D5
                { note: 659.25, duration: 1.0 }, // E5
                { note: 523.25, duration: 2.0 }  // C5
            ];

            return melody;
        }

        function playNote(frequency, duration, startTime) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, startTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        }

        function playMelody() {
            if (!audioContext || !isPlaying) return;
            
            const melody = createRomanticMelody();
            const now = audioContext.currentTime;
            let time = now;
            
            melody.forEach(({ note, duration }) => {
                playNote(note, duration, time);
                time += duration;
            });
            
            currentMelody = setTimeout(() => {
                if (isPlaying) {
                    playMelody();
                }
            }, time - now);
        }

         function toggleMusic() {
            const btn = document.getElementById('musicBtn');
            
            if (!isPlaying) {
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }
                
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                
                isPlaying = true;
                btn.textContent = '🎵 Stop Music';
                btn.classList.add('playing');
                playMelody();
            } else {
                isPlaying = false;
                btn.textContent = '🎵 Play Music';
                btn.classList.remove('playing');
                if (currentMelody) {
                    clearTimeout(currentMelody);
                    currentMelody = null;
                }
            }
        }

        function playPopSound() {
            if (!audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }

        function getRandomColor() {
            const colors = [
                'linear-gradient(135deg, #ff6b9d, #ffd93d)',
                'linear-gradient(135deg, #ff9a9e, #fecfef)',
                'linear-gradient(135deg, #ffecd2, #fcb69f)',
                'linear-gradient(135deg, #ff8a80, #ff80ab)',
                'linear-gradient(135deg, #f093fb, #f5576c)',
                'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
                'linear-gradient(135deg, #fdbb2d, #ff6b9d)',
                'linear-gradient(135deg, #a8edea, #fed6e3)',
                'linear-gradient(135deg, #ffd1dc, #ff6b9d)',
                'linear-gradient(135deg, #ff9a8b, #fad0c4)',
                'linear-gradient(135deg, #c44569, #ff6b9d)',
                'linear-gradient(135deg, #f8b500, #ff6b9d)'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        function createBubble() {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            const size = Math.random() * 60 + 40; 
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.background = getRandomColor();
            bubble.style.left = Math.random() * (window.innerWidth - size) + 'px';
            bubble.style.top = Math.random() * (window.innerHeight - size - 100) + 80 + 'px';
            bubble.style.animationDelay = Math.random() * 2 + 's';
            bubble.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            bubble.addEventListener('click', () => popBubble(bubble));
            
            document.querySelector('.container').appendChild(bubble);
            bubbles.push(bubble);
        }

        function createAllBubbles() {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createBubble();
                }, i * 200); 
            }
        }

        function popBubble(bubble) {
            if (bubble.classList.contains('popping')) return;
            
            bubble.classList.add('popping');
            createHearts(bubble);
            playPopSound(); 
            
            setTimeout(() => {
                bubble.remove();
                bubbles = bubbles.filter(b => b !== bubble);
                showMessage();
                bubblesPopped++;
            }, 300);
        }

        function createHearts(bubble) {
            const rect = bubble.getBoundingClientRect();
            const heartsContainer = document.getElementById('hearts');
            
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '💕';
                heart.style.left = (rect.left + rect.width/2 - 10) + 'px';
                heart.style.top = (rect.top + rect.height/2 - 10) + 'px';
                heart.style.animationDelay = (i * 0.1) + 's';
                
                heartsContainer.appendChild(heart);
                
                setTimeout(() => heart.remove(), 2000);
            }
        }

        function showMessage() {
            if (usedMessages.length >= messages.length) {
                usedMessages = [];
            }
            
            let availableMessages = messages.filter((_, index) => !usedMessages.includes(index));
            let randomIndex = Math.floor(Math.random() * availableMessages.length);
            let messageIndex = messages.indexOf(availableMessages[randomIndex]);
            
            usedMessages.push(messageIndex);
            
            const message = messages[messageIndex];
            document.getElementById('messageTitle').textContent = message.title;
            document.getElementById('messageText').textContent = message.text;
            document.getElementById('message').classList.add('show');
        }

        function closeMessage() {
            document.getElementById('message').classList.remove('show');
            
            if (bubblesPopped >= 10) {
                setTimeout(() => {
                    showFinalMessage();
                }, 1000);
            }
        }

        function showFinalMessage() {
            document.getElementById('messageTitle').textContent = "🎉 All Bubbles Popped! 🎉";
            document.getElementById('messageText').textContent = "Congratulations, my love! You've discovered all my messages for our 3rd monthsary. I love you more than words can express! 💕💕💕";
            document.getElementById('message').classList.add('show');
        }

        function init() {
            createAllBubbles();
        }

        init();

        window.addEventListener('resize', () => {
            bubbles.forEach(bubble => {
                const rect = bubble.getBoundingClientRect();
                if (rect.right > window.innerWidth) {
                    bubble.style.left = (window.innerWidth - rect.width - 10) + 'px';
                }
                if (rect.bottom > window.innerHeight) {
                    bubble.style.top = (window.innerHeight - rect.height - 10) + 'px';
                }
            });
        });


         // Auto-play music when page loads
         document.addEventListener('DOMContentLoaded', function() {
         const audio = new Audio('path/to/your/music.mp3'); 
    
         audio.loop = true; 
         audio.volume = 0.5; 
    
          audio.play().catch(function(error) {
         console.log('Auto-play was prevented:', error);
         document.addEventListener('click', function() {
             audio.play();
         }, { once: true });
     });
 });