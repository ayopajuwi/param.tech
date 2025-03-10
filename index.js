'use strict';

$(document).ready(function () {
    // Immediately hide landing page and show main content
    $('#main-content').removeClass('hidden');

    // Set up and play the background video
    document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('background-video');
    if (video) {
        video.play().catch(err => {
            console.error('Video autoplay failed:', err);
        });
    }
});

    // Add animations to elements
    const animations = [
        { selector: '#main-box', animation: 'slide-down' },
        { selector: '#button-1', animation: 'slide-right' },
        { selector: '#button-2', animation: 'slide-left' },
        { selector: '#footer', animation: 'slide-up' }
    ];
    
    animations.forEach(({ selector, animation }) => {
        $(selector).addClass(animation);
    });

    // Initialize Typed.js for dynamic text
    if (window.typedInstance) {
        window.typedInstance.destroy();
    }
    window.typedInstance = new Typed('#typed-text', {
        strings: ['Python bot developer', 'Full stack web developer', 'Desktop application developer'],
        typeSpeed: 100,
        startDelay: 300,
        backSpeed: 50,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: false,
        smartBackspace: true,
    });

    // Set up tooltips with Tippy.js
    const tooltips = {};
    $('[data-tooltip]').each(function () {
        const placement = (['mute-button', 'pause-button'].includes(this.id)) ? 'top' : 'bottom';
        const delay = (this.id === 'pause-button') ? 300 : 0;

        tooltips[this.id] = tippy(this, {
            content: $(this).data('tooltip'),
            allowHTML: false,
            animateFill: true,
            arrow: true,
            delay: delay,
            followCursor: false,
            hideOnClick: false,
            inlinePositioning: true,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            maxWidth: 'none',
            placement: placement,
            touch: 'hold',
            animation: 'shift-away',
            onShow(instance) {
                instance.popper.style.opacity = '0';
                requestAnimationFrame(() => {
                    instance.popper.style.transition = 'opacity 0.3s';
                    instance.popper.style.opacity = '1';
                });
            },
            onHide(instance) {
                instance.popper.style.opacity = '0';
            },
        });
    });

    // Clipboard Copy functionality
    function handleCopy(tooltip, data) {
        let timer;
        navigator.clipboard.writeText(data)
            .then(() => {
                tooltip.setContent('Copied to Clipboard!');
            })
            .catch(() => tooltip.setContent('Failed to Copy to Clipboard!'))
            .finally(() => {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    tooltip.setContent(data);
                }, 3000);
            });
    }

    $('#discord-tool, #telegram-tool').click(function () {
        const data = $(this).data('tooltip');
        handleCopy(tooltips[this.id], data);
    });

    // Mute button functionality
    const muteButton = $('#mute-button');
    muteButton.click(function () {
        video.muted = !video.muted;
        muteButton.toggleClass('fa-volume-up fa-volume-mute');
        tooltips[this.id].setContent(video.muted ? 'Unmute' : 'Mute');
    });

    // Pause button functionality
    const pauseButton = $('#pause-button');
    pauseButton.click(function () {
        if (video.paused) {
            video.play();
            pauseButton.removeClass('fa-play').addClass('fa-pause');
            tooltips[this.id].setContent('Pause');
        } else {
            video.pause();
            pauseButton.removeClass('fa-pause').addClass('fa-play');
            tooltips[this.id].setContent('Play');
        }
    });

    // Set the current year in the footer dynamically
    $('#current-year').text(new Date().getFullYear());
});
