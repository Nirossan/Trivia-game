$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
   
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
   
    questions: {
      q1: '1. What type of galaxy is the most common in the universe?',
      q2: '2. What is the coldest place in the universe?',
      q3: '3.How many moons are in our Solar System?',
      q4: '4.What is the longest continuous time a human has spent in space?',
      q5: '5.What has a gravitational pull so strong that even light cannot escape it?',
      q6: '6.The hottest place in the universe is located in which constellation?',
     
    },
    options: {
      q1: ['The Boomerang Nebula', 'Elliptical galaxies', 'Mercury', 'Red dwarf stars'],
      q2: ['Mercury', 'Red dwarf stars', 'The Boomerang Nebula', 'Proxima Centauri'],
      q3: ['50', '240', '121', '181'],
      q4: ['43 days ', '237 days', '437 days', '612 days'],
      q5: ['The constellation Virgo','A black hole','Centre of Earth','Sun'],
      q6: ['Milky way','Nebulla','The constellation Virgo','Proxima Centauri'],
     
    },
    answers: {
      q1: 'Elliptical galaxies',
      q2: 'The Boomerang Nebula',
      q3: '181',
      q4: '437 days',
      q5: 'A black hole',
      q6: 'The constellation Virgo',
     
    },
   
    startGame: function(){
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      
      $('#game').show();
    
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
   
    nextQuestion : function(){
      
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      

      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
  
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
     
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
   
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
     
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
    
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
         $('#game').hide();
        $('#start').show();
      }
      
    },
  
    guessChecker : function() {
      
    var resultId;
     var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
    
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
         $(this).addClass('btn-danger').removeClass('btn-info');
         trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
  
    guessResult : function(){
    
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
       
    }
  
  }