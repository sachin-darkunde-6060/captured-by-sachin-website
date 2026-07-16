/**
 * CAPTURED BY SACHIN - PREMIUM PORTFOLIO SYSTEM
 * Engineered in modern ES2025 Architecture
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Smooth Scrolling Framework Initialize
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ==========================================
    // 01. INTUITIVE SIMULATED SENSOR LOADER
    // ==========================================
    const loader = document.getElementById("loader");
    const progressFill = document.querySelector(".loader-progress-fill");
    const loaderStatus = document.querySelector(".loader-status");
    
    const statuses = [
        "Calibrating Matrix...",
        "Cleaning Optical Path...",
        "Optimizing ISO Elements...",
        "Setting Exposure Balance...",
        "Ready to Capture"
    ];

    let currentProgress = 0;
    let statusIndex = 0;

    const loaderInterval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 5;
        if (currentProgress > 100) currentProgress = 100;

        progressFill.style.width = `${currentProgress}%`;

        if (currentProgress % 25 === 0 && statusIndex < statuses.length - 1) {
            statusIndex++;
            loaderStatus.innerText = statuses[statusIndex];
        }

        if (currentProgress === 100) {
            clearInterval(loaderInterval);
            setTimeout(() => {
                loader.classList.add("loaded");
                // Run Entrance Animations Once Loader Closes
                initEntranceAnimations();
            }, 600);
        }
    }, 100);

    // ==========================================
    // 02. FLUID ENTRANCE ANIMATIONS
    // ==========================================
    function initEntranceAnimations() {
        gsap.from(".hero-badge", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });

        gsap.from(".hero-title", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.2,
            ease: "power4.out"
        });

        gsap.from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1.2,
            delay: 0.4,
            ease: "power4.out"
        });

        gsap.from(".hero-actions", {
            y: 30,
            opacity: 0,
            duration: 1.2,
            delay: 0.6,
            ease: "power4.out"
        });
    }

    // ==========================================
    // 03. INTERACTIVE MOUSE GRADIENT FOLLOWER
    // ==========================================
    const cursor = document.getElementById("customCursor");
    const cursorDot = document.getElementById("customCursorDot");

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out"
        });
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Expand pointer elements on Interactive Tags
    const interactiveElements = document.querySelectorAll("a, button, .category-card, .portfolio-card, input, select, textarea");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.width = "45px";
            cursor.style.height = "45px";
            cursor.style.backgroundColor = "rgba(108, 99, 255, 0.15)";
            cursor.style.borderColor = "#6C63FF";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.width = "25px";
            cursor.style.height = "25px";
            cursor.style.backgroundColor = "transparent";
            cursor.style.borderColor = "#FFFFFF";
        });
    });

    // ==========================================
    // 04. FLOATING MOBILE MENU LOGIC
    // ==========================================
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle("active");
        mobileNavOverlay.classList.toggle("active");
        
        // Disable page scroll when menu portal is active
        if (isMenuOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }
    };

    menuToggle.addEventListener("click", toggleMenu);
    mobileLinks.forEach(link => link.addEventListener("click", toggleMenu));

    // ==========================================
    // 05. SCROLL TRIGGERED STAT COUNTER BANNER
    // ==========================================
    const statNumbers = document.querySelectorAll(".stat-number");
    
    const countToStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"));
            const countObj = { val: 0 };
            
            gsap.to(countObj, {
                val: target,
                duration: 2.5,
                ease: "power3.out",
                onUpdate: () => {
                    stat.innerText = Math.floor(countObj.val);
                },
                scrollTrigger: {
                    trigger: ".section-banner-stats",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    };
    countToStats();

    // ==========================================
    // 06. PORTFOLIO ENGINE (Masonry & Filter Setup)
    // ==========================================
    const filters = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".masonry-item");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            // Remove active classes
            filters.forEach(btn => btn.classList.remove("active"));
            filter.classList.add("active");

            const filterValue = filter.getAttribute("data-filter");

            items.forEach(item => {
                const category = item.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    item.style.display = "block";
                    gsap.fromTo(item, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
                } else {
                    item.style.display = "none";
                }
            });
            
            // Recalculate layout
            ScrollTrigger.refresh();
        });
    });

    // ==========================================
    // 07. INTERACTIVE BEFORE/AFTER SLIDER ENGINE
    // ==========================================
    const sliderContainer = document.getElementById("sliderContainer");
    const sliderHandle = document.getElementById("sliderHandle");
    const afterImage = document.getElementById("afterImage");

    const dragHandle = (e) => {
        const bounds = sliderContainer.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const relativeX = clientX - bounds.left;
        
        let positionPercent = (relativeX / bounds.width) * 100;
        if (positionPercent < 0) positionPercent = 0;
        if (positionPercent > 100) positionPercent = 100;

        sliderHandle.style.left = `${positionPercent}%`;
        afterImage.style.clipPath = `polygon(${positionPercent}% 0, 100% 0, 100% 100%, ${positionPercent}% 100%)`;
    };

    let isSliding = false;

    sliderContainer.addEventListener("mousedown", () => isSliding = true);
    document.addEventListener("mouseup", () => isSliding = false);
    document.addEventListener("mousemove", (e) => {
        if (!isSliding) return;
        dragHandle(e);
    });

    // Support Touch Gestures
    sliderContainer.addEventListener("touchstart", () => isSliding = true);
    document.addEventListener("touchend", () => isSliding = false);
    document.addEventListener("touchmove", (e) => {
        if (!isSliding) return;
        dragHandle(e);
    });

    // ==========================================
    // 08. LIGHTBOX SHOWCASE ENGINE
    // ==========================================
    const lightboxPortal = document.getElementById("lightboxPortal");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.querySelector(".lightbox-close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const viewButtons = document.querySelectorAll(".view-project-btn");

    let currentImgIndex = 0;
    const imagesToPreview = Array.from(document.querySelectorAll(".portfolio-card img"));

    const openLightbox = (index) => {
        currentImgIndex = index;
        lightboxImg.src = imagesToPreview[currentImgIndex].src;
        lightboxPortal.classList.add("active");
        lightboxPortal.setAttribute("aria-hidden", "false");
        lenis.stop();
    };

    const closeLightbox = () => {
        lightboxPortal.classList.remove("active");
        lightboxPortal.setAttribute("aria-hidden", "true");
        lenis.start();
    };

    const showNextImg = () => {
        currentImgIndex = (currentImgIndex + 1) % imagesToPreview.length;
        lightboxImg.src = imagesToPreview[currentImgIndex].src;
    };

    const showPrevImg = () => {
        currentImgIndex = (currentImgIndex - 1 + imagesToPreview.length) % imagesToPreview.length;
        lightboxImg.src = imagesToPreview[currentImgIndex].src;
    };

    viewButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => openLightbox(index));
    });

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", showNextImg);
    prevBtn.addEventListener("click", showPrevImg);

    // Support escape key & keyboard actions
    document.addEventListener("keydown", (e) => {
        if (!lightboxPortal.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNextImg();
        if (e.key === "ArrowLeft") showPrevImg();
    });

    // ==========================================
    // 09. TESTIMONIAL SLIDER IMPLEMENTATION
    // ==========================================
    const track = document.getElementById("testimonialTrack");
    const slides = Array.from(track.children);
    const nextTestimonialBtn = document.getElementById("nextTestimonial");
    const prevTestimonialBtn = document.getElementById("prevTestimonial");
    
    let currentSlideIndex = 0;

    const moveSlide = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    nextTestimonialBtn.addEventListener("click", () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        moveSlide(currentSlideIndex);
    });

    prevTestimonialBtn.addEventListener("click", () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        moveSlide(currentSlideIndex);
    });

    // ==========================================
    // 10. ACCORDION (FAQ LOGIC)
    // ==========================================
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            item.classList.toggle("active");
        });
    });

    // ==========================================
    // 11. PREMIUM RESERVATION FORM TRANSMISSION
    // ==========================================
    const form = document.getElementById("premiumBookingForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Generate high-end interactive visual success alert
        const transmitBtn = form.querySelector(".submit-btn-premium");
        transmitBtn.innerHTML = "Syncing Frame Data... <i class='fa-solid fa-spinner fa-spin'></i>";
        
        setTimeout(() => {
            transmitBtn.innerHTML = "Transmit Complete! <i class='fa-solid fa-check'></i>";
            transmitBtn.style.backgroundColor = "#28a745";
            
            // Reset form gracefully
            setTimeout(() => {
                form.reset();
                transmitBtn.innerHTML = "Transmit Request <i class='fa-solid fa-paper-plane'></i>";
                transmitBtn.style.backgroundColor = "var(--primary-accent)";
            }, 3000);
        }, 2000);
    });
});