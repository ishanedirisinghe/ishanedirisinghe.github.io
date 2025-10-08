/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';



   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');



   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        
        console.log('Initializing lightbox for', folioLinks.length, 'folio links');

        folioLinks.forEach(function(link, index) {
            const href = link.getAttribute('href');
            
            // Only handle links that start with # (modal links)
            if (href && href.startsWith('#')) {
                const modalElement = document.querySelector(href);
                
                console.log('Setting up modal for:', href, 'Element found:', !!modalElement);
                
                if (modalElement) {
                    // Create lightbox instance for this specific link
                    const instance = basicLightbox.create(
                        modalElement,
                        {
                            onShow: function(instance) {
                                console.log('Modal opened:', href);
                                // Detect Escape key press
                                const escapeHandler = function(event) {
                                    if (event.keyCode === 27) {
                                        instance.close();
                                        document.removeEventListener("keydown", escapeHandler);
                                    }
                                };
                                document.addEventListener("keydown", escapeHandler);
                            },
                            onClose: function(instance) {
                                console.log('Modal closed:', href);
                                return true;
                            }
                        }
                    );

                    // Add click event listener
                    link.addEventListener("click", function(event) {
                        event.preventDefault();
                        console.log('Modal link clicked:', href);
                        instance.show();
                    });
                } else {
                    console.warn('Modal element not found for:', href);
                }
            } else {
                console.log('Skipping non-modal link:', href);
            }
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Portfolio Filter
    * ------------------------------------------------------ */
    const ssPortfolioFilter = function() {
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', ssPortfolioFilter);
            return;
        }
        
        const filterLinks = document.querySelectorAll('.folio-filter__link');
        const portfolioItems = document.querySelectorAll('.folio-list__item');
        
        console.log('DOM Ready - Portfolio filter checking for elements...');
        console.log('Filter links found:', filterLinks.length);
        console.log('Portfolio items found:', portfolioItems.length);
        
        if (!filterLinks.length || !portfolioItems.length) {
            console.warn('Portfolio filter: Missing elements. Links:', filterLinks.length, 'Items:', portfolioItems.length);
            return;
        }
        
        console.log('Portfolio filter initialized successfully');
        
        // Add click event to each filter link
        filterLinks.forEach((link, index) => {
            console.log('Adding event listener to link', index, ':', link.textContent);
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('=== Filter clicked ===');
                console.log('Filter:', this.getAttribute('data-filter'));
                console.log('Text:', this.textContent);
                
                // Remove active class from all links
                filterLinks.forEach(filterLink => {
                    filterLink.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                console.log('Active class added to:', this.textContent);
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Shuffle animation for portfolio items
                const shuffleItems = () => {
                    // First, identify which items will be visible
                    const visibleItems = [];
                    const hiddenItems = [];
                    
                    portfolioItems.forEach((item, itemIndex) => {
                        const itemClasses = Array.from(item.classList);
                        
                        if (filterValue === '*') {
                            visibleItems.push({ item, index: itemIndex });
                        } else {
                            const filterClass = filterValue.replace('.', '');
                            if (item.classList.contains(filterClass)) {
                                visibleItems.push({ item, index: itemIndex });
                            } else {
                                hiddenItems.push({ item, index: itemIndex });
                            }
                        }
                    });
                    
                    console.log('Visible items:', visibleItems.length, 'Hidden items:', hiddenItems.length);
                    
                    // Step 1: Animate out items that will be hidden
                    hiddenItems.forEach(({ item, index }) => {
                        console.log('✗ Animating out item', index);
                        item.classList.add('filtering', 'animate-out');
                        item.classList.remove('animate-in');
                    });
                    
                    // Step 2: Wait for exit animations, then hide items
                    setTimeout(() => {
                        hiddenItems.forEach(({ item }) => {
                            item.classList.add('hidden');
                            item.classList.remove('animate-out', 'filtering');
                            item.style.display = 'none';
                        });
                        
                        // Step 3: Show and animate in visible items with staggered timing
                        visibleItems.forEach(({ item, index }, arrayIndex) => {
                            console.log('✓ Animating in item', index);
                            
                            // Reset item state
                            item.classList.remove('hidden', 'animate-out');
                            item.style.display = 'block';
                            
                            // Add shuffle-in state
                            item.classList.add('shuffle-in');
                            
                            // Stagger the animations
                            setTimeout(() => {
                                item.classList.remove('shuffle-in');
                                item.classList.add('filtering', 'animate-in');
                                
                                // Clean up animation classes after animation completes
                                setTimeout(() => {
                                    item.classList.remove('animate-in', 'filtering');
                                }, 800);
                                
                            }, arrayIndex * 100); // 100ms stagger delay
                        });
                        
                    }, 600); // Wait for exit animation to complete
                };
                
                // Execute shuffle animation
                shuffleItems();
                
                console.log('=== Filter complete ===');
            });
        });
        
    }; // end ssPortfolioFilter


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPortfolioFilter(); // Initialize portfolio filter first
        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();

    })();

})(document.documentElement);