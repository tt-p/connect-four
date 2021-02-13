
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
      $('#depthOne').attr('disabled', 1);
    }
    else { $('#depthOne').removeAttr('disabled'); }
    if (type == PlayerType.Human || type == PlayerType.Random || type == PlayerType.Minimax) {
      $('#timeOne').attr('disabled', 1);
    }
    else { $('#timeOne').removeAttr('disabled'); }
  })

  $('#playerTwo').change(function() {
    const type = parseInt($(this).val());
    connect4.players[Game.PLAYER_TWO] = type;
    if (type == PlayerType.Human || type == PlayerType.Random) {
      $('#depthTwo').attr('disabled', 1);
    }
    else { $('#depthTwo').removeAttr('disabled'); }
    if (type == PlayerType.Human || type == PlayerType.Random || type == PlayerType.Minimax) {
      $('#timeTwo').attr('disabled', 1);
    }
    else { $('#timeTwo').removeAttr('disabled'); }
  })

  $('#depthOne').on('input', function() {
    $('#out-depthOne').val(this.value);
    SearchDepth[Game.PLAYER_ONE] = this.value;
  })

  $('#depthTwo').on('input', function() {
    $('#out-depthTwo').val(this.value);
    SearchDepth[Game.PLAYER_TWO] = this.value;
  })

  $('#timeOne').on('input', function() {
    $('#out-timeOne').val(this.value);
    TimeLimit[Game.PLAYER_ONE] = this.value;
  })

  $('#timeTwo').on('input', function() {
    $('#out-timeTwo').val(this.value);
    TimeLimit[Game.PLAYER_TWO] = this.value;
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