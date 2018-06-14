$(() => {
  // console.log('workoddio');

  //VARIABLES & CONSTANTS

  const $cards = $('.cards');
  const $card = $('.card');
  const $start = $('#start');
  const $reset = $('#reset');
  const $items = $('#items');
  const $wrongs = $('#wrongs');
  const $display = $('#display');
  let divIndex = 1;
  let i = 0;
  let lost = 0;
  let wrong = 0;
  let twoPicks = [];
  let yourItems = [];
  let storeDivs = [];

  let deckCards = ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom','mushroom','mushroom', 'star', 'star', 'star', 'star', '1up', '1up', '10-coins','10-coins', '20-coins', '20-coins'];
  // console.log(deckCards);

  // let randomNumber = Math.floor(Math.random() * deckCards.length);

  //FUNCTIONS

  //This sets the 2 divs back to original state AND reset storeDivs
  function storeDivsReset () {
    console.log('wrong')
    $(storeDivs[0]).css({"pointer-events": "auto","background-color":"white", "text-indent": "-9999px", "background-image": "url('./images/ace-of-spade.jpg')"});
    $(storeDivs[1]).css({"pointer-events": "auto","background-color":"white", "text-indent": "-9999px", "background-image": "url('./images/ace-of-spade.jpg')"});
    storeDivs = [];
  };

  //This Resets the Game
  function reset() {
    //This hides the cards
    $cards.hide();
    //This resets DISPLAY
    $display.show();
    //sets back the ace of spades
    $card.css({ "text-indent": "-9999px", "background-image": "url('./images/ace-of-spade.jpg')" });
    divIndex = 1;
    $card.text('');
    deckCards = ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom','mushroom','mushroom', 'star', 'star', 'star', 'star', '1up', '1up', '10-coins','10-coins', '20-coins', '20-coins'];
    $card.css({"pointer-events": "auto","background-color":"white"});
    $card.off();
    $items.text('');
    console.log('RESeeET');
    $wrongs.text(0)
    wrong = 0;
    lost = 0;
    yourItems = [];
  };

  //This starts the Game
  function start() {

    //This shows the cards
    // $cards.css({"display":"block"});

    //This sets the Cards on the Table Randomly
    while (deckCards.length > 0) {

      //This gets a random Element from the card deck and its Index
      let randomNumber = Math.floor(Math.random() * deckCards.length);
      let randomCard = deckCards[randomNumber];
      let indexArray = deckCards.indexOf(randomCard);
      // console.log(randomCard, indexArray);

      //removes that Element from the Deck
      deckCards.splice(indexArray, 1);
      // console.log('remaining cards: ' + deckCards);

      //sets that Element as ID, sets the Ace image and advances to the next div
      let div = ('#' + 'card' + divIndex);
      // console.log(div);
      $('img', $(div)).attr({
        "id" : randomCard,
        "src" : "./images/ace-of-spade.jpg"
      });
      divIndex++;

    };

    //This Picks a Card
    $('img').on('click', (e) => {

      //This removes the ace of spades
      $(e.target).css({"background-image": "none"});
      //This brings the text in the foreground
      $(e.target).css({"text-indent": "1px"});
      //This sets the image
      let url = ('./images/' + $(e.target).text() + '.jpg');
      // console.log(url);
      $('img', $(this)).src = './images/' + $(e.target).text() + '.jpg';
      // $(e.target).css({"background-image": "url(" + url + ")"});

      twoPicks[i] = $(e.target).text();
      $(e.target).css({"pointer-events": "none", "background-color":"grey"})

      console.log('twoPicks: ' + twoPicks);
      // console.log(twoPicks[1]);

      //This store that Div inside an Array for a possible reset
      // let x = $(e.target).id;
      // console.log('x: ' + x);
      storeDivs[i] = '#' + $(e.target).attr('id');
      console.log('storeDiv: ' + storeDivs);

      i++;

      //This checks the 2 Cards
      if (twoPicks[1] !== undefined) {
        if (twoPicks[0] === twoPicks[1]) {
          console.log('right');
          yourItems.push(twoPicks[0]);
          $items.text(yourItems.join(', '));
          twoPicks = [];
          i = 0;
          storeDivs = [];
        }
        else {
          setTimeout(storeDivsReset, 1000);

          twoPicks = [];
          i = 0;
          lost++;
          wrong++;
          $wrongs.text(wrong)

        };

        //This checks if 2 lost
        if (lost === 3) {
          console.log('LOSssTTT');
          $display.hide();
          // $('#display').text('You Lost');
          $card.css({"pointer-events":"none"});
          setTimeout(reset, 1000);
        }
      }

    });
  };

  //EVENT LISTENERS

  //This Starts the Game
  $start.on('click', () => {
    start();
  });

  // This Resets the Game
  $reset.on('click', () =>{
    reset();
  });

});
