
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
    const type = parseInt($(this).val());
    connect4.players[Game.PLAYER_ONE] = type;
    if (type == PlayerType.Human || type == PlayerType.Random) {
      $('#div-depthOne').addClass('invisible');
    }
    else { $('#div-depthOne').removeClass('invisible'); }
  })

  $('#playerTwo').change(function() {
    const type = parseInt($(this).val());
    connect4.players[Game.PLAYER_TWO] = type;
    if (type == PlayerType.Human || type == PlayerType.Random) {
      $('#div-depthTwo').addClass('invisible');
    }
    else { $('#div-depthTwo').removeClass('invisible'); }
  })

  $('#depthOne').on('input', function() {
    $('#out-depthOne').val(this.value);
    SearchDepth[Game.PLAYER_ONE] = this.value;
  })

  $('#depthTwo').on('input', function() {
    $('#out-depthTwo').val(this.value);
    SearchDepth[Game.PLAYER_TWO] = this.value;
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