
let navbar = document.querySelector(`#navbar`);
let links = document.querySelectorAll(`.nav-link`);
let logoNavbar = document.querySelector(`#logoNavbar`);
let btnLogo =  document.querySelector(`#btnLogo`);
let collapse = document.querySelector(`#collapse`);
let firstNumber = document.querySelector(`#firstNumber`);
let secondNumber = document.querySelector(`#secondNumber`);
let thirdNumber = document.querySelector(`#thirdNumber`);
let swiperWrapper = document.querySelector(`.swiper-wrapper`);

let confirm = true;
let check = false;



window.addEventListener(`scroll`, ()=>{
    let scrolled = window.scrollY;

    if(scrolled > 0){
        navbar.classList.remove(`bg-black`);
        navbar.classList.add(`bg-yellow`);
        collapse.classList.remove(`bg-black`);
        collapse.classList.add(`bg-yellow`);

        navbar.style.height=`70px`;
        links.forEach((link) =>{
            link.style.color = `var(--black)`
        });
        logoNavbar.src = `http://127.0.0.1:5500/media/logo-black.png`;
        btnLogo.src = `http://127.0.0.1:5500/media/btn-menu-b.png`;


    }else{
        navbar.classList.remove(`bg-yellow`);
        navbar.classList.add(`bg-black`);
        collapse.classList.remove(`bg-yellow`);
        collapse.classList.add(`bg-black`);        
        navbar.style.height=`140px`;
        links.forEach((link) =>{
            link.style.color = `var(--yellow)`
        });
        logoNavbar.src = `http://127.0.0.1:5500/media/logo-yellow.png`;
        btnLogo.src = `http://127.0.0.1:5500/media/btn-menu-y.png`;




    }
});

btnLogo.addEventListener(`click`, ()=>{

    if(check == false){
        btnLogo.style.transform = `rotate(180deg)`
        check = true;
    }else{
        btnLogo.style.transform = `rotate(0deg)`
        check = false;
    }
});


// Chiamate asincrone: 
// setInterval():  crea un loop infinito in cui possiamo gestire la durata delle singole interazioni
//  vuole due parametri il primo è la callback il secondo è l'intervallo di tmepo che deve passare tra una interazion
// e l'altra
// clearInterval(): all'interno delle parentesi va scritto il nome dell'intervallo da fermare ecco perchè l'intervallo
// lo mettiamo ina una variabile
// setTimeout: fa partire un blocco di istruzioni dopo un tot di secondi.


function createInterval(n, element, time){
    let counter = 0;

    let interval = setInterval( ()=>{
        if(counter < n){
            counter++
            element.innerHTML = counter;
        }else{

        }

    }  ,time);

    setTimeout( ()=>{
        confirm = true;
    }, 8000);
}



// IntersectionObserver:  è una Classe del browser che si occupa di far scattare una funzione nel momento in cui
// sul broswer sono visibili gli elemnti html che noi indichiamo
// new è una keyword che mi permette di generare un oggetto partendo da una classe

let observer = new IntersectionObserver( (entries)=>{
    entries.forEach( (entry)=>{
        if(entry.isIntersecting  && confirm){
            createInterval(200, firstNumber, 20);
            createInterval(350, secondNumber, 30);
            createInterval(250, thirdNumber, 10);
            confirm = false;
        }
    })
} );

observer.observe(firstNumber);



let reviews =[
     {user : `Matteo`, description : `Wow, bellissimo prodotto. Lo consiglio.`, rank :5},
     {user : `Luca`, description : `Insomma non mi ha convinto.`, rank :1},
     {user : `Francesco`, description : `va bene ma si può fare di piu `, rank :3},
     {user : `Marco`, description : `bravissimi ottimo servizio`, rank :4},

]

reviews.forEach( (recensione)=> {
   let div = document.createElement(`div`);
   div.classList.add(`swiper-slide`);
   div.innerHTML = `
                           <div class="card-review">
                                <p class="lead text-center">${recensione.description}</p>
                                <p class="h4 text-center">${recensione.user}</p>
                                <div class="d-flex justify-content-center star">
                                
                                </div>
                            </div>
   `;
   swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll(`.star`);

stars.forEach((star,index) => {
    for(let i = 0; i < reviews[index].rank; i++){
        let icon = document.createElement(`i`);
        icon.classList.add(`fa-solid`, `fa-star`);
        star.appendChild(icon);
    }

    let difference = 6 - reviews[index].rank;

    for(let i = 1; i < difference; i++){
        let icon = document.createElement(`i`);
        icon.classList.add(`fa-regular`, `fa-star`);
        star.appendChild(icon);
    }

})

const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "flip",
    grabCursor: true,
    loop: true,

    autoplay: {
        delay: 2500},
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    
  });