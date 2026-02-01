class KashfiaNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
                }
                
                nav {
                    background: rgba(5, 5, 5, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                }
                
                nav.scrolled {
                    background: rgba(5, 5, 5, 0.95);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .nav-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.5rem;
                    color: white;
                    text-decoration: none;
                    letter-spacing: 0.2em;
                    font-weight: 300;
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }
                
                .nav-link {
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    font-size: 0.875rem;
                    letter-spacing: 0.1em;
                    transition: color 0.3s ease;
                    font-weight: 300;
                    text-transform: uppercase;
                }
                
                .nav-link:hover {
                    color: white;
                }
                
                .audio-control {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.5rem 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 9999px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: transparent;
                    color: white;
                }
                
                .audio-control:hover {
                    border-color: rgba(255, 255, 255, 0.5);
                    background: rgba(255, 255, 255, 0.05);
                }
                
                .equalizer {
                    display: flex;
                    gap: 2px;
                    align-items: flex-end;
                    height: 16px;
                }
                
                .bar {
                    width: 2px;
                    background: white;
                    border-radius: 1px;
                    transition: height 0.3s ease;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .audio-control span {
                        display: none;
                    }
                }
            </style>
            
            <nav id="mainNav">
                <div class="nav-container">
                    <a href="#hero" class="logo">K</a>
                    
                    <div class="nav-links">
                        <a href="#about" class="nav-link">About</a>
                        <a href="#stories" class="nav-link">Stories</a>
                        <a href="#gallery" class="nav-link">Gallery</a>
                        <button class="audio-control" onclick="toggleAudio(event)">
                            <div class="equalizer" id="audioEqualizer">
                                <div class="bar" style="height: 8px; animation: bounce 0.5s ease infinite alternate;"></div>
                                <div class="bar" style="height: 12px; animation: bounce 0.7s ease infinite alternate; animation-delay: 0.1s;"></div>
                                <div class="bar" style="height: 6px; animation: bounce 0.6s ease infinite alternate; animation-delay: 0.2s;"></div>
                            </div>
                            <span style="font-size: 0.75rem; letter-spacing: 0.1em;">MUSIC</span>
                            <i id="audioPlayIcon" data-feather="play" style="width: 14px; height: 14px; display: none;"></i>
                            <i id="audioPauseIcon" data-feather="pause" style="width: 14px; height: 14px;"></i>
                        </button>
                    </div>
                    
                    <button class="mobile-menu-btn" onclick="toggleAudio(event)">
                        <div class="equalizer" style="height: 20px;">
                            <div class="bar" style="height: 8px;"></div>
                            <div class="bar" style="height: 14px;"></div>
                            <div class="bar" style="height: 10px;"></div>
                        </div>
                    </button>
                </div>
            </nav>
            
            <style>
                @keyframes bounce {
                    from { transform: scaleY(0.3); }
                    to { transform: scaleY(1); }
                }
            </style>
        `;

        // Handle scroll effect
        window.addEventListener('scroll', () => {
            const nav = this.shadowRoot.getElementById('mainNav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Initialize feather icons in shadow DOM
        if (typeof feather !== 'undefined') {
            feather.replace({ 
                width: 14, 
                height: 14,
                host: this.shadowRoot 
            });
        }
    }
}

customElements.define('kashfia-navbar', KashfiaNavbar);