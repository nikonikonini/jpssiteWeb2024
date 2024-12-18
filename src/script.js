
const menuToggle = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const menuIcon = document.getElementById('menu-icon');
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

const cardContainer = document.getElementById('card-container');
const slideLeft = document.getElementById('slideLeft');
const slideRight = document.getElementById('slideRight');
const indicatorContainer = document.getElementById('indicator-container');



// menu for navigation
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');

    
    if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});


// slides
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;


function hideSlides() {
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
}

//show current slide
function showSlide() {
  hideSlides();
  slides[currentSlide].classList.add('active');
}


function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length; 
  showSlide();
}


function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length; 
  showSlide();
}

// next prev btn
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);


// change slide after 3sec
setInterval(nextSlide, 3000);

showSlide();



// slide for events
const cards = document.querySelectorAll('#card-container > div');
  const cardWidth = cards[0].offsetWidth + 16;
  let currentIndex = 0;

  // create dot 
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className =
      'h-2 w-6 bg-gray-400 rounded-full cursor-pointer transition duration-300';
    dot.dataset.index = index;
    indicatorContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('#indicator-container > div');
  dots[0].classList.add('bg-gray-700'); 

  // scroll left
  slideLeft.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateView();
  });

  // scroll right
  slideRight.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) currentIndex++;
    updateView();
  });

  function updateView() {
    cardContainer.scrollTo({
      left: currentIndex * cardWidth,
      behavior: 'smooth',
    });
    updateDots();
  }

  
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('bg-gray-700', index === currentIndex);
      dot.classList.toggle('bg-gray-400', index !== currentIndex);
    });
  }

  // Detect Scroll
  cardContainer.addEventListener('scroll', () => {
    const scrollPosition = cardContainer.scrollLeft;
    currentIndex = Math.round(scrollPosition / cardWidth);
    updateDots();
  });

  // dot
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index);
      updateView();
    });
  });


  // for gallery
  const seeMoreBtn = document.getElementById('see-more-btn');
  const hiddenPhotos = document.querySelectorAll('#gallery-container .hidden');

  seeMoreBtn.addEventListener('click', () => {
      if (seeMoreBtn.innerText === 'See More') {
          // show hidden photos
          hiddenPhotos.forEach(photo => {
              photo.classList.remove('hidden');
          });
          seeMoreBtn.innerText = 'See Less';
      } else {
          // hide the photo
          hiddenPhotos.forEach(photo => {
              photo.classList.add('hidden');
          });
          seeMoreBtn.innerText = 'See More';
      }
  });