// .json: Javascript object Notification

// API: chiavi che ci permettono di raggiungere un .json online

// fetch() : chiamata asincrona che permette di collegarci ad un JSON e da esso estrarre il dato
// sotto forma di Promise.

// .then(): questo metodo permette di convertire la Promise nel dato Strutturale e di poterlo utilizzare
// come tale su Javascript

// 1. fetch()= micollego al JSON e ne ottengo una Promise
// 2. .then()= converto la Promise in un dato strutturale JS
// 3. .then()= utilizzare il dato ottenuto

// Nelle tonde di fetch va il link quindi 
// nel then una callback che vuole un parametro che canonicamente si chiama response
// 

// metodo .json()= è un metodo delle promise che mi permette di convertirla in oggetto JS

fetch(`./annunci.json`).then( (response)=> response.json()).then( (data)=>{
    
    data.sort( (a,b)=> a.price - b.price );
    let radioWrapper = document.querySelector(`#radioWrapper`);
    let cardWrapper = document.querySelector(`#cardWrapper`);



    function radioCreate(){
        
        let categories = data.map( (annuncio)=> annuncio.category); 
        // abbiamo delle rieptizioni cosi
        // Set(): classe che mi restituisce, partendo da un array, un nuovo oggetto di tipo Set il quqla econtienie valori univoci.
        // Array.from(): mi permette di vonertire un array-like in un array 

        let uniqueCategories = Array.from(new Set(categories));

        uniqueCategories.forEach( (category)=> {
            let div = document.createElement(`div`);
            div.classList.add(`form-check`);
            div.innerHTML = `
             <input class="form-check-input" type="radio" name="categories" id="${category}">
             <label class="form-check-label" for="${category}">
             ${category}
            </label>
            `; 
        radioWrapper.appendChild(div);
        });

        
    }
    
    radioCreate();


    function truncateWord(string){
        if(string.length > 15){
            return string.split(' ')[0] + `...`;
        }else{
            return string;
        }
    }

    function showCards(array){
        cardWrapper.innerHTML=  ``;
       array.forEach(  (annuncio, i)=>{

            let div = document.createElement(`div`);
            div.classList.add(`card-custom`);
            div.innerHTML = `
            <img src ="https://picsum.photos/${300+ i}" alt="immagine casuale" class="img-fluid img-card">
                <p class="h2"   title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                <p class="h4">${annuncio.category}</p>
                <p class="lead">${annuncio.price} € </p>
            `;
            cardWrapper.appendChild(div);

            // console.log(truncateWord(annuncio.name));
            
       });

    }
    
    showCards(data);
    

    function filterByCategory(categoria){
    if(categoria != 'All'){
        let filtered = data.filter( (annuncio)=> annuncio.category == categoria);
        showCards(filtered);


    }else{
        showCards(data);
}

    }


    let radioButtons = document.querySelectorAll(`.form-check-input`);

    radioButtons.forEach( (button)=> {
        button.addEventListener(`click`, ()=>{
            filterByCategory(button.id);
        })
    });


    let priceInput = document.querySelector(`#priceInput`);
    let priceValue = document.querySelector(`#priceValue`);


    function setPriceInput(){
        let prices = data.map( (annuncio)=> +annuncio.price);
        prices.sort((a,b)=> a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;


    }

    setPriceInput();

    function filterByPrice(){
        let filtered = data.filter( (annuncio)=> +annuncio.price <= priceInput.value );
        showCards(filtered); 

    }


        priceInput.addEventListener( 'input' , ()=>{
            priceValue.innerHTML = priceInput.value;
            filterByPrice();
        } );


    
        let wordInput = document.querySelector(`#wordInput`);

        function filterByWord(parola){
            let filtered = data.filter( (annuncio)=> annuncio.name.toLowerCase().includes(parola.toLowerCase()));
            showCards(filtered);
        }

        wordInput.addEventListener( 'input', ()=>{
            filterByWord(wordInput.value);
        });

} )

