//We are not using elementbyID since that only works for one instace of that ID
//Instead, use querySelectorAll and change things from there

const dropdownContent = document.querySelectorAll(".dropdown-content");
const button = document.querySelectorAll(".dropbtn");

//--------------------------------------------------------
//-----------------TITLE-SLIDE-IN-------------------------
//--------------------------------------------------------



//--------------------------------------------------------
//-----------BACKGROUND-IMAGE-SCROLL----------------------
//--------------------------------------------------------

window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let maxScroll = this.document.documentElement.scrollHeight - this.window.innerHeight;
    let scrollPercentage = scrollPosition / maxScroll;

    // Calculate the background size based on scroll percentage
    let zoom = 100 + scrollPercentage * 100; // 100% default to 200% (zoom in)
    let translateX = scrollPercentage * 500; // 0% default to 200%

    //Apply zoom
    this.document.querySelector('.background-image').style.backgroundSize = zoom+'%';
    
    // Apply translateX
    this.document.querySelector('.title-div').style.transform = 'translateX(-' + translateX + '%)';

})


//--------------------------------------------------------
//-------------------DROPDOWN-MENU------------------------
//--------------------------------------------------------


//To get the element that triggered the event, find the parent; the second child is the drop down menu; toggle the second child
function toggleMenu(event){
    const parentElement = event.target.parentElement;
    const secondChild = parentElement.children[1]; 

    secondChild.classList.toggle('show');
}

function toggleMenuNav(event){
    console.log(document.div);
    const content = event.target.children[0];
    content.classList.toggle('show');
}

 
//Close menu functions

//If the user hovers the menu, then off
dropdownContent.forEach(function(element){  //for each instance of dropdownContent... 
    element.addEventListener('mouseleave', function(){ //add event listener for mouse off...
        element.classList.remove('show'); // which triggers the function to remove show
    });
});

//If the user hovers off the button, call a function
function closeMenu(event) { 

    const parentElement = event.target.parentElement;
    const secondChild = parentElement.children[1];
    
    if(!secondChild.matches(":hover")){
        secondChild.classList.remove("show");
    }
}


//--------------------------------------------------------
//-------------------FADE-IN-DIVS-------------------------
//--------------------------------------------------------

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade');
        }else{
            entry.target.classList.remove('fade')
        }
    });
});



const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//---------------------------------------------------------
//-------------------CAROUSEL------------------------------
//---------------------------------------------------------

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})