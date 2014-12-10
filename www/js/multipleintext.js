var MultipleInText = (function($){
  "use strict";
  var multipleInText = {};

  var _answers = null;

  multipleInText.init = function(){
    _answers = [];
    $('button.falsetrue_validate').on('click', function(){ multipleInText.validate();});
    $('button.falsetrue_reset').on('click', function(){ multipleInText.reset();});
  };


  multipleInText.add_question = function(selectid, validanswer, defaultanswer){
    _answers.push({id:selectid, valid: validanswer, default: defaultanswer});
    console.log(_answers);
  };


  multipleInText.validate = function(){

    var valid = true;

    _answers.forEach(function(answer){
        var select = $("select#"+answer.id)[0];
      if(select.options[select.selectedIndex].value != answer.valid){
        valid = false;
      }

     if(valid){
      $('.feedback_bad').hide(100);
      $('.feedback_ok').show(200);
    }else{
      $('.feedback_ok').hide(100);
      $('.feedback_bad').show(200);
    }

    });
  };

  multipleInText.reset = function(){
      $('.feedback_ok').hide(100);
      $('.feedback_bad').hide(100);

 return multipleInText;

})($);
