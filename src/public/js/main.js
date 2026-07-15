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
    // 7. Custom CountUp statistic counter via GSAP & ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        document.querySelectorAll('.count-number').forEach(num => {
            const targetVal = parseInt(num.getAttribute('data-target'), 10);
            const counterObj = { val: 0 };
            
            gsap.to(counterObj, {
                val: targetVal,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: num,
                    start: 'top 90%',
                    once: true
                },
                onUpdate: () => {
                    num.innerText = Math.ceil(counterObj.val);
                }
            });
        });
    } else {
        // Fallback standard IntersectionObserver in case GSAP fails
        const countNumbers = document.querySelectorAll('.count-number');
        if (countNumbers.length > 0) {
            const countObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetEl = entry.target;
                        const targetVal = parseInt(targetEl.getAttribute('data-target'), 10);
                        let current = 0;
                        const duration = 2000;
                        const stepTime = Math.abs(Math.floor(duration / targetVal));
                        const increment = targetVal > 100 ? Math.ceil(targetVal / 100) : 1;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= targetVal) {
                                targetEl.innerText = targetVal;
                                clearInterval(timer);
                            } else {
                                targetEl.innerText = current;
                            }
                        }, Math.max(stepTime, 15));
                        observer.unobserve(targetEl);
                    }
                });
            }, { threshold: 0.5 });
            countNumbers.forEach(num => countObserver.observe(num));
        }
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

    // 10. Interactive Department Explorer Click Handler
    const explorerBtns = document.querySelectorAll('.dept-explorer-btn');
    explorerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes from all explorer buttons
            explorerBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white', 'border-primary', 'shadow-sm');
            });
            
            // Add active classes to the clicked button
            btn.classList.add('active', 'bg-primary', 'text-white', 'border-primary', 'shadow-sm');
            
            const deptId = btn.getAttribute('data-dept-id');
            
            // Hide all detail cards
            document.querySelectorAll('.dept-details-card').forEach(card => {
                card.classList.add('d-none');
                card.classList.remove('d-block');
            });
            
            // Show the selected card with fade-in effect
            const activeCard = document.getElementById(`dept-card-${deptId}`);
            if (activeCard) {
                activeCard.classList.remove('d-none');
                activeCard.classList.add('d-block');
                
                // Animate entry with GSAP
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(activeCard, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
                }
            }
        });
    });

    // 11. Admissions Smart Eligibility & Fee Calculator Engine
    const calcForm = document.getElementById('fee-calculator-form');
    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const course = document.getElementById('calc-course').value;
            const quota = document.getElementById('calc-quota').value;
            const category = document.getElementById('calc-category').value;
            const rank = parseInt(document.getElementById('calc-rank').value, 10);
            const includeHostel = document.getElementById('calc-hostel').checked;
            
            // Base fees structures
            let tuitionFee = 0;
            let isEligible = true;
            let statusText = "Eligible";
            let statusClass = "bg-success text-white";
            let adviceText = "";
            
            // 1. Calculate Tuition Fee based on Course & Quota
            if (course.startsWith('ug-')) {
                // UG Engineering Fees
                if (quota === 'kcet') {
                    if (category === 'SC_ST') {
                        tuitionFee = 500; // Free-ship / minimal fee
                    } else if (category === 'OBC') {
                        tuitionFee = 68000;
                    } else {
                        tuitionFee = 76000;
                    }
                } else if (quota === 'comedk') {
                    tuitionFee = 160000;
                } else if (quota === 'management') {
                    if (course === 'ug-cse' || course === 'ug-aiml') {
                        tuitionFee = 220000;
                    } else {
                        tuitionFee = 150000;
                    }
                } else {
                    // PGCET chosen for UG
                    isEligible = false;
                    statusText = "Ineligible";
                    statusClass = "bg-danger text-white";
                    adviceText = "PGCET quota is only applicable for postgraduate courses (MBA/MCA). Please select KCET, COMEDK, or Management quota for Bachelor of Engineering.";
                }
            } else {
                // PG Fees (MBA/MCA)
                if (quota === 'pgcet') {
                    if (category === 'SC_ST') {
                        tuitionFee = 500;
                    } else {
                        tuitionFee = 58000;
                    }
                } else if (quota === 'management') {
                    tuitionFee = 110000;
                } else {
                    // KCET/COMEDK chosen for PG
                    isEligible = false;
                    statusText = "Ineligible";
                    statusClass = "bg-danger text-white";
                    adviceText = "KCET and COMEDK entry routes are only applicable for undergraduate engineering programs. Please choose PGCET or Management quota for Postgraduate MBA/MCA.";
                }
            }
            
            // 2. Rank Eligibility check (cutoff thresholds)
            if (isEligible) {
                if (quota === 'kcet') {
                    if (course === 'ug-cse' && rank > 45000) {
                        statusText = "Moderate Odds";
                        statusClass = "bg-warning text-dark";
                        adviceText = "Your rank exceeds the typical KCET CSE cutoff of 45,000. Admission is highly likely via Management Quota or ECE/EEE branches.";
                    } else if (course === 'ug-aiml' && rank > 50000) {
                        statusText = "Moderate Odds";
                        statusClass = "bg-warning text-dark";
                        adviceText = "Your rank exceeds the typical KCET AIML cutoff of 50,000. Consider ECE or Computer Science & Design (CSD) as alternative choices.";
                    } else {
                        statusText = "High Odds";
                        statusClass = "bg-success text-white";
                        adviceText = "Excellent rank! You have outstanding odds of securing a government seat in this branch. Fulfill registration steps immediately.";
                    }
                } else if (quota === 'comedk') {
                    if (rank > 35000) {
                        statusText = "Moderate Odds";
                        statusClass = "bg-warning text-dark";
                        adviceText = "COMEDK seats are competitive. You might need to review alternative branches or utilize Management Quota options.";
                    } else {
                        statusText = "High Odds";
                        statusClass = "bg-success text-white";
                        adviceText = "Great score in COMEDK. You are comfortably within our historical cutoff ranges. You can proceed with standard counseling choice filling.";
                    }
                } else if (quota === 'pgcet') {
                    if (rank > 8000) {
                        statusText = "Moderate Odds";
                        statusClass = "bg-warning text-dark";
                        adviceText = "Your PGCET rank is slightly high. Government seats might fill quickly, but Management Seats remain fully open.";
                    } else {
                        statusText = "High Odds";
                        statusClass = "bg-success text-white";
                        adviceText = "Congratulations! Your PG ranking is highly competitive. You should easily qualify for the PGCET merit list for this PG department.";
                    }
                } else {
                    // Management Quota
                    statusText = "Direct Seat";
                    statusClass = "bg-info text-dark";
                    adviceText = "Management Quota seats are open. Your rank shows good academic standing. Please submit the physical inquiry details to block your seat.";
                }
            }
            
            // 3. Render Results
            const introDiv = document.getElementById('calculator-intro');
            const resultsDiv = document.getElementById('calculator-results');
            
            if (introDiv && resultsDiv) {
                introDiv.classList.add('d-none');
                resultsDiv.classList.remove('d-none');
                
                // Set values
                const badge = document.getElementById('calc-result-badge');
                if (badge) {
                    badge.innerText = statusText;
                    badge.className = `badge text-uppercase px-2.5 py-1.5 ${statusClass}`;
                }
                
                document.getElementById('res-tuition').innerText = tuitionFee.toLocaleString('en-IN') + ' INR';
                
                const uniFee = 12500;
                const labFee = 15000;
                document.getElementById('res-uni').innerText = uniFee.toLocaleString('en-IN') + ' INR';
                document.getElementById('res-lab').innerText = labFee.toLocaleString('en-IN') + ' INR';
                
                let hostelFee = 0;
                const hostelRow = document.getElementById('res-hostel-row');
                if (includeHostel && isEligible) {
                    hostelFee = 85000;
                    if (hostelRow) hostelRow.style.display = 'table-row';
                    document.getElementById('res-hostel').innerText = hostelFee.toLocaleString('en-IN') + ' INR';
                } else {
                    if (hostelRow) hostelRow.style.display = 'none';
                }
                
                const total = isEligible ? (tuitionFee + uniFee + labFee + hostelFee) : 0;
                document.getElementById('res-total').innerText = total.toLocaleString('en-IN') + ' INR';
                document.getElementById('res-odds-desc').innerText = adviceText;
                
                // Animate results panel entry
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(resultsDiv, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
                }
            }
        });
    }

    // 12. Global AI Campus Assistant Chatbot Controller
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInputForm = document.getElementById('chatbot-input-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatIconOpened = document.getElementById('chat-icon-opened');
    const chatIconClosed = document.getElementById('chat-icon-closed');

    if (chatbotToggleBtn && chatbotPanel) {
        // Toggle Panel Open/Close
        const toggleChat = () => {
            const isHidden = chatbotPanel.classList.contains('d-none');
            if (isHidden) {
                chatbotPanel.classList.remove('d-none');
                chatbotPanel.classList.add('d-block');
                chatIconOpened.classList.add('d-none');
                chatIconClosed.classList.remove('d-none');
                // Scroll messages to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                
                // GSAP entrance
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(chatbotPanel, { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.2)' });
                }
            } else {
                chatbotPanel.classList.remove('d-block');
                chatbotPanel.classList.add('d-none');
                chatIconOpened.classList.remove('d-none');
                chatIconClosed.classList.add('d-none');
            }
        };

        chatbotToggleBtn.addEventListener('click', toggleChat);
        if (chatbotCloseBtn) chatbotCloseBtn.addEventListener('click', toggleChat);

        // Pre-programmed Knowledge Base for keyword responses
        const botAnswers = {
            admissions: "AGMRCET admissions for 2026-27 are open. Eligibility requires 10+2 with 45% aggregate in Physics/Maths + Chem/CS/Bio (40% for SC/ST/OBC). Entry modes: KCET, COMEDK, or Management Quota. For details, visit /admissions.",
            courses: "We offer B.E. degrees in CSE, CSE (AI & ML), Computer Science & Design (CSD), Electronics & Communication (ECE), Electrical & Electronics (EEE), Civil (CE), and Mechanical (ME), plus PG programs: MBA and MCA. See our megamenu for details.",
            hostel: "We provide separate secure boys and girls hostels on campus. Features: Wi-Fi, 24/7 hot water, study libraries, secure CCTV surveillance, and hygienic dining mess. Hostel fee is approx. 85,000 INR per year.",
            placement: "Our Training & Placement Cell provides soft skills aptitude classes and technical mock drills starting from the 3rd year. Recruiter partners: TCS, Wipro, Infosys, Capgemini, Tech Mahindra. Highest package secured: 12.0 LPA.",
            portal: "You can sign in to the central ERP portal at /portal. Role accounts are provided for Students, Faculty, Parents, Accounts/Fee section, and Super Admins.",
            default: "Thank you for writing. For immediate counseling assistance, please call our Admission Desk at +91 94810 87999 or email admissions@agmrcet.ac.in. You can also submit an inquiry on our admissions page!"
        };

        const addMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `d-flex align-items-start gap-2 mb-3 ${sender === 'user' ? 'justify-content-end' : ''}`;
            
            const iconHtml = sender === 'bot' 
                ? `<div class="bg-primary text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style="width: 24px; height: 24px; font-size: 10px;"><i class="bi bi-robot"></i></div>`
                : '';
                
            msgDiv.innerHTML = `
                ${iconHtml}
                <div class="${sender === 'user' ? 'bg-primary text-white' : 'bg-white text-navy'} rounded-3 p-2 border shadow-xs" style="max-width: 240px; font-size: 11px;">
                    <p class="m-0">${text}</p>
                </div>
            `;
            
            chatbotMessages.appendChild(msgDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        };

        const handleBotResponse = (query) => {
            const cleanQuery = query.toLowerCase();
            let response = botAnswers.default;
            
            if (cleanQuery.includes('admission') || cleanQuery.includes('eligibility') || cleanQuery.includes('apply') || cleanQuery.includes('cet')) {
                response = botAnswers.admissions;
            } else if (cleanQuery.includes('course') || cleanQuery.includes('branch') || cleanQuery.includes('cse') || cleanQuery.includes('engineering')) {
                response = botAnswers.courses;
            } else if (cleanQuery.includes('hostel') || cleanQuery.includes('mess') || cleanQuery.includes('room') || cleanQuery.includes('accommodation')) {
                response = botAnswers.hostel;
            } else if (cleanQuery.includes('placement') || cleanQuery.includes('job') || cleanQuery.includes('recruiter') || cleanQuery.includes('salary') || cleanQuery.includes('package')) {
                response = botAnswers.placement;
            } else if (cleanQuery.includes('portal') || cleanQuery.includes('erp') || cleanQuery.includes('login') || cleanQuery.includes('signin')) {
                response = botAnswers.portal;
            }
            
            // Simulate bot typing delay
            setTimeout(() => {
                addMessage(response, 'bot');
            }, 500);
        };

        // Form Submit Handler
        chatbotInputForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatbotInput.value.trim();
            if (!text) return;
            
            addMessage(text, 'user');
            chatbotInput.value = '';
            handleBotResponse(text);
        });

        // Quick Option click handler
        document.querySelectorAll('.quick-chat-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query');
                addMessage(query, 'user');
                handleBotResponse(query);
            });
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
