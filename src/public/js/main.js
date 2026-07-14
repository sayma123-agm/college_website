/* ==========================================================================
   AGMRCET Main JavaScript Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fade out page loader on window load
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader-wrapper');
        if (loader) {
            loader.classList.add('fade-out');
        }
    });

    // Fallback: in case window load takes too long, hide loader after 2s
    setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
        }
    }, 2000);

    // 2. Initialize Lenis Smooth Scroll (if available via CDN)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 3. Scroll Progress Indicator & Sticky Navbar scroll effects
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Scroll progress
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }

        // Sticky Navbar background change on scroll
        if (navbar) {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 4. Dark & Light Theme Switcher with localStorage persistence
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    
    // Set initial toggle icons on page load
    const isDark = document.documentElement.classList.contains('dark-theme');
    updateThemeIcons(isDark);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentlyDark = document.documentElement.classList.contains('dark-theme');
            if (currentlyDark) {
                document.documentElement.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
                updateThemeIcons(false);
            } else {
                document.documentElement.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
                updateThemeIcons(true);
            }
        });
    });

    function updateThemeIcons(dark) {
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (dark) {
                    icon.className = 'bi bi-sun-fill fs-5 text-warning';
                } else {
                    icon.className = 'bi bi-moon-stars-fill fs-5';
                }
            }
        });
    }

    // 5. Typed.js animation for Hero Section
    if (document.getElementById('typed-text') && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['Fostering Innovation.', 'Building Leaders.', 'Inspiring Minds.'],
            typeSpeed: 60,
            backSpeed: 45,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // 6. AOS (Animate on Scroll) initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 7. Custom CountUp statistic counter via IntersectionObserver
    const countNumbers = document.querySelectorAll('.count-number');
    if (countNumbers.length > 0) {
        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetEl = entry.target;
                    const targetVal = parseInt(targetEl.getAttribute('data-target'), 10);
                    animateCount(targetEl, targetVal);
                    observer.unobserve(targetEl);
                }
            });
        }, { threshold: 0.5 });

        countNumbers.forEach(num => countObserver.observe(num));
    }

    function animateCount(element, target) {
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        const increment = target > 100 ? Math.ceil(target / 100) : 1;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.innerText = target;
                clearInterval(timer);
            } else {
                element.innerText = current;
            }
        }, Math.max(stepTime, 15));
    }

    // 8. Particles.js configuration (if available via CDN)
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00f2fe"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.25,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.15,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.4
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // 9. Newsletter Form Submission Handling
    const newsletterForm = document.getElementById('newsletter-form');
    const successMsg = document.getElementById('newsletter-success');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (successMsg) {
                successMsg.classList.remove('d-none');
                newsletterForm.reset();
                setTimeout(() => {
                    successMsg.classList.add('d-none');
                }, 3000);
            }
        });
    }
});

// ERP Smart Login Interactive Script
const erpRolesConfig = {
    student: {
        label: 'Student USN / ID',
        placeholder: 'e.g. 2AG22CS001',
        hint: 'Hint: Try USN "2AG22CS001" to log in instantly',
        title: 'Academic Tracker Portal',
        desc: 'Access real-time attendance percentages, internal assessments results, course syllabi guidelines, VTU end-semester marks, and submit elective preferences dynamically.'
    },
    faculty: {
        label: 'Faculty ID Code',
        placeholder: 'e.g. AGM-FAC-101',
        hint: 'Hint: Try Code "AGM-FAC-101" to log in instantly',
        title: 'Academic Management System',
        desc: 'Update daily student attendance ledgers, upload internal assessment scores, configure lesson plan goals, request leaves, and review assigned course schedules.'
    },
    principal: {
        label: 'Principal Authorization Code',
        placeholder: 'e.g. AGM-PRIN-001',
        hint: 'Hint: Try Code "AGM-PRIN-001" to log in instantly',
        title: 'Executive Console',
        desc: 'Review institutional attendance metrics, view real-time department achievements, authorize budget clearances, and run NAAC/NBA accreditation data audits.'
    },
    parent: {
        label: 'Ward USN Number',
        placeholder: 'e.g. 2AG22CS001-P',
        hint: 'Hint: Try Ward Code "2AG22CS001-P" to log in instantly',
        title: 'Parent Care Portal',
        desc: 'Track your child\'s real-time academic progression logs, attendance warning alerts, fee statement dues, and interact directly with class mentors.'
    },
    fee: {
        label: 'Account Office ID',
        placeholder: 'e.g. AGM-FEE-201',
        hint: 'Hint: Try ID "AGM-FEE-201" to log in instantly',
        title: 'Accounts & Fee Desk',
        desc: 'Process semester admission fees, manage online fee invoice receipts, verify scholarship concession applications, and issue hall ticket fee clearances.'
    },
    admin: {
        label: 'Super Admin Username',
        placeholder: 'e.g. AGM-ADMIN-999',
        hint: 'Hint: Try Username "AGM-ADMIN-999" to log in instantly',
        title: 'System Administration Console',
        desc: 'Manage global system configurations, adjust server connection limits, seed department information tables, and manage security authorization keys.'
    }
};

window.switchErpTab = function(role) {
    // 1. Update Hidden Input Value
    const roleInput = document.getElementById('selected-role');
    if (roleInput) roleInput.value = role;

    // 2. Toggle Tab Navigation Classes
    document.querySelectorAll('.erp-tab-btn').forEach(btn => {
        btn.classList.remove('border-primary', 'text-primary', 'font-bold');
        btn.classList.add('border-transparent', 'text-gray-500', 'font-semibold');
    });

    const activeTab = document.getElementById(`tab-${role}`);
    if (activeTab) {
        activeTab.classList.remove('border-transparent', 'text-gray-500', 'font-semibold');
        activeTab.classList.add('border-primary', 'text-primary', 'font-bold');
    }

    // 3. Update Labels, Placeholders, Hints & Info Panels
    const config = erpRolesConfig[role];
    if (config) {
        const userLabel = document.getElementById('username-label');
        const userInput = document.getElementById('erp-username');
        const hintText = document.getElementById('hint-text');
        const infoTitle = document.getElementById('info-title');
        const infoDesc = document.getElementById('info-desc');

        if (userLabel) userLabel.innerText = config.label;
        if (userInput) {
            userInput.placeholder = config.placeholder;
            userInput.value = '';
        }
        if (hintText) hintText.innerText = config.hint;
        if (infoTitle) infoTitle.innerHTML = `<i class="bi bi-patch-check-fill text-primary"></i> ${config.title}`;
        if (infoDesc) infoDesc.innerText = config.desc;
    }
};

window.handleErpSubmit = function(event) {
    event.preventDefault();
    const role = document.getElementById('selected-role').value;
    const username = document.getElementById('erp-username').value;
    
    // Store credentials in sessionStorage to simulate dashboard session load
    sessionStorage.setItem('erp_role', role);
    sessionStorage.setItem('erp_username', username);
    
    // Redirect user to the central ERP Dashboard page
    window.location.href = '/portal';
};
