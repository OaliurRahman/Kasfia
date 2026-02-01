class KashfiaFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #050505;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                footer {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4rem 2rem 2rem;
                }
                
                .footer-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                }
                
                .footer-logo {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2rem;
                    color: white;
                    letter-spacing: 0.3em;
                    font-weight: 300;
                    opacity: 0.8;
                }
                
                .social-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .social-link {
                    color: rgba(255, 255, 255, 0.5);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    text-decoration: none;
                }
                
                .social-link:hover {
                    color: white;
                    border-color: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                
                .divider {
                    width: 1px;
                    height: 40px;
                    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent);
                }
                
                .footer-text {
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 0.875rem;
                    letter-spacing: 0.1em;
                    text-align: center;
                    margin-top: 2rem;
                    font-weight: 300;
                }
                
                .heart {
                    color: rgba(255, 255, 255, 0.5);
                    display: inline-block;
                    animation: pulse 2s ease infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                
                @media (max-width: 640px) {
                    .social-links {
                        gap: 1rem;
                    }
                    
                    .social-link {
                        width: 40px;
                        height: 40px;
                    }
                }
            </style>
            
            <footer>
                <div class="footer-content">
                    <div class="footer-logo">KASHFIA</div>
                    
                    <div class="divider"></div>
                    
                    <div class="social-links">
                        <a href="https://tinyurl.com/2xtp5puc" target="_blank" class="social-link" aria-label="Instagram">
                            <i data-feather="instagram" style="width: 20px; height: 20px;"></i>
                        </a>
                        <a href="mailto:hello@kashfia.com" class="social-link" aria-label="Email">
                            <i data-feather="mail" style="width: 20px; height: 20px;"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="Share">
                            <i data-feather="share-2" style="width: 20px; height: 20px;"></i>
                        </a>
                    </div>
                    
                    <p class="footer-text">
                        Crafted with <span class="heart">♥</span> for a beloved sister<br>
                        <span style="font-size: 0.75rem; margin-top: 0.5rem; display: block;">© 2026 All memories reserved</span>
                    </p>
                </div>
            </footer>
        `;

        if (typeof feather !== 'undefined') {
            feather.replace({ host: this.shadowRoot });
        }
    }
}

customElements.define('kashfia-footer', KashfiaFooter);