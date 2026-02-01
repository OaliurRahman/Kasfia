// Audio Player Functionality
const audio = document.getElementById('bgMusic');
let isPlaying = false;

// Initialize Audio State
document.addEventListener('DOMContentLoaded', () => {
    // Try to handle autoplay with user interaction
    const startAudio = () => {
        audio.volume = 0.3; // Set comfortable volume
        audio.play().then(() => {
            isPlaying = true;
            updateAudioIcon();
        }).catch(error => {
            console.log('Autoplay prevented:', error);
            isPlaying = false;
            updateAudioIcon();
        });
    };

    // Attempt autoplay
    startAudio();

    // Add click listener to document for first interaction if autoplay fails
    document.addEventListener('click', function initAudio() {
        if (!isPlaying && audio.paused) {
            startAudio();
        }
        document.removeEventListener('click', initAudio);
    }, { once: true });

    // Initialize Scroll Animations
    initScrollAnimations();
    
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Toggle Audio Play/Pause
function toggleAudio(event) {
    if (event) event.stopPropagation();
    
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
    updateAudioIcon();
}

// Update Audio Icon based on state
function updateAudioIcon() {
    const playIcon = document.getElementById('audioPlayIcon');
    const pauseIcon = document.getElementById('audioPauseIcon');
    const equalizer = document.getElementById('audioEqualizer');
    
    if (playIcon && pauseIcon) {
        if (isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            if (equalizer) equalizer.classList.remove('audio-paused');
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            if (equalizer) equalizer.classList.add('audio-paused');
        }
    }
}

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Always trigger animation when element comes into view
                entry.target.classList.add('revealed');
                
                // Handle line animations
                if (entry.target.classList.contains('line-animate')) {
                    entry.target.classList.add('revealed');
                }
            } else {
                // Remove animation when element leaves view so it can animate again
                entry.target.classList.remove('revealed');
            }
        });
    }, observerOptions);

    // Observe all elements with reveal-on-scroll class
    document.querySelectorAll('.reveal-on-scroll').forEach((el, index) => {
        observer.observe(el);
    });
    
    // Force check for elements already in viewport on initial load
    setTimeout(() => {
        document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('revealed');
            }
        });
    }, 100);
}

// Story Modal Data
const stories = [
    { src: 'kapi 1.png', caption: '' },
    { src: 'kapi 2.png', caption: '' },
    { src: 'kapi 3.png', caption: '' },
    { src: 'kapi 4.png', caption: '' },
    { src: 'kapi 5.png', caption: '' }
];

// Open Story Modal
function openStory(index) {
    const modal = document.getElementById('storyModal');
    const img = document.getElementById('storyImage');
    const caption = document.getElementById('storyCaption');
    
    if (stories[index]) {
        img.src = stories[index].src;
        caption.textContent = stories[index].caption;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Close Story Modal
function closeStory() {
    const modal = document.getElementById('storyModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Gallery Data
const galleryImages = [
    'kapi 6.png',
    'kapi 7.png',
    'kapi 8.png',
    'kapi 9.png',
    'kapi 10.png',
    'kapi 11.png',
    'kapi 12.png',
    'kapi 13.png',
    'kapi 14.jpg'
];

let currentImageIndex = 0;

// Open Lightbox
function openLightbox(index) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    
    currentImageIndex = index;
    img.src = galleryImages[index];
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close Lightbox
function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Change Image in Lightbox
function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    
    const img = document.getElementById('lightboxImage');
    img.style.opacity = '0';
    
    setTimeout(() => {
        img.src = galleryImages[currentImageIndex];
        img.style.opacity = '1';
    }, 200);
}

// Close modals on backdrop click
document.getElementById('storyModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeStory();
});

document.getElementById('lightboxModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeStory();
        closeLightbox();
    }
    if (!document.getElementById('lightboxModal').classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}

// Quote Slider Functionality
const quotes = [
    {
        lines: [
            "She walks in beauty, like the night",
            "Of cloudless climes and starry skies;",
            "One shade the more, one ray the less,",
            "Had half impaired the nameless grace",
            "Which waves in every raven tress,",
            "Or softly lightens o'er her face;"
        ],
        author: "Lord Byron",
        title: "She Walks in Beauty"
    },
    {
        lines: [
            "Where thoughts serenely sweet express,",
            "How pure, how dear their dwelling-place.",
            "And on that cheek, and o'er that brow,",
            "So soft, so calm, yet eloquent,",
            "The smiles that win, the tints that glow,",
            "But tell of days in goodness spent."
        ],
        author: "Lord Byron",
        title: "She Walks in Beauty"
    },
    {
        lines: [
            "A sister is a little bit of childhood",
            "That can never be lost,",
            "A bond that time cannot sever,",
            "A love that knows no cost."
        ],
        author: "Unknown",
        title: "Sisterhood"
    },
    {
        lines: [
            "Hope is the thing with feathers",
            "That perches in the soul,",
            "And sings the tune without the words,",
            "And never stops at all."
        ],
        author: "Emily Dickinson",
        title: "Hope"
    }
];

let currentQuoteIndex = 0;
let quoteInterval;
let isQuoteAutoplayPaused = false;

function initQuoteSlider() {
    const track = document.getElementById('quoteTrack');
    const dotsContainer = document.getElementById('quoteDots');
    
    if (!track || !dotsContainer) return;
    
    // Clear existing content
    track.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Generate slides
    quotes.forEach((quote, index) => {
        const slide = document.createElement('div');
        slide.className = 'quote-slide w-full flex-shrink-0 px-4 md:px-12';
        slide.innerHTML = `
            <div class="text-center">
                <div class="font-serif text-5xl md:text-7xl text-luxury-muted/20 mb-6">"</div>
                <div class="quote-content mb-8 space-y-3">
                    ${quote.lines.map((line, i) => `
                        <div class="quote-line font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-white font-light italic" 
                             data-line-index="${i}">
                            ${line}
                        </div>
                    `).join('')}
                </div>
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-luxury-muted to-transparent mx-auto mt-8 mb-6 quote-line-divider" style="opacity: 0; transform: scaleX(0);"></div>
                <p class="text-luxury-muted text-sm md:text-base font-sans tracking-widest uppercase quote-author" style="opacity: 0; transform: translateY(10px);">— ${quote.author}</p>
                ${quote.title ? `<p class="text-luxury-muted/50 text-xs mt-2 font-serif italic quote-title" style="opacity: 0;">${quote.title}</p>` : ''}
            </div>
        `;
        track.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('button');
        dot.className = `h-1.5 rounded-full transition-all duration-500 ${index === 0 ? 'bg-white w-8' : 'bg-white/20 w-1.5 hover:bg-white/40'}`;
        dot.onclick = () => goToQuote(index);
        dot.setAttribute('aria-label', `Go to quote ${index + 1}`);
        dotsContainer.appendChild(dot);
    });
    
    // Animate first quote
    setTimeout(() => animateQuoteLines(0), 300);
    
    // Start auto-slide
    startQuoteAutoplay();
}

function animateQuoteLines(index) {
    const slides = document.querySelectorAll('.quote-slide');
    if (!slides[index]) return;
    
    const slide = slides[index];
    const lines = slide.querySelectorAll('.quote-line');
    const divider = slide.querySelector('.quote-line-divider');
    const author = slide.querySelector('.quote-author');
    const title = slide.querySelector('.quote-title');
    
    // Reset all first
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
        line.style.filter = 'blur(10px)';
        line.style.transition = 'none';
    });
    
    if (divider) {
        divider.style.opacity = '0';
        divider.style.transform = 'scaleX(0)';
    }
    if (author) {
        author.style.opacity = '0';
        author.style.transform = 'translateY(10px)';
    }
    if (title) {
        title.style.opacity = '0';
    }
    
    // Trigger reflow
    slide.offsetHeight;
    
    // Animate lines sequentially
    lines.forEach((line, i) => {
        setTimeout(() => {
            line.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            line.style.filter = 'blur(0)';
        }, i * 200);
    });
    
    // Animate divider
    if (divider) {
        setTimeout(() => {
            divider.style.transition = 'all 0.6s ease-out';
            divider.style.opacity = '1';
            divider.style.transform = 'scaleX(1)';
        }, lines.length * 200 + 200);
    }
    
    // Animate author
    if (author) {
        setTimeout(() => {
            author.style.transition = 'all 0.8s ease-out';
            author.style.opacity = '1';
            author.style.transform = 'translateY(0)';
        }, lines.length * 200 + 400);
    }
    
    // Animate title
    if (title) {
        setTimeout(() => {
            title.style.transition = 'opacity 0.8s ease-out';
            title.style.opacity = '1';
        }, lines.length * 200 + 600);
    }
}
function goToQuote(index) {
    if (index === currentQuoteIndex) return;
    
    const track = document.getElementById('quoteTrack');
    const dotsContainer = document.getElementById('quoteDots');
    if (!track || !dotsContainer) return;
    
    const dots = dotsContainer.children;
    
    currentQuoteIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    Array.from(dots).forEach((dot, i) => {
        dot.className = `h-1.5 rounded-full transition-all duration-500 ${i === index ? 'bg-white w-8' : 'bg-white/20 w-1.5 hover:bg-white/40'}`;
    });
    
    // Animate lines after transition
    setTimeout(() => animateQuoteLines(index), 400);
    
    // Only reset autoplay timer if not already playing
    if (!quoteInterval) {
        startQuoteAutoplay();
    }
}
function nextQuote() {
    const newIndex = (currentQuoteIndex + 1) % quotes.length;
    goToQuote(newIndex);
}

function prevQuote() {
    const newIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    goToQuote(newIndex);
}
function startQuoteAutoplay() {
    if (quoteInterval) clearInterval(quoteInterval);
    isQuoteAutoplayPaused = false;
    quoteInterval = setInterval(nextQuote, 4000); // Auto-advance every 4 seconds
}
function pauseQuoteAutoplay() {
    isQuoteAutoplayPaused = true;
    if (quoteInterval) {
        clearInterval(quoteInterval);
        quoteInterval = null;
    }
}

function resumeQuoteAutoplay() {
    isQuoteAutoplayPaused = false;
    startQuoteAutoplay();
}

// Initialize Quote Slider on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initQuoteSlider();
        // Ensure autoplay starts after a small delay
        setTimeout(() => {
            startQuoteAutoplay();
        }, 1000);
    }, 500);
});

// Keyboard navigation for quotes
document.addEventListener('keydown', (e) => {
    const quoteSection = document.getElementById('quote');
    if (!quoteSection) return;
    
    const rect = quoteSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        if (e.key === 'ArrowLeft') prevQuote();
        if (e.key === 'ArrowRight') nextQuote();
    }
});

// Touch Swipe Support for Quotes on Mobile
let touchStartX = 0;
let touchEndX = 0;

function handleQuoteSwipe() {
    if (touchStartX - touchEndX > 50) {
        // Swiped left - next quote
        nextQuote();
    }
    if (touchEndX - touchStartX > 50) {
        // Swiped right - previous quote
        prevQuote();
    }
}

const quoteSection = document.getElementById('quote');
if (quoteSection) {
    quoteSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    quoteSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleQuoteSwipe();
    }, false);
}

