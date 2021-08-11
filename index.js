window.addEventListener('load', () => {
  const nav = document.getElementsByClassName('nav')[0];
  const navBurgerButton = document.querySelector('.nav .burger');
  navBurgerButton.addEventListener('click', () => {
    nav.classList.add('active');
  });
  const navCloseButton = document.querySelector('.nav .close');
  navCloseButton.addEventListener('click', () => {
    nav.classList.remove('active');
  });
  const navItems = document.querySelectorAll('.nav .nav-item');
  navItems.forEach(navItem => {
    if (!navItem.classList.contains('select')) {
      navItem.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    }
  });

  const allSelects = document.querySelectorAll('.select');
  allSelects.forEach(selectElement => {
    selectElement.addEventListener('click', () => {
      selectElement.classList.toggle('active');
    });
  });

  const handleViewportChange = () => {
    const desktopHeaderY = 40;
    const mobileHeaderY = 10;
    const mobileWidth = 1117;
    const isMobile = window.innerWidth <= mobileWidth;
    const requiredScrollY = isMobile ? mobileHeaderY : desktopHeaderY;

    const handleHeader = () => {
      const header = document.getElementsByClassName('header')[0];
      if (window.scrollY > requiredScrollY) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    const handleBody = () => {
      const body = document.getElementsByClassName('body')[0];
      if (window.scrollY > requiredScrollY) {
        body.classList.add('scrolled');
      } else {
        body.classList.remove('scrolled');
      }
    };

    const handleLinks = () => {
      const links = document.querySelectorAll('.nav a');
      let foundCurrent = false;
      links.forEach((link, i) => {
        const href = link.getAttribute('href');
        if (!href.startsWith('#')) {
          return;
        }
        const target = document.querySelector(href);
        const targetY = target.offsetTop - 1;
        if (window.scrollY > targetY) {
          link.classList.add('current');
          foundCurrent = true;
          if (i > 0) {
            links[i - 1].classList.remove('current');
          }
        } else {
          link.classList.remove('current');
        }
      });
      if (!foundCurrent) {
        links[0].classList.add('current');
      }
    };

    const handleCarousel = () => {
      const isRtl = document.dir === 'rtl';
      const chevronNext = isRtl ? '<i class="fas fa-chevron-left"></i>' : '<i class="fas fa-chevron-right"></i>';
      const chevronPrev = isRtl ? '<i class="fas fa-chevron-right"></i>' : '<i class="fas fa-chevron-left"></i>';
      const makeButton = (icon, direction) => `<button type="button" class="slick-${direction}">${icon}</button>`;
      const element = $('.advantages-screen .snake');
      const isSlicked = element[0].classList.contains('slick-initialized');
      if (isMobile) {
        if (!isSlicked) {
          element.slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            pauseOnFocus: true,
            pauseOnDotsHover: true,
            rtl: isRtl,
            nextArrow: makeButton(chevronNext, 'next'),
            prevArrow: makeButton(chevronPrev, 'prev'),
          });
        }
      } else {
        if (isSlicked) {
          element.slick('unslick');
        }
      }
    };

    handleHeader();
    handleBody();
    handleLinks();
    handleCarousel();
  };
  document.addEventListener('scroll', handleViewportChange);
  window.addEventListener('resize', handleViewportChange);
  handleViewportChange();

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', e => {
    const formTargetUrl = 'https://api.q-int.com/contact';

    const getValues = () => {
      const firstNameElement = document.getElementById('contact-form-first-name');
      const lastNameElement = document.getElementById('contact-form-last-name');
      const emailElement = document.getElementById('contact-form-email');
      const messageElement = document.getElementById('contact-form-message');
      return {
        firstName: firstNameElement.value,
        lastName: lastNameElement.value,
        emailAddress: emailElement.value,
        message: messageElement.value,
      };
    };

    e.preventDefault();

    const { firstName, lastName, emailAddress, message } = getValues();
    const request = new Request(formTargetUrl, {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, emailAddress, message }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetch(request)
      .then(() => {
        contactForm.reset();
      });
  });
});

function emitEvent(event) {
  switch (event) {
    case 'loginHeader': {
      gtag('event', 'sign_up', { event_category: 'engagement', value: 'header' });
      break;
    }
    case 'loginFreeQueues': {
      gtag('event', 'sign_up', { event_category: 'engagement', value: 'freeQueues' });
      break;
    }
    case 'loginBottom': {
      gtag('event', 'sign_up', { event_category: 'engagement', value: 'bottom' });
      break;
    }
  }
}
