$(() => {
  // console.log('workoddio');

  //VARIABLES & CONSTANTS

  const $cards = $('.cards');
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

  let deckCards = ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom','mushroom','mushroom', 'star', 'star', '1up', '1up', '10-coins','10-coins', '20-coins', '20-coins'];
  // console.log(deckCards);

  // This hides Cards & Display
  $cards.hide();
  $display.hide();

  //FUNCTIONS

  //This sets the 2 divs back to original state AND reset storeDivs
  //$(storeDivs[1]).children():focus{outline: none !important; box-shadow: none};
  function storeDivsReset () {
    console.log('wrong')
     // .btn:focus,.btn:active {outline: none !important; box-shadow: none;}
    $(storeDivs[0]).children().blur();
    $(storeDivs[0]).children().css({"pointer-events": "auto", "outline":"none"});
    $(storeDivs[0]).children().attr({"src": "./images/ace-of-spade.jpg"});
    $(storeDivs[1]).children().blur();
    $(storeDivs[1]).children().css({"pointer-events": "auto", "outline":"none"});
    $(storeDivs[1]).children().attr({"src": "./images/ace-of-spade.jpg"});
    storeDivs = [];
  };

  //This Resets the Game
  function reset() {
    //This hides the cards
    $cards.hide();
    //This resets DISPLAY
    $display.hide();

    divIndex = 1;

    deckCards = ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom','mushroom','mushroom', 'star', 'star', '1up', '1up', '10-coins','10-coins', '20-coins', '20-coins'];
    $cards.find('img').css({"pointer-events": "auto"});
    $cards.find('img').off();
    $cards.find('img').attr({"src": ""});
    $items.text('');
    console.log('RESeeET');
    $wrongs.text(0)
    wrong = 0;
    lost = 0;
    yourItems = [];
  };

  //This starts the Game
  function start() {

    //This shows the cards & the Display
    $cards.show();
    $display.show();

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

      //sets that Element as ID in an imgage, sets the Ace image
      let div = ('#' + 'card' + divIndex);
      // console.log(div);
      $('img', $(div)).attr({
        "id": randomCard,
        "src": "./images/ace-of-spade.jpg"
      });
      // and advances to the next div
      divIndex++;
    };

    //Event Listener on Picking a Card
    $('img').on('click', (e) => {
      // console.log($(e.target));

      //This sets the image
      $(e.target).attr({'src':'./images/' + $(e.target).attr('id') + '.jpg'});

      twoPicks[i] = $(e.target).attr('id');
      $(e.target).css({"pointer-events": "none", "background-color":"grey"})

      console.log('twoPicks: ' + twoPicks);
      // console.log(twoPicks[1]);

      //This store that Div inside an Array for a possible reset
      storeDivs[i] = '#' + $(e.target).parent().attr('id');
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

        //This checks if 3 lost
        if (lost === 3) {
          console.log('LOSssTTT');
          $display.hide();
          // $('#display').text('You Lost');
          $cards.children().css({"pointer-events":"none"});
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
