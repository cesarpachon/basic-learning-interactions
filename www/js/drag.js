var Drag = (function($){
  "use strict";
  var drag = {};

  //array of booleans
  var _answers = [];
  var _validanswers = [];

	var _svg_container = null;


  drag.init = function(cb){

    $.ajax({
      type:"GET",
      url: "drag.svg",
      dataType: "html",
      success: function( svg ) {
				_svg_container=$("#svg_container");
         _svg_container.html(svg);
         $('button.falsetrue_validate').on('click', function(){ drag.validate();});
         $('button.falsetrue_reset').on('click', function(){ drag.reset();});
        cb();
      }
    });

  };


	/**
	* insert a Dropable div trying to match the position of the given svg element
	*/
	drag.add_droppable = function(svg_item_id){
		var svg_item = $("#"+svg_item_id)[0];
		//var matrix = svg_item.getScreenCTM();


		//get the height of the document
		var docheight = parseInt($("svg").attr("height"));
		console.log("docheight: ", docheight);

		//get the global offset of inkscape
		var transformstr = $("#layer1").attr("transform");
		transformstr  = transformstr.replace("translate(", "");
		transformstr  = transformstr.replace(")", "");
		var tokens = transformstr.split(",");
		var offx = parseInt(tokens[0]);
		var offy = parseInt(tokens[1]);

		console.log("offx: ", offx, "offy:", offy);


		function getAttribPx(item, attr){
			var val = item.getAttribute(attr);
			return Math.floor(val);
		}

		var x = getAttribPx(svg_item, "x");
		var y = getAttribPx(svg_item, "y");

		console.log("svg_ittem attribs x, y: ", x, y);


		var left = (x + offx) + "px";
				var top =  (y- docheight /*- offy */) + "px";

		var div = "<div class='drop_item' style=' ";
		div += "left: "+ left + "; ";
		div += "top: "+ top+ "; ";
		div += "'>"+svg_item_id+"</div>";
		console.log(div);
		_svg_container.append($(div));
	};


  drag.add_question = function(question, validanswer){
    console.log("adding question");
    var id = "question_"+_answers.length;
    var $input = $(
       "<li>"+
      '<div id="'+id+'">'
      +'<p class="question">'
      + question+'</p>'
      +'<input type="radio" id="'+id+'1" name="'+id+'"><label for="'+id+'1">True</label>'
      +'<input type="radio" id="'+id+'2" name="'+id+'" checked="checked"><label for="'+id+'2">False</label>'
      +'</div>'
      +"</li>");

    $input.buttonset();

    $input.on("click", "*[type='radio']", function(){
      var $this = $(this);
      var _q = $this.attr('name');
      var _val = $this.attr('id').substr(_q.length) === "1";
      var _index = parseInt(_q.substr("question_".length));
      _answers[_index] = _val;
    });

    $('ol.falsetrue_questions').append($input);

    _answers.push(false);
    _validanswers.push(validanswer);
  };


  drag.validate = function(){

    var valid = true;
    for(var i = 0; i<_answers.length; ++i){
      valid = valid && (_answers[i] === _validanswers[i]);
    }

    if(valid){
      $('.feedback_bad').hide(100);
      $('.feedback_ok').show(200);
    }else{
      $('.feedback_ok').hide(100);
      $('.feedback_bad').show(200);
    }

  };

  drag.reset = function(){
      $('.feedback_ok').hide(100);
      $('.feedback_bad').hide(100);
    console.log("reset");
    for(var i=0; i< _answers.length; ++i){
      _answers[i] = false;
    }
  };

  return drag;

})($);
