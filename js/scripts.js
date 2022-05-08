let movies = [
  {
    id: 1,
    title: "Eternals",
    director: " Chloé Zhao",
    runtime: "156 min",
    release_year: 2021,
    description:
        "The saga of the Eternals, " +
        "a race of immortal beings who lived on " +
        "Earth and shaped its history and civilizations",
    poster_url: "./images/Eternals.jpeg",
    cinema_number: 1,
    ticket_price: 20,
    tickets_in_cart: 0
  },
  {
    id: 2,
    title: "Encanto",
    director: "Jared Bush",
    runtime: "1h 42m",
    release_year: 2021,
    description:
        "A Colombian teenage girl has to face the frustration of being the " +
        "only member of her family without magical powers.",
    poster_url: "./images/Encanto.jpg",
    cinema_number: 2,
    ticket_price: 30,
    tickets_in_cart: 0
  },
  {
    id: 3,
    title: "The Boss Baby 2",
    director: "Tom McGrath",
    runtime: "107m",
    release_year: 2021,
    description:
        "The Templeton brothers have become adults and drifted away from " +
        "each other, but a new boss baby with a cutting-edge approach is " +
        "about to bring them together again - and inspire a new family business",
    poster_url: "./images/bossbaby.jpg",
    cinema_number: 3,
    ticket_price: 25,
    tickets_in_cart: 0
  },
  {
    id: 4,
    title: "The Suicide Squad",
    director: "James Gunn",
    runtime: "132m",
    release_year: 0,
    description:
        "Supervillains Harley Quinn, Bloodsport, Peacemaker, and a collection" +
        " of nutty cons at Belle Reve prison join the super-secret, " +
        "super-shady Task Force X as they are dropped off at the remote, " +
        "enemy-infused island of Corto Maltese.",
    poster_url: "./images/TheSuicideSquad.jpg",
    cinema_number: 4,
    ticket_price: 35,
    tickets_in_cart: 0
  },
  {
    id: 5,
    title: "Sing 2",
    director: "Garth Jennings",
    runtime: "110m",
    release_year: 2021,
    description:
        "Buster Moon and his friends must persuade reclusive rock star Clay " +
        "Calloway to join them for the opening of a new show",
    poster_url: "./images/sing2.jpg",
    cinema_number: 5,
    ticket_price: 25,
    tickets_in_cart: 0
  },
  {
    id: 6,
    title: "Cruella",
    director: "Craig Gillespie",
    runtime: "134m",
    release_year: 2021,
    description:
        "A live-action prequel feature film following a young Cruella de Vil.",
    poster_url: "./images/cruella.jpg",
    cinema_number: 6,
    ticket_price: 30,
    tickets_in_cart: 0
  }
];

//--------------------------------------------------------------------[populate]
function populate()
{
  let count = 0;
  let list = document.getElementById( "movieList" )
  let newItem = "";

  for( let i = 0; i < movies.length; i++ )
  {
    if ( count === 0 )
      newItem += "<div class='row'>";

    newItem += createCard( movies[i] );
    count++;

    if ( count === 4 || i === movies.length-1 )
    {
      newItem += "</div>";
      count = 0;
    }
  }

  for( let i = 0; i < movies.length; i++ )
  {
    newItem += createModal( movies[i] );
  }

  list.innerHTML += newItem;

  saveDetails();
}

//------------------------------------------------------------------[createCard]
function createCard( item )
{
  return  "<div class='pad col-lg-3 col-md-4 col-sm-6'>" +
            "<div class='card' id='" + item.id + "'>" +
              "<div class='card-header'>Cinema " + item.cinema_number + "</div>" +
              "<div class='card-body'>" +
                "<div class='center'>" +
                  "<img class='posters' src='" + item.poster_url + "'/>" +
                "</div><br/>" +
                "<h4>" + item.title + "</h4><br/>" +
                "<p class='description'>" + item.description + "</p>" +
                "<p class='price'>R" + item.ticket_price + "</p>" +
              "</div>" +
              "<div class='card-footer'>" +
                "<button class='btn btn-outline-primary seeDetails' " +
                        "data-toggle='modal' " +
                        "data-target='#modal" + item.id +"'>See details</button><br/>" +
                "<button class='btn btn-success bookTicket' >" +
                  "Book ticket</button>" +
              "</div>" +
            "</div>" +
          "</div>";
}

//-----------------------------------------------------------------[createModal]
function createModal( item )
{
  return  "<div class='modal' id='modal" + item.id + "'>" +
            "<div class='modal-dialog'>" +
              "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                  "<h4 class='modal-title'>" + item.title + "</h4>" +
                  "<button type='button' class='close' data-dismiss='modal'>" +
                    "&times;" +
                  "</button>" +
                "</div>" +
                "<div class='modal-body'>" +
                  "<p><b>Description</b><br/>" + item.description + "<br/><br/>" +
                  "<b>Director: </b>" + item.director + "<br/>" +
                  "<b>Runtime: </b>" + item.runtime + "<br/>" +
                  "<b>Release year: </b>" + item.release_year + "<br/>" +
                  "<b>Cinema number: </b>" + item.cinema_number + "<br/>" +
                  "<b>Ticket price: </b>R" + item.ticket_price + "<br/>" +
                "</div>" +
              "</div>" +
              "<div class='modal-footer'>" +
                "<button type='button' class='btn btn-danger' " +
                        "data-dismiss='modal'>Close</button>" +
              "</div>" +
            "</div>" +
          "</div>";
}

//-----------------------------------------------------------------[makeBooking]
$(document).on( 'click', '.bookTicket', function()
{
  let id = $(this).parent().parent().attr('id');
  let movie = "";

  movies.forEach( (item) =>
  {
    if ( item.id == id )
      movie = item;
  });

  movie.tickets_in_cart++;

  saveDetails();
});

//-----------------------------------------------------------------[saveDetails]
function saveDetails()
{
  let listNames = [];

  movies.forEach( ( item ) =>
  {
    if ( item.tickets_in_cart > 0 )
      listNames.push( item );
  })

  let totalCost = 0;
  let numberInCart = 0;

  listNames.forEach( ( item ) =>
  {
    totalCost += ( item.tickets_in_cart * item.ticket_price );
    numberInCart += item.tickets_in_cart;
  })

  localStorage.setItem( "moviesInCart", JSON.stringify( listNames ) );
  localStorage.setItem( "totalCost", totalCost.toString() );
  localStorage.setItem( "numberInCart", numberInCart.toString() );

  let cartCount = document.getElementById( 'count' );

  cartCount.innerText = " " + numberInCart;
}

