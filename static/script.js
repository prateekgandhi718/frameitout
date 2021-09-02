var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


//Dropdown open and close with the help of css and javascript. Toggling different classes of CSS with a click. .dropdown-done opens up the menu while .dropdown-close closes it.
let myworkicon = document.getElementsByTagName('svg');
let mywork = document.getElementsByClassName("dropdown")

function dropdown(){
  // let mywork = document.getElementsByClassName("dropdown")
  mywork[0].classList.add("dropdown-done")
  mywork[0].classList.remove("dropdown-close")
}

document.addEventListener('click', function(event) {
  var isClickInside = mywork[0].contains(event.target);

  if (!isClickInside) {
    //the click was outside the specifiedElement, do something
    // alert("clicked outside!")
    mywork[0].classList.add("dropdown-close")
    mywork[0].classList.remove("dropdown-done")
  }
});

const onClickMenu = () => {
  const menu = document.getElementById('menu');
  const ulist = document.querySelector('.ulist');

  menu.addEventListener('click', () =>{
    ulist.classList.toggle('ulist-active');
    

    //animating the burger lines
    menu.classList.toggle('change');
  
    
  });
}

onClickMenu()