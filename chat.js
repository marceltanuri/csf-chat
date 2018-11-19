//CPF validation
$("#customerCPF").on('keyup', function() {
  var buttonCPF = $("#buttonCPF");
  if($(this).val().length==11){
    if(validaCPF($(this).val())){
      $("#msgInvalidCPF").hide();
      $(buttonCPF).removeAttr('disabled');
    }
    else{
     $("#msgInvalidCPF").show();
     $(buttonCPF).attr('disabled','disabled');
    }
  }
  else{
    $(buttonCPF).attr('disabled','disabled');
    $("#msgInvalidCPF").hide();
  }
}
);

//Display Chat
function openForm() {
  $("#chatPanel").show();
}

function startChat(){
  var iframe = $('<iframe/>');
  $(iframe).attr({
      src : '/group/logada/dados-cadastrais',
      style : 'display:none',
      onload : "loadChat(this)"
  });
 $(iframe).appendTo("body");
}

//Hide Chat
function closeForm() {
    document.getElementById("chatPanel").style.display = "none";
}

//Init Chat by getting required customer information from dados-cadastrais page
function loadChat(iframeDadosCadastrais){

  var cpf = $("#customerCPF").val();

  var email = $(iframeDadosCadastrais).contents().find('#email').val();
  if (email == ""){
      email = $(iframeDadosCadastrais).contents().find('#email').html();
  }

  var dddphone = $(iframeDadosCadastrais).contents().find('#dddphone').val();
  if (dddphone == ""){
      dddphone = $(iframeDadosCadastrais).contents().find('#dddphone').html();
  }

  var phone = $(iframeDadosCadastrais).contents().find('#phone').val();
  if (phone == ""){
      phone = $(iframeDadosCadastrais).contents().find('#phone').html();
  }

  var dddcellphone = $(iframeDadosCadastrais).contents().find('#dddcellphone').val();
  if (dddcellphone == ""){
      dddcellphone = $(iframeDadosCadastrais).contents().find('#dddcellphone').html();
  }

  var cellphone = $(iframeDadosCadastrais).contents().find('#cellphone').val();
  if (cellphone == ""){
      cellphone = $(iframeDadosCadastrais).contents().find('#cellphone').html();
  }

  var finalphone = dddcellphone + cellphone;
  if(finalphone==""){
      finalphone==dddphone + phone;
  }

var name = $(".dadosCartao").eq(0).find("p").eq(0).find("span").eq(0).html();
  
var accountNumber = $(iframeDadosCadastrais).contents().find('#accountNumber').val(); //not using yet
if (accountNumber == ""){
      accountNumber = $(iframeDadosCadastrais).contents().find('#accountNumber').html();
}

  $("#chatWelcome").hide();
  $("#chatForm").css("height","480px");
  $("#iframeChat").attr("src","http://chat.atendimentocarrefour.com/chat/client/?name="+name+"&phone="+finalphone+"&cpf="+cpf+"&email="+email).show();
}

function validaCPF(cpf)
  {
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
          return false;
    for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
        return false;
  }

   $(".allownumericwithoutdecimal").on("keypress keyup blur",function (event) {
           $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

   var saoPauloCurrentTime = new Promise(function(resolve, reject) {
  $.ajax({
     type: "GET",
     dataType: "jsonp",
     url: "http://jsonpwrapper.com/?urls%5B%5D=http%3A%2F%2Fworldtimeapi.org%2Fapi%2Ftimezone%2FAmerica%2FSao_Paulo&callback=?",
     success: function(data){
       var datetime = JSON.parse(data[0].body).datetime;
       var time = datetime.substring(datetime.indexOf("T")+1,datetime.indexOf("."));
       resolve(time.replace(":","").replace(":",""));
     }, error: function(){resolve("");}
  });
});

saoPauloCurrentTime.then(function(value) {
});
