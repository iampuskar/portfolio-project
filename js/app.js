
//SlideBar using javascript and online scroller
// $(document).ready(function(){
      // $('.slider').slick({
        // arrows:false,
        // dots:true,
        // appendDots:'.slider-dots',
        // dotsClass: 'dots',
        // autoplay:3000
      // });
    // });

//Mobile Navigation using Javascript
let hamberger = document.querySelector('.hamberger');
let times = document.querySelector('.times');
let mobileNav = document.querySelector('.mobile-nav');

hamberger.addEventListener('click',function(){
mobileNav.classList.add('open');

});

times.addEventListener('click',function(){
  mobileNav.classList.remove('open');

});

// });

//Smooth Navigation on the nav bar using JavaScript
document.querySelector('.nav-list').addEventListener('click', function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
         behavior: 'smooth'
    });
  }
});  

// Menu Fading Animation

const header = document.querySelector('header');
header.addEventListener('mouseover', function(e){
  // console.log(e);
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('header').querySelectorAll('.nav__link');
    const logo = link.closest('header').querySelector('img');

    siblings.forEach(el => {
      // console.log(el);
      if(el !== link) el.style.opacity = 0.5;
      
    });

    logo.style.opacity = 0.5;
  }
});

header.addEventListener('mouseout', function(e){
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('header').querySelectorAll('.nav__link');
    const logo = link.closest('header').querySelector('img');

    siblings.forEach(el => {
      // console.log(el);
      if(el !== link) el.style.opacity = 1;
      
    });

    logo.style.opacity = 1;
  }
  
});


//sticky navBar

const nav = document.querySelector('.nav-nav');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
   
  const [entry] = entries;
  // console.log(entry);

  if(entry.isIntersecting == false) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}



const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

//Revealing a section 
// const allSection = document.querySelectorAll('.section');

// const revealSection = function(entries, observer){
//   const [entry] = entries;

//   if(!entry.isIntersecting) return;
//    entry.target.classList.remove('section--hidden');
//    observer.unobserve(entry.target);

// }

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });
// allSection.forEach(section => {
  
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
  
// });


//image lazy loading

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);


const loadImg = function(entries, observer){

  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) return;

  //otherwise replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
       entry.target.classList.remove('lazy-img');
  });

observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
 root:null,
 threshold:0,
 rootMargin:'200px'
});

imgTargets.forEach(img => {

  imgObserver.observe(img);

  img.classList.remove('lazy-img');

});

// Create slider 

  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  // const activateDot = function (slide){
  //   document.querySelectorAll('dots__dot').forEach(dots => dots.classList.remove('dots__dot--active'));
  //   document.querySelector(`dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  // }

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  activateDot(0);

  const goToSlide = function(slide){
  slides.forEach((s,i) => s.style.transform = `translateX(${100 * (i-slide)}%)`);}

  goToSlide(0);
  







// const slider = document.querySelector('.slider')
// slider.style.transform = 'scale(0.5)';
// slider.style.overflow = 'visible';

const nextSlide = function() {
  if(currentSlide === maxSlide -1 ){
    currentSlide = 0;
  }else{
    currentSlide++;
  }
  
  goToSlide(currentSlide);
  activateDot(currentSlide);
}

const prevSlide = function() {
  if (currentSlide === 0){
    currentSlide = maxSlide - 1;
  }else{
    currentSlide--;
  }
  
  goToSlide(currentSlide);
  activateDot(currentSlide);
}



btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  if(e.key === 'ArrowRight') nextSlide();
}); 

dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
})


//Typing Effect

const typedTextIndex = document.querySelector('.lola');
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Engineer", "Software Developer", "Enthusiastic"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;


const typingFunction = function(){
  if(charIndex < textArray[textArrayIndex].length){
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextIndex.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typingFunction, typingDelay); 
  }else{
  //erase Part
  cursorSpan.classList.remove("typing");
  setTimeout(eraseFunction, newTextDelay);
}

}

const eraseFunction = function(){
  if(charIndex > 0){
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextIndex.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(eraseFunction, erasingDelay);
  }else{
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(typingFunction, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded" ,function(){
  
  if(textArray.length) setTimeout(typingFunction, newTextDelay + 250);
});
