
$(document).ready(function() {

  const connect4 = new ConnectN('#gameboard', 7, 6);
  var up;
  $('#btnStop').attr('disabled', 1);

  function Start() {
    connect4.Update();
  }

  function Stop() {
    clearInterval(up);
  }

  $('#playerOne').change(function() {
    connect4.players[Game.PLAYER_ONE] = parseInt($(this).val());
  })

  $('#playerTwo').change(function() {
    connect4.players[Game.PLAYER_TWO] = parseInt($(this).val());
  })

  $('#btnStart').click(function() {
    connect4.Start();
    up = setInterval(Start, 10000 / AppConfig.FPS);
    $('#btnStart').attr('disabled', 1);
    $('#btnStop').removeAttr('disabled', 1);
  })

  $('#btnRestart').click(function() {
    connect4.Restart();
    $('#btnStart').trigger('click');
  })

  $('#btnStop').click(function() {
    connect4.Stop();
    Stop();
    $('#btnStart').removeAttr('disabled', 1);
    $('#btnStop').attr('disabled', 1);
  })  

  $('#btnUndo').click(function() {
    connect4.Undo();
  })

});