$(document).ready(function () {
    console.log('READY TO RUMBLE');

    var productNavIsOpen = false;
    let mm = gsap.matchMedia();

    productNav();
    homeHeader();
    topbarColorRotation();
    splitTextAnim();
    divided();
    fullImgMelt();
    articlePage();
    blockFeatured();
    blog();
    singleProduct();
    dropdowns();
    switches();
    footerScroll();

    function productNav() {

        $('.product-nav-trigger').on('click', function (e) {
            e.preventDefault();

            if (!productNavIsOpen) {
                $('.product-nav').addClass('product-nav--is-open');
                $('.topbar').addClass('topbar--product-open');
                productNavIsOpen = true;
            } else {
                $('.product-nav').removeClass('product-nav--is-open');
                $('.topbar').removeClass('topbar--product-open');
                productNavIsOpen = false;
            }
        });

        $('.blur-all').on('click', function () {
            if (productNavIsOpen) {
                $('.product-nav').removeClass('product-nav--is-open');
                $('.topbar').removeClass('topbar--product-open');
                productNavIsOpen = false;
            }
        });

        $('.product-nav__item').each(function () {
            var thisImgs = $(this).find('.product-nav__imgs'),
                thisImgWrapper = thisImgs.find('.product-nav__imgs-wrapper'),
                thisTitle = $(this).find('.product-nav__title'),
                thisMainTitle = $(this).find('.product-nav__title__main'),
                thisSubTitle = $(this).find('.product-nav__title__sub');

            gsap.to(thisImgWrapper, {
                scrollTrigger: {
                    scroller: '.product-nav__wrapper',
                    trigger: thisImgs,
                    start: 'top bottom',
                    end: 'bottom top',
                    // markers: true,
                    scrub: 1
                },
                y: '100'
            });

            gsap.from(thisImgWrapper, {
                scrollTrigger: {
                    scroller: '.product-nav__wrapper',
                    trigger: thisImgs,
                    start: 'top bottom',
                    end: 'center bottom',
                    // markers: true,
                    scrub: 1
                },
                autoAlpha: 0
            });

            let productTitle = gsap.timeline({
                scrollTrigger: {
                    scroller: '.product-nav__wrapper',
                    trigger: thisTitle,
                    start: 'center bottom',
                    onLeaveBack() {
                        productTitle.reverse(2);
                    },
                }
            });

            productTitle.from(thisMainTitle, { autoAlpha: 0, yPercent: 25, rotate: 1.5 })
                .from(thisSubTitle, { autoAlpha: 0, yPercent: 25, rotate: 1.5, delay: -.25 });

        });

    };

    function homeHeader() {

        var switchLogos = gsap.timeline({
            scrollTrigger: {
                trigger: '.header__logo',
                start: 'top 25%',
                end: 'bottom center',
                scrub: 1
            }
        });

        if ($('.header--home video').length) {

            ScrollTrigger.create({
                trigger: '.header--home',
                start: 'bottom top',
                end: 10000000,
                onEnter: self => {
                    $('.header--home video')[0].pause();
                },
                onLeaveBack: self => {
                    $('.header--home video')[0].play();
                }
            });

        };

        gsap.to('.header--home__media', {
            scrollTrigger: {
                trigger: '.header--home',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            yPercent: 15
        });

        switchLogos
            .to('.header__logo__de', { autoAlpha: 0 }, "de")
            .to('.header__logo__sal', { autoAlpha: 0 }, "de+=.1")
            .to('.header__logo__menorca', { autoAlpha: 0 }, "de+=.2");

    };

    function topbarColorRotation() {

        gsap.set('.topbar__sigle__s', { 'transformOrigin': 'center' });

        let rotateSScroll = ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            // markers: true,
            refreshPriority: -2000,
            onUpdate: self => {
                // gsap.to('.topbar__sigle__s', { rotate: - self.progress * 1000 });
                gsap.to('.topbar__sigle__s', { rotate: - self.scroll() / 25 });
            }
        });

        // gsap.to('.topbar__sigle__s', { rotate: - rotateSScroll.scroll() });


        var items = [];

        $('[data-topbar-class]').each(function (e) {


            items.push($(this));
            var index = e;

            var thisTopbarClass = $(this).data('topbar-class');

            var next = $(this).next('[data-topbar-class]');
            var previous = $(this).prev('[data-topbar-class]');
            var previousTopbarClass = previous.data('topbar-class');

            ScrollTrigger.create({
                trigger: $(this),
                start: () => { return 'top ' + $('.topbar').outerHeight(true) / 2 + 'px' },
                endTrigger: next,
                end: 'bottom 40px',
                invalidateOnRefresh: true,
                refreshPriority: -1000,
                //markers: true,
                onEnter: () => {
                    // console.log('ENTER');
                    $('.topbar')
                        .removeClass('topbar--light topbar--dark')
                        .addClass(thisTopbarClass);
                },

                onLeaveBack: (e) => {

                    //console.log($(items[index - 1]).data('topbar-class'));

                    var tobBarClass = $(items[index - 1]).data('topbar-class');

                    $('.topbar')
                        .removeClass('topbar--light topbar--dark')
                        .addClass(tobBarClass);
                }
            });
        });

        // console.log(items);

    };

    function splitTextAnim() {

        $('.block--text p, .article-blockquote p, .next-article__title').each(function () {
            var split = $(this).splitText({ type: 'words', useLite: true });
            var words = $(this).find('span');
            var parentIndex = $(this).parents('.section').index();

            gsap.from(words, {
                scrollTrigger: {
                    trigger: $(this),
                    start: 'bottom bottom',
                    end: 'bottom center',
                    scrub: 1,
                    refreshPriority: - parentIndex
                },
                stagger: {
                    each: 0.1,
                },
                autoAlpha: 0,
                yPercent: 50
            });
        });

    };

    function divided() {
        $('.divided').each(function () {
            var parentIndex = $(this).parents('.section').index();
            var $this = $(this);
            var $thisSection = $this.parents('.section--divided');
            var $thisSingleMedia = $(this).find('.divided__side--single-media');
            var $thisItems = $this.find('.multiple__item');
            var numOfItem = $thisItems.length;
            var $thisMainImg = $this.find('.single-media img, .single-media video');
            var parentIndex = $(this).parents('.section').index();

            var curtainAnim = gsap.timeline({
                scrollTrigger: {
                    trigger: $this,
                    pin: true,
                    start: 'top top', // when the top of the trigger hits the top of the viewport
                    start: () => {
                        return window.innerWidth >= 768 ? 'top top' : 'center center'
                    }, // when the top of the trigger hits the top of the viewport
                    end: () => {
                        return '+=' + window.innerHeight * numOfItem;
                    },
                    scrub: 1,
                    refreshPriority: - parentIndex,
                    // snap: 1 / (numOfItem - 1),
                    snap: {
                        snapTo: 1 / (numOfItem - 1), // progress increment
                        // or "labels" or function or Array
                        duration: 0.85,
                        directional: true,
                        ease: Expo.easeOut,
                        delay: .01,

                        // other callbacks: onStart, onInterrupt
                    },
                    // onEnter: function () {
                    //     if ($this.find(".single-media video").length) {
                    //         $this.find(".single-media video")[0].play();
                    //     }
                    //     console.log('ENTERRRRRRRRRR');
                    // },
                    // onLeave: function () {
                    //     if ($this.find(".single-media video").length) {
                    //         $this.find(".single-media video")[0].pause();
                    //     }
                    // },
                    //snap: "labelsDirectional"

                }
            });

            if ($thisMainImg.length) {
                gsap.from($thisMainImg, {
                    scrollTrigger: {
                        trigger: $thisSection,
                        start: 'top top',
                        end: () => {
                            return '+=' + window.innerHeight * numOfItem;
                        },
                        scrub: 1
                    },
                    scale: 1.2
                });
            }

            gsap.from($thisSingleMedia, {
                scrollTrigger: {
                    trigger: $thisSection,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1
                },
                yPercent: 10
            });



            for (let i = 0; i < numOfItem - 1; i++) {

                curtainAnim
                    .to($thisItems[i], { '--top-left': '0%', duration: 1 }, 'item-' + i)
                    .to($thisItems[i], { '--top-right': '0%', duration: 1 }, 'item-' + i)
                    .to(
                        $thisItems.eq(i).find('img'),
                        { opacity: 0.25, duration: 1 },
                        'item-' + i
                    )
                    .from(
                        $thisItems.eq(i + 1).find('img'),
                        { scale: 1.1, '--blur': 10 + 'px', opacity: 0.25, duration: 1 },
                        'item-' + i
                    )
                    .from(
                        $thisItems.eq(i + 1).find('.btn'),
                        { opacity: 0, duration: 0.5, stagger: 0.1 },
                        'item-' + i + '+=.5'
                    );
            };
        });

        $('.section--divided').each(function(){
            var $this = $(this);

            if ($this.find('.single-media video').length) {
                ScrollTrigger.create({
                    trigger: $this,
                    start: 'top center',
                    end: 'bottom center',
                    refreshPriority: -10000,
                    onEnter: function () {
                       $this.find('.single-media video')[0].play();
                    },
                    onEnterBack: function(){
                        $this.find('.single-media video')[0].play();
                    },
                    onLeave: function () {
                        $this.find('.single-media video')[0].pause();
                    },
                    onLeaveBack: function () {
                        $this.find('.single-media video')[0].pause();
                    },
                });
            };
        });
    
    };

    function fullImgMelt() {

        $('.block--full-image').each(function () {
            var $this = $(this);
            var parentIndex = $(this).parents('.section').index();

            var fullImgMedia = gsap.timeline({
                scrollTrigger: {
                    trigger: $this,
                    // trigger: '.section--full-image',
                    pin: true,
                    anticipatePin: 1,
                    start: 'top top',
                    end: () => {
                        return '+=' + window.innerHeight;
                        //return "+=" + window.innerHeight / 3;
                    },
                    scrub: .5,
                    refreshPriority: - parentIndex
                }
            });

            fullImgMedia.to('.full-image-media', { '--mask-dot-width-in': 0, '--mask-dot-width-out': '-5%', duration: 1 }, 'start')
                .to('.full-image-media', { '--mask-dot-opacity': 0, duration: 1 }, 'start+=.75');

        });

    };

    function articlePage() {

        var articleIntro = gsap.timeline({ paused: true, delay: .5 });
        var articleTitleSplit = $('.header__title, .screen-404 h1').splitText({ type: 'words', useLite: true });
        var words = articleTitleSplit.find('span');

        articleIntro
            .from(words, {
                autoAlpha: 0, yPercent: 50, duration: 1, ease: Expo.easeInOut, stagger: {
                    each: 0.05,
                },
            },)
            .from($('.article__block:first-child, .blog'), { autoAlpha: 0, y: '50px', duration: 1, ease: Expo.easeInOut }, '-=.8')
            .from($('.header__cat, .screen-404 .btn'), { autoAlpha: 0, y: '50px', duration: 1, ease: Expo.easeInOut }, '-=1.1');

        articleIntro.play();

        $('.article-media--full .article-media__frame').each(function () {

            var $this = $(this);
            thisImage = $this.find('img');

            mm.add('(min-width: 993px)', () => {
                
                gsap.to(thisImage, {
                    scrollTrigger: {
                        trigger: $this,
                        start: 'top bottom',
                        end: 'bottom top',
                        // markers: true,
                        scrub: 1
                    },
                    y: '10vh'
                });

            });



        });

    };

    function blockFeatured() {

        $('.block--featured').each(function () {
            var $this = $(this);
            var thisLeft = $this.find('.featured__bar--left');
            var thisRight = $this.find('.featured__bar--right');
            var thisTop = $this.find('.featured__bar--top');
            var thisBottom = $this.find('.featured__bar--bottom');
            var thisImg = $this.find('img');
            var thisTitle = $this.find('.featured__title');
            var thisCta = $this.find('.featured__cta');
            var parentIndex = $(this).parents('.section').index();


            var featuredFrame = gsap.timeline({
                scrollTrigger: {
                    trigger: $this,
                    pin: true,
                    //anticipatePin: 1,
                    //refreshPriority: -1500,
                    start: 'top top',
                    end: () => {
                        return "+=" + window.innerHeight / 3;
                    },
                    scrub: 1,
                    refreshPriority: - parentIndex
                }
            });

            featuredFrame.to([thisLeft, thisRight], { scaleX: 1, duration: 1 }, "start")
                .to([thisTop, thisBottom], { scaleY: 1, duration: 1 }, "start")
                .to(thisImg, { scale: 1.1, duration: 1 }, "start")
                .from(thisTitle, { yPercent: -10, autoAlpha: 0, duration: 1 }, "cta")
                .from(thisCta, { yPercent: 10, autoAlpha: 0, duration: 1 }, "cta");
        });

    };

    function blog() {

        $('.blog-item').each(function () {

            var $this = $(this);
            var thisMedia = $this.find('.blog-item__media');

            gsap.to(thisMedia, {
                scrollTrigger: {
                    trigger: $this,
                    start: 'top bottom',
                    end: 'bottom top',
                    // markers: true,
                    scrub: 1
                },
                y: '10vh'
            });

            if (!$this.is(':first-child')) {

                gsap.from(thisMedia, {
                    scrollTrigger: {
                        trigger: $this,
                        start: 'top bottom',
                        end: 'center bottom',
                        // markers: true,
                        scrub: 1
                    },
                    autoAlpha: 0
                });

            };



            // let productTitle = gsap.timeline({
            //     scrollTrigger: {
            //         trigger: $this,
            //         start: 'center bottom',
            //         onLeaveBack() {
            //             productTitle.reverse(2);
            //         },
            //     }
            // });

            // productTitle.from(thisMainTitle, { autoAlpha: 0, yPercent: 25, rotate: 1.5 })
            //     .from(thisSubTitle, { autoAlpha: 0, yPercent: 25, rotate: 1.5, delay: -.25 });

        });

    };

    function singleProduct() {

        var galleryItems = $('.single-product__gallery-item').not(':last-child');

        let singleProductGallery = gsap.timeline({
            scrollTrigger: {
                trigger: '.single-product__text',
                start: 'top top', // when the top of the trigger hits the top of the viewport
                end: 'bottom bottom', // end after scrolling 500px beyond the start
                scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            }
        });

        singleProductGallery.to(galleryItems, { '--mask-dot-width-in': 0, '--mask-dot-width-out': '-5%', stagger: 1, duration: 1 }, 'start')
        // .to(galleryItems, { '--mask-dot-opacity': 0, stagger: 1, duration: 1 }, 'start+=.5');

        $('.other-products__item').each(function () {

            var $this = $(this);
            var thisMedia = $this.find('.other-product__media');

            gsap.to(thisMedia, {
                scrollTrigger: {
                    trigger: $this,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: '10vh'
            });

            gsap.from($this, {
                scrollTrigger: {
                    trigger: $this,
                    start: 'top bottom',
                    end: 'center bottom',
                    scrub: 1
                },
                autoAlpha: 0
            });


        });

    };

    function dropdowns() {
        $('.dropdown__trigger').on('click', function () {
            //console.log('DROPDOWN CLICKED');
            var thisDropdown = $(this).parent('.dropdown');
            var isOpen = thisDropdown.hasClass('dropdown--is-open');
            var dropdownContent = thisDropdown.find('.dropdown__content');
            var dropdownContentHeight = dropdownContent.find('>div').outerHeight(true);

            if (!isOpen) {
                gsap.to(dropdownContent, {
                    height: dropdownContentHeight, duration: .5,
                    onStart: function () {
                        thisDropdown.addClass('dropdown--is-open');
                    },
                    onComplete: function () {
                        dropdownContent.css('height', 'auto');
                        ScrollTrigger.refresh();
                    }
                });

            } else {
                gsap.to(dropdownContent, {
                    height: 0, duration: .5, onComplete: function () {
                        thisDropdown.removeClass('dropdown--is-open');
                        ScrollTrigger.refresh();
                    }
                });

            }
        });
    };

    function switches() {

        $('.product-nav .switch__btn').on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                thisSwitch = $this.parent('.switch'),
                thisProduct = $this.parents('.product-nav__item'),
                thisVariant = $this.data('variant'),
                thisRelatedImg = thisProduct.find('[data-img-variant="' + thisVariant + '"]'),
                thisRelatedCtas = thisProduct.find('[data-cta-variant="' + thisVariant + '"]');

            gsap.set(thisSwitch, { '--active-after-x': 'calc(' + (thisVariant - 1) * 100 + '% + ' + (thisVariant - 1) * 10 + 'px)' });

            thisProduct.find('img').removeClass('product-nav__img--active');
            thisRelatedImg.addClass('product-nav__img--active');

            thisProduct.find('.product-nav__ctas').removeClass('product-nav__ctas--active');
            thisRelatedCtas.addClass('product-nav__ctas--active');

        });

        $('.single-product .switch__btn').on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                thisSwitch = $this.parent('.switch'),
                thisVariant = $this.data('variant'),
                thisVariantName = $this.data('variant-name'),
                thisRelatedImg = $('.single-product__gallery-item--first').find('[data-img-variant="' + thisVariant + '"]');
                thisRelatedCta = $('[data-cta-variant="' + thisVariant + '"]');

            gsap.set(thisSwitch, { '--active-after-x': 'calc(' + (thisVariant - 1) * 100 + '% + ' + (thisVariant - 1) * 10 + 'px)' });

            $('.single-product__variant').html(thisVariantName);

            $('.single-product__gallery-item--first img').removeClass('active');
            thisRelatedImg.addClass('active');

            $('.single-product__cta').removeClass('single-product__cta--active');
            thisRelatedCta.addClass('single-product__cta--active');
            
        });

    };

    function footerScroll() {

        // gsap.from('.footer', {
        //     scrollTrigger: {
        //         trigger: '.footer',
        //         start: 'top bottom',
        //         end: 'top 75%',
        //         scrub: true
        //     },
        //     '--footer-bg-color': '#fff'
        // });

    };


});