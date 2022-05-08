
//---------------------------------------------------------------[populateTable]
function populateTable()
{
  let stringList = localStorage.getItem( "moviesInCart" );

  let list = JSON.parse( stringList );

  console.log( list );

  let htmlList = document.getElementById( 'tableBody' );
  let newCart = "";

  list.forEach( (item) =>
  {
    newCart += createRow( item );
  })

  newCart +=
      "<tr id='totalRow'>" +
        "<td></td>" +
        "<td></td>" +
        "<td><b>Total: </b></td>" +
        "<td id='totalCost'>R" + localStorage.getItem( "totalCost" ) + "</td>" +
      "</tr>"

  htmlList.innerHTML += newCart;
}

//-------------------------------------------------------------------[createRow]
function createRow( item )
{
  return  "<tr>" +
            "<td>" +
              "<button class='btn btn-danger btn-sm'>" +
                "<i class='fa-solid fa-xmark'></i>" +
              "</button> " + item.title +
            "</td>" +
            "<td>R" + item.ticket_price + "</td>" +
            "<td>" +
              "<button class='btn btn-info btn-sm'>" +
                "<i class='fa-solid fa-arrow-left'></i>" +
              "</button> " +
              item.tickets_in_cart +
              " <button class='btn btn-info btn-sm'>" +
                "<i class='fa-solid fa-arrow-right'></i>" +
              "</button>" +
            "</td>" +
            "<td>R" + ( item.ticket_price * item.tickets_in_cart) + "</td>" +
          "</tr>"
}