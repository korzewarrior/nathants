document.addEventListener('DOMContentLoaded', () => {
    // Terminal loading sequence effect
    const loadingSequence = () => {
        const terminalLoad = document.createElement('div');
        terminalLoad.className = 'terminal-load';
        document.body.appendChild(terminalLoad);
        
        const loadingSteps = [
            'Initializing system...',
            'Loading resources...',
            'Establishing connection...',
            'Connection secure.',
            'Rendering interface...'
        ];
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < loadingSteps.length) {
                terminalLoad.textContent = loadingSteps[i];
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    terminalLoad.style.opacity = '0';
                    setTimeout(() => {
                        terminalLoad.remove();
                        document.body.classList.add('loaded');
                    }, 500);
                }, 300);
            }
        }, 400);
    };
    
    loadingSequence();
    
    // Random glitch movements for floating elements
    const glitchElements = document.querySelectorAll('.glitch-element');
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.7) {
                const randomX = (Math.random() - 0.5) * 10;
                const randomY = (Math.random() - 0.5) * 10;
                const randomRotate = (Math.random() - 0.5) * 15;
                
                element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
                
                // Occasional glitch effect
                if (Math.random() > 0.8) {
                    element.style.color = '#ff3e3e';
                    setTimeout(() => {
                        element.style.color = '';
                    }, 150);
                }
                
                setTimeout(() => {
                    element.style.transform = '';
                }, 300);
            }
        }, 2000 + Math.random() * 3000);
    });
    
    // Randomize terminal text on hover
    const terminalElements = document.querySelectorAll('.terminal');
    terminalElements.forEach(el => {
        // Find a potential link inside the element
        const linkElement = el.querySelector('a');
        const originalText = linkElement ? linkElement.textContent : el.textContent; // Get text from link or element itself

        el.addEventListener('mouseover', () => {
            if (Math.random() > 0.7) {
                const scrambled = scrambleText(originalText);

                // Target the link's text if it exists, otherwise the element's text
                if (linkElement) {
                    linkElement.textContent = scrambled;
                } else {
                    el.textContent = scrambled;
                }

                setTimeout(() => {
                    // Restore text in the correct target
                    if (linkElement) {
                        linkElement.textContent = originalText;
                    } else {
                        el.textContent = originalText;
                    }
                }, 500);
            }
        });
    });
    
    // Scramble text utility
    function scrambleText(text) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\'.split('');
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            if (Math.random() > 0.7) {
                result += chars[Math.floor(Math.random() * chars.length)];
            } else {
                result += text.charAt(i);
            }
        }
        
        return result;
    }
    
    // Add interaction effects to buttons and links
    const interactiveElements = document.querySelectorAll('a, .cta-button, .social-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const randomSkew = (Math.random() - 0.5) * 5;
            if (this.classList.contains('cta-button') || this.classList.contains('social-button')) {
                this.style.transform = `skew(${randomSkew}deg) translateY(-5px)`;
            }
            
            // Occasional glitch effect on hover
            if (Math.random() > 0.8) {
                this.style.textShadow = '2px 0 #ff3e3e, -2px 0 #00ff9d';
                setTimeout(() => {
                    this.style.textShadow = '';
                }, 150);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('cta-button') && !this.classList.contains('secondary')) {
                this.style.transform = 'skew(-5deg)';
            } else if (this.classList.contains('secondary')) {
                this.style.transform = 'skew(5deg)';
            } else if (this.classList.contains('social-button')) {
                this.style.transform = '';
            }
        });
        
        element.addEventListener('click', function(e) {
            if (this.getAttribute('target') === '_blank' || this.classList.contains('cta-button') || this.classList.contains('social-button')) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                // Console logging effect for clicks
                console.log(`%c> Command executed: ${this.textContent.trim()}`, 'color: #00ff9d; font-family: monospace;');
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
    
    // Code block effects
    const codeBlock = document.querySelector('.code-block');
    if (codeBlock) {
        // Terminal effects instead of syntax highlighting
        const codeElement = codeBlock.querySelector('code');
        if (codeElement) {
            // Store the original text for copying
            const originalText = codeElement.textContent;
            
            // Occasional terminal glitch effect
            setInterval(() => {
                if (Math.random() > 0.9) { // Reduced frequency
                    const lines = codeElement.innerHTML.split('\n');
                    const randomLineIndex = Math.floor(Math.random() * lines.length);
                    
                    if (lines.length > randomLineIndex) {
                        const originalLine = lines[randomLineIndex];
                        // Create more terminal-like glitch
                        lines[randomLineIndex] = `<span style="opacity: 0.7; color: #00ff9d; text-shadow: 0 0 3px #00ff9d;">${scrambleText(originalLine)}</span>`;
                        
                        codeElement.innerHTML = lines.join('\n');
                        
                        setTimeout(() => {
                            lines[randomLineIndex] = originalLine;
                            codeElement.innerHTML = lines.join('\n');
                        }, 150);
                    }
                }
            }, 4000);
        }
        
        // Add copy button with terminal-themed copy text
        const copyButton = document.createElement('button');
        copyButton.innerText = 'Copy';
        copyButton.classList.add('copy-button');
        codeBlock.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
            const code = codeBlock.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerText = 'Saved';
                console.log('%cTERMINAL OUTPUT COPIED', 'color: #00ff9d; font-family: monospace;');
                setTimeout(() => {
                    copyButton.innerText = 'Copy';
                }, 2000);
            });
        });
    }
    
    // Add glitch effect to title occasionally
    const title = document.querySelector('h1.glitch');
    if (title) {
        setInterval(() => {
            if (Math.random() > 0.8) {
                title.style.transform = `translateX(${(Math.random() - 0.5) * 10}px)`;
                title.style.textShadow = '2px 0 #ff3e3e, -2px 0 #00ff9d';
                
                setTimeout(() => {
                    title.style.transform = '';
                    title.style.textShadow = '';
                }, 200);
            }
        }, 4000);
    }
    
    // Make feature items interactive with tech/hacker effects
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        const borderStyle = '3px solid var(--accent-color)';
        
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 255, 157, 0.2)';
            item.style.borderLeft = borderStyle;
            
            // Matrix-like number sequence in corner
            const matrixCorner = document.createElement('div');
            matrixCorner.className = 'matrix-corner';
            matrixCorner.style.position = 'absolute';
            matrixCorner.style.top = '5px';
            matrixCorner.style.right = '5px';
            matrixCorner.style.fontSize = '10px';
            matrixCorner.style.fontFamily = "'Fira Code', monospace";
            matrixCorner.style.color = 'var(--accent-color)';
            matrixCorner.style.opacity = '0.7';
            
            // Generate random number sequence
            let seq = '';
            for (let i = 0; i < 8; i++) {
                seq += Math.floor(Math.random() * 10);
            }
            matrixCorner.textContent = seq;
            
            item.appendChild(matrixCorner);
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '';
            
            // Remove matrix corner
            const corner = item.querySelector('.matrix-corner');
            if (corner) {
                corner.remove();
            }
        });
    });
    
    // Current year for footer
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Easter egg - konami code 
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg triggered!
                document.body.classList.add('konami');
                
                // Add matrix-style rain
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                document.body.appendChild(confetti);
                
                // Create falling code characters
                for (let i = 0; i < 20; i++) {
                    const floater = document.createElement('div');
                    floater.className = 'easter-egg-float';
                    
                    // Hacker-themed symbols
                    floater.innerHTML = ['$', '{', '}', '>', '<', '/', '\\', '|', '_', '0', '1'][Math.floor(Math.random() * 11)];
                    
                    floater.style.left = `${Math.random() * 100}vw`;
                    floater.style.top = `${Math.random() * 100}vh`;
                    floater.style.animationDuration = `${3 + Math.random() * 7}s`;
                    document.body.appendChild(floater);
                    
                    setTimeout(() => {
                        floater.remove();
                    }, 3000);
                }
                
                // Log to console
                console.log("%cACCESS GRANTED", "color: #00ff9d; font-size: 20px; font-family: monospace; text-shadow: 0 0 5px #00ff9d;");
                
                setTimeout(() => {
                    document.body.classList.remove('konami');
                    confetti.remove();
                }, 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Add a terminal command easter egg
    let hackerPattern = [];
    const correctPattern = ['h', 'a', 'c', 'k'];
    
    document.addEventListener('keypress', (e) => {
        hackerPattern.push(e.key);
        if (hackerPattern.length > correctPattern.length) {
            hackerPattern.shift();
        }
        
        if (hackerPattern.join('') === correctPattern.join('')) {
            // Enable terminal mode
            document.body.classList.add('art-mode');
            
            const terminalText = document.createElement('div');
            terminalText.className = 'art-mode-text';
            terminalText.innerHTML = 'ACCESS_GRANTED<span class="blink">_</span>';
            document.body.appendChild(terminalText);
            
            // Terminal sounds (simulated)
            console.log("%cSYSTEM COMPROMISED", "color: #00ff9d; font-family: monospace;");
            
            setTimeout(() => {
                terminalText.remove();
                document.body.classList.remove('art-mode');
            }, 5000);
        }
    });
}); 