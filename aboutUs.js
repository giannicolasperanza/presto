
let opener = document.querySelector(`.opener`);
let circle = document.querySelector(`.circle`);


let teachers = [

    {name : 'Matteo', description : "Assitente Virtuale 1", url : './media/teacher1.jpg'},
    {name : 'Luca', description : "Assitente Virtuale 2", url : './media/teacher2.jpg'},
    {name : 'Chiara', description : "Assitente Virtuale 3", url : './media/teacher3.jpg'},
    {name : 'Marta', description : "Assitente Virtuale 4", url : './media/teacher4.jpg'},


];

teachers.forEach( (teacher)=>{
    let div = document.createElement(`div`);
    div.classList.add(`moved`);
    div.style.backgroundImage = `url(${teacher.url})`;
    circle.appendChild(div);
    
})

let movedDivs = document.querySelectorAll('.moved');

let check = false;

let flipCard = document.querySelector(`.flip-card`);


opener.addEventListener( 'click', ()=>{

    if(check == false){
        opener.style.transform = 'rotate(45deg)';
            movedDivs.forEach( (moved, i)=> {
                let angle = (360 * i) / movedDivs.length;
                moved.style.transform = ` rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
            });

            check = true;
    }else{
        check = false;
        opener.style.transform = 'rotate(0deg)';
        movedDivs.forEach( (moved, i)=> {
            moved.style.transform = ` rotate(0deg) translate(0px)`;
        });

        flipCard.classList.add('d-none');
    }

});

let innerFace = document.querySelector(`.inner-face`);
let cardName = document.querySelector(`#cardName`);
let cardDescription = document.querySelector(`#cardDescription`);


movedDivs.forEach( (moved, i)=>{
    moved.addEventListener( 'click', ()=> {
        flipCard.classList.remove('d-none');
        let docente = teachers[i];
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;



    })
})