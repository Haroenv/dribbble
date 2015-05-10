!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,s){if(arguments.length>1&&!e.isFunction(c)){if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){var a=s.expires,d=s.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*a)}return document.cookie=[n(t),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var x=p[l].split("="),g=o(x.shift()),j=x.join("=");if(t===g){f=r(j,c);break}t||void 0===(j=r(j))||(f[g]=j)}return f};u.defaults={},e.removeCookie=function(n,o){return e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n)}});


var myDataRef = new Firebase('https://dbbb-parismeetup.firebaseio.com/');
var _isDisabled = false;


$.fn.selectRange = function(start, end) {
  if(!end) end = start; 
  return this.each(function() {
    if (this.setSelectionRange) {
      this.focus();
      this.setSelectionRange(start, end);
    } else if (this.createTextRange) {
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  });
};

function init(){
  var dbbbColor = $('input[type="button"]').css('background-color');
  $('input[type="button"],input[type="email"],input[type="checkbox"]').prop('disabled', _isDisabled);

  setTimeout(function(){
    if ($.cookie('alreadyIn')=='1') {
      $('fieldset').css('border-color', dbbbColor);
      $('.separator-x').css('background-color', dbbbColor);
      $('input[type="button"]').parent().prepend('<h2 style="color:'+dbbbColor+'">You are already in the list</h2>');
      $('input[type="button"').remove();
    }
  }, 100);
}


function addArobaze(){
  $('input[type="text"]').on('click', function(){
    if(!$(this).val()){
      $(this).attr('value','@');
      $(this).selectRange(1);
    }
  })
}

function getUserName(){
  $('input[type="text"]').on('keyup keydown blur', function(){
    var _t = $(this);
    var _tval = _t.val();
    var _userName = _t.val().replace('@','');
    fetchUserInformations(_userName);
  });
};
function fetchUserInformations(_name){
  $.jribbble.getPlayerById(_name, function (player) {
    $('#detector').attr('value', player.avatar_url );
    $('input[type="text"]').closest('fieldset').addClass('done')
    $('input[type="email"]').prop('disabled', false)
  });
};

function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
  return pattern.test(emailAddress);
};

function emailDetection(){
  $('input[type="email"]').on('blur', function(){
    var emailAddress = $(this).val();
    if( isValidEmailAddress( emailAddress ) ) { 
      $(this).closest('fieldset').addClass('done');
      $('input[type="checkbox"]').prop('disabled', false);
    }
  })
}

function datePicker(){
  $('input[type="checkbox"]').on('click', function(){
    $('input[type="button"]').prop('disabled', false);

    if($('#jeudi-25-juin').is(':checked')){
      $('#dates').attr('value','jeudi-25-juin')
    }
    if($('#vendredi-26-juin').is(':checked')){
      $('#dates').attr('value','vendredi-26-juin')
    }
    if($('#jeudi-25-juin').is(':checked') && $('#vendredi-26-juin').is(':checked')){
      $('#dates').attr('value','jeudi / vendredi')
    }

  })
}

function confirmFirstStep(){
  $('input[type="button"]').on('click', function(e){
    e.preventDefault();


    $("#inscription").addClass('hidden');
    $("#load").removeClass('hidden');

    setTimeout(function(){
      $("#thankyou").removeClass('hidden');
      $("#load").addClass('hidden');
    }, 1258)

    setupThankyou();
  })

  function setupThankyou(){
    var userName = $('input[type="text"]').val();
    var userEmail = $('input[type="email"]').val();
    var userImage = $('#detector').val();
    var selectedDates = $('#dates').val();



    $('#userName').empty().append(userName);
    $('#userImage').attr('src', userImage);

    // Push user data to firebase 
    myDataRef.push({name: userName, avatar: userImage, email: userEmail, dates: selectedDates });

    // Set a cookie to avoid the user to readd his email
    $.cookie('alreadyIn', '1', { expires: 365 });
  }
}

function showMore(){
  $('#showMore').on('click', function(e){
    e.preventDefault();
    if($(this).text()=='Voir tous ...'){
      $(this).empty().append('Voir moins..');
      $('.user-list').animate({
        height: "1200px",
      }, 0, function() {}).css('overflow','auto');
    }
    else{
      $(this).empty().append('Voir tous ...');
      $('.user-list').removeClass('open');
      $('.user-list').animate({
        height: "210px",
        scrollTop: 0
      }, 0, function() {}).css('overflow','hidden');
      $('.user-list ul').animate({ scrollTop: 0}, 800, 'swing');
    }

  })
}

function form(){
  addArobaze();
  getUserName();
  emailDetection();
  datePicker();
  confirmFirstStep();
}

function deploy(){
  init();
  form();
  showMore();
};


$(document).ready(function(){
  deploy()
});