// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.animate-up').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-main');
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Project Filtering
document.querySelectorAll('.btn-filter').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        const projects = document.querySelectorAll('.grid-item');

        projects.forEach(project => {
            if(filter === 'all') {
                project.classList.remove('hide');
            } else {
                if(project.classList.contains(filter)) {
                    project.classList.remove('hide');
                } else {
                    project.classList.add('hide');
                }
            }
        });
    });
});
// Intersection Observer for footer animations
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            document.querySelectorAll('.animate-slide').forEach(el => {
                el.classList.add('active');
            });
        }
    });
});

footerObserver.observe(document.querySelector('.footer-section'));


// Scroll to Top Button
const scrollBtn = document.querySelector('.scroll-top-btn');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// WhatsApp Button Animation
const whatsappBtn = document.querySelector('.whatsapp-btn');

whatsappBtn.addEventListener('mouseenter', () => {
    whatsappBtn.style.animation = 'none';
});

whatsappBtn.addEventListener('mouseleave', () => {
    whatsappBtn.style.animation = 'pulse 2s infinite';
});

// About js
const circuitLine = document.querySelector('.circuit-line');
const techAnimation = document.querySelector('.tech-path-animation');

const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            circuitLine.style.animationPlayState = 'running';
        } else {
            circuitLine.style.animationPlayState = 'paused';
        }
    });
});

techObserver.observe(techAnimation);

// Floating badges animation
const floatingBadges = document.querySelectorAll('.floating-badge');
floatingBadges.forEach(badge => {
    badge.style.animationDelay = Math.random() * 2 + 's';
});


// Team Section Animation
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                const duration = 2000; // Animation duration in ms
                const step = Math.floor(duration / count);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += Math.ceil(count / (duration / 50));
                    if (current > count) {
                        current = count;
                        clearInterval(timer);
                    }
                    target.textContent = current;
                }, 20);
                
                observer.unobserve(target);
            }
        });
    }, options);
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
    
    // Parallax effect for team cards
    const teamCards = document.querySelectorAll('.team-member-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
            card.style.transform = `translateY(-10px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) rotateY(0) rotateX(0)';
        });
    });
    
    // Animate team section when scrolled into view
    const teamSection = document.querySelector('.team-section');
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const teamMembers = document.querySelectorAll('.team-member-card');
                teamMembers.forEach((member, index) => {
                    setTimeout(() => {
                        member.style.opacity = '1';
                        member.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                // Animate CEO card
                const ceoCard = document.querySelector('.ceo-card');
                ceoCard.style.opacity = '1';
                ceoCard.style.transform = 'translateY(0)';
                
                teamObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    teamObserver.observe(teamSection);
    
    // Set initial states for animation
    document.querySelectorAll('.team-member-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    document.querySelector('.ceo-card').style.opacity = '0';
    document.querySelector('.ceo-card').style.transform = 'translateY(30px)';
    document.querySelector('.ceo-card').style.transition = 'all 0.6s ease 0.3s';
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (contactForm.checkValidity()) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const loadingIcon = submitBtn.querySelector('.loading-icon');
            
            submitText.classList.add('d-none');
            loadingIcon.classList.remove('d-none');
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                
                // Show success message (you can use a toast or alert)
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset button state
                submitText.classList.remove('d-none');
                loadingIcon.classList.add('d-none');
            }, 2000);
        }
        
        contactForm.classList.add('was-validated');
    }, false);
    
    // Animate contact section elements when scrolled into view
    const contactSection = document.querySelector('.contact-section');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate form card
                const formCard = document.querySelector('.contact-form-card');
                formCard.style.opacity = '1';
                formCard.style.transform = 'translateY(0)';
                
                // Animate info cards with delay
                const infoCards = document.querySelectorAll('.contact-info-card');
                infoCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    contactObserver.observe(contactSection);
    
    // Set initial states for animation
    document.querySelector('.contact-form-card').style.opacity = '0';
    document.querySelector('.contact-form-card').style.transform = 'translateY(30px)';
    document.querySelector('.contact-form-card').style.transition = 'all 0.6s ease';
    
    document.querySelectorAll('.contact-info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
});



const slides = document.getElementById("slides");
    const totalSlides = slides.children.length;
    let index = 0;

    function showSlide(i) {
      index = (i + totalSlides) % totalSlides;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
      showSlide(index + 1);
    }

    function prevSlide() {
      showSlide(index - 1);
    }

    // Auto slide every 5 seconds
    setInterval(() => {
      nextSlide();
    }, 5000);