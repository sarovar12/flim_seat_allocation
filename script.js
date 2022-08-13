const container =document.querySelector('.seats');
const seats= document.querySelectorAll('.row .seat:not(.occupied)');
const count= document.getElementById('count');
const total= document.getElementById('total');
const movieSelect=document.getElementById('movie');
let ticketprice= +movieSelect.value; //adding a + converts string to integer
populateUI();

//save selected movie index and price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedmovieindex',movieIndex);
    localStorage.setItem('selectedmovieprice',moviePrice);
}

function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    const selectedSeatsCount=selectedSeats.length;
    count.innerText=selectedSeatsCount;
    total.innerText= selectedSeatsCount*ticketprice;
}

//Get Data from local storage and populate UI
    function populateUI(){
        const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));
        if (selectedSeats !== null && selectedSeats.length > 0){
             seats.forEach((seat,index)=>{
                 if(selectedSeats.indexOf(index) > -1){
                        seat.classList.add('selected');
                 }
             });
        }
        const selectedMovie = localStorage.getItem('selectedmovieindex');
        if (selectedMovie !== null){
            movieSelect.selectedIndex = selectedMovie;
        }  
    }





function updateMoviePrice(){

    movieSelect.addEventListener('change', e=>{
        ticketprice = +e.target.value;
        updateSelectedCount();
        setMovieData(e.target.selectedIndex,e.target.value);
    })
}

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat') &&(!e.target.classList.contains('occupied'))){
        e.target.classList.toggle('selected');
        updateSelectedCount();
        updateMoviePrice();
    }
});




//Update the price when reload
updateSelectedCount();
updateMoviePrice();