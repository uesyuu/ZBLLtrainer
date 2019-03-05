var listZBLL = {
  U:['BBFF','BFFB','FFLR','FRLF','LFFR','LRFF'],
  T:['BBFF','FBFB','FFLR','FLFR','RFLF','RLFF'],
  L:['FBRL','LBFF','LFFB','LFFR','LRFF','RFBL'],
  H:['BBFF','FBFB','RFLF','RLFF'],
  Pi:['BFFB','FBFB','FRFL','FRLF','LFRF','RFFL'],
  S:['FBBF','FBFB','FLFR','FLRF','LFFR','LFRF'],
  aS:['FBBF','FBFB','FRFL','FRLF','LFRF','RFFL']
};

var listPattern = ['AsA','AsC','AsO','CsA','CsC','CsO','CxO','OsA','OsC','OsO','OxC','OxO'];

var listSelected = {};

window.onload = function(){
  var text = ['ZBLL練習用タイマーです。\n',
  '手順選択画面で手順を選択するとそれらの手順の練習ができます。\n',
  '最初に「x秒を超えた手順を記録」ボタンを押しておくと、その秒数を超えた手順が記録されます。\n',
  'ある程度測り終わった後「x秒を超えた手順のみを出題」ボタンを押すと、x秒を超えた手順のみを出題のみを出題してくれます。',
  '「x秒を超えた全手順を表示」ボタンを押すと、x秒を超えた全手順がタイマー下に表示されます。']
  alert(text[0] + text[1] + text[2] + text[3] + text[4]);

  for(var i in listZBLL){
    var table = '<span class="name">' + i + '</span>';
    table += '<img src="img/' + i + '.svg" width="50" id="' + i + '">';
    table += '<table border="1" class="inner" style="display:none;"><tr>';
    for(var j=0;j<listZBLL[i].length;j++){
      table += '<td><span class="name">' + listZBLL[i][j] + '</span>';
      table += '<img src="img/' + i + '-' + listZBLL[i][j] + '.svg" width="50" id="' + i + '_' + listZBLL[i][j] + '">';
      table += '<table border="1" style="display:none;">';
      for(var k=0;k<listPattern.length;k++){
        if(k==0 || k==4 || k==8){
          table +='<tr>';
        }
        table += '<td><span class="name">' + listPattern[k] + '</span>';
        table += '<img src="img/' + i + '-' + listZBLL[i][j] + '-' + listPattern[k] + '.svg" width="50" id="' + i + '_' + listZBLL[i][j] + '_' + listPattern[k] + '"></td>';
        if(k==3 || k==7 || k==11){
          table +='</tr>';
        }
      }
      table += '</table>';
      table += '</td>'
    }
    table += '</tr></table>';
    $('#'+i+'case').append(table);
//    console.log(i);
  }

  $('#exceedAlg').html('');
  for(var i=0;i<localStorage.length;i++){
    var ZBLLname = localStorage.key(i).split('_');
    $('#exceedAlg').append('<tr><td>' + localStorage.key(i) + '</td><td><img src="img/' + ZBLLname[0] + '-' + ZBLLname[1] + '-' + ZBLLname[2] + '.svg" width="50"></td></tr>')
  }
};

$(document).on('click touchstart','#select .name',function(){
  if($(this).nextAll('.inner').css('display') == 'none'){
    $(this).nextAll('.inner').css('display','block');
  }else{
    $(this).nextAll('.inner').css('display','none');
  }
//  console.log($(this).nextAll('.inner'));
//  $(this).nextAll('.inner').slideToggle();
});

$(document).on('click touchstart','#select .inner .name',function(){
  if($(this).nextAll('table').css('display') == 'none'){
    $(this).nextAll('table').css('display','block');
  }else{
    $(this).nextAll('table').css('display','none');
  }
//  $(this).nextAll('table').slideToggle();
});

$(document).on('click','#select img',function(){
  if($(this).css('opacity') == 1){
    $(this).css('opacity','0.5');
//    $(this).parent().css('background-color','lightgreen');
    var ZBLLname = $(this).attr('id').split('_');
    if(ZBLLname.length == 1){
      $(this).parent().find('img').css('opacity','0.5');
      for(var i=0;i<listZBLL[ZBLLname[0]].length;i++){
        for(var j=0;j<listPattern.length;j++){
          listSelected[ZBLLname[0] + '_' + listZBLL[ZBLLname[0]][i] + '_' + listPattern[j]] = scramble[ZBLLname[0]][listZBLL[ZBLLname[0]][i]][listPattern[j]];
        }
      }
    }else if(ZBLLname.length == 2){
      $(this).parent().find('img').css('opacity','0.5');
      for(var i=0;i<listPattern.length;i++){
        listSelected[ZBLLname[0] + '_' + ZBLLname[1] + '_' + listPattern[i]] = scramble[ZBLLname[0]][ZBLLname[1]][listPattern[i]];
      }
    }else if(ZBLLname.length == 3){
      listSelected[$(this).attr('id')] = scramble[ZBLLname[0]][ZBLLname[1]][ZBLLname[2]];
    }
//    console.log(listSelected);
//    listSelected[$(this).attr('id')] = scramble[ZBLLname[0]][ZBLLname[1]][ZBLLname[2]];
  }else{
    $(this).css('opacity','1');
//    $(this).parent().css('background-color','white');
    var ZBLLname = $(this).attr('id').split('_');
    if(ZBLLname.length == 1){
      $(this).parent().find('img').css('opacity','1');
      for(var i=0;i<listZBLL[ZBLLname[0]].length;i++){
        for(var j=0;j<listPattern.length;j++){
          delete listSelected[ZBLLname[0] + '_' + listZBLL[ZBLLname[0]][i] + '_' + listPattern[j]];
        }
      }
    }else if(ZBLLname.length == 2){
      $(this).parent().find('img').css('opacity','1');
//      console.log($(this).parentsUntil('img'));
      $(this).parentsUntil('img').children('img').css('opacity','1');
      for(var i=0;i<listPattern.length;i++){
        delete listSelected[ZBLLname[0] + '_' + ZBLLname[1] + '_' + listPattern[i]];
      }
    }else if(ZBLLname.length == 3){
//      console.log($(this).parentsUntil('img').children('img'));
      $(this).parentsUntil('img').children('img').css('opacity','1');
      delete listSelected[$(this).attr('id')]
    }
//    console.log(listSelected);
//    delete listSelected[$(this).attr('id')];
  }
});

var timeList = ['time list:<br>'];

$('#switch').click(function(){
  if($('#select').css('display') == 'block'){
    $('#switch').text('手順選択画面に移動');
    $('#select').css('display','none');
    $('#timer').css('display','block');
    timer();
  }else{
    $('#switch').text('タイマー画面に移動');
    $('#select').css('display','block');
    $('#timer').css('display','none');
    clearTimeout(timerID);
  }
});

var scrambleID;

function timer(){
  var keys = Object.keys(listSelected);
  $('#num').text(keys.length + 'selected');

  var keys = Object.keys(listSelected);
  if(exceedFlag && localStorage.length != 0){
    var random1 = Math.floor(Math.random() * localStorage.length);
    var random2 = Math.floor(Math.random() * 12);
    scrambleID = localStorage.key(random1);
    console.log(scrambleID);
    $('#scramble').text(localStorage[scrambleID].split('_')[random2]);
  }else if(!exceedFlag && keys.length != 0){
    var random1 = Math.floor(Math.random() * keys.length);
    var random2 = Math.floor(Math.random() * 12);
    scrambleID = Object.keys(listSelected)[random1];
    $('#scramble').text(listSelected[scrambleID][random2]);
  }else{
    $('#scramble').text('No pattern selected');
  }

  $('#timerDisplay').text('00:00.00');

  $('#timelist').html(timeList[0]);
  for(var i=1;i<timeList.length;i++){
    $('#timelist').append(timeList[i] + ', ');
  }
}

var startTime = 0;
var elapsedTime = 0;
var stopTime = [];
var timerID = 0;

function updateTimeToText(){
  var m = Math.floor(elapsedTime / 60000);
  var s = Math.floor(elapsedTime % 60000 / 1000);
  var ms = elapsedTime % 1000;

  m = ('0'+m).slice(-2);
  s = ('0'+s).slice(-2);
  ms = ('0'+ms).slice(-2);
  stopTime = [m,s,ms];

  $('#timerDisplay').text(m + ':' + s + '.' + ms);
}

function countUp(){
  timerID = setTimeout(function(){
    elapsedTime = Date.now() - startTime;
    updateTimeToText();
    countUp();
  },10);
}

$('#sessionReset').click(function(){
  timeList = ['time list:<br>'];
  $('#timelist').html(timeList[0]);
});

var exceedSecond = 4;
$('#exceedRecord').click(function(){
  exceedSecond = $('option:selected').val();
  $('#exceedTime1').text(exceedSecond);
  $('#exceedTime2').text(exceedSecond);
  $('#exceedTime3').text(exceedSecond);
  $('#exceedTime4').text(exceedSecond);
});

var exceedFlag = false;
$('#exceedStart').click(function(){
  if(exceedFlag){
    exceedFlag = false;
    $('#exceedStart').text(exceedSecond + '秒を超えた手順のみを出題');
  }else{
    exceedFlag = true;
    $('#exceedStart').text('選択した全ての手順を出題');
  }
  timer();
});

$('#exceedReset').click(function(){
  localStorage.clear();
  alert('リセットしました');
  $('#exceedAlg').html('');
});

$('#exceedAlgDisplay').click(function(){
  console.log($('#exceedAlg').css('display'));
  if($('#exceedAlg').css('display') == 'none'){
    $('#hyoji').text('非表示');
    $('#exceedAlg').css('display','block');
  }else{
    $('#hyoji').text('表示');
    $('#exceedAlg').css('display','none');
  }
});

$(window).on('keydown',function(){
  timerRun();
});

$(timerDisplay).on('touchstart',function(){
  timerRun();
});

function timerRun(){
  if($('#select').css('display') == 'none'){
    if(startTime == 0){
      startTime = Date.now();
      countUp();
    }else{
      clearTimeout(timerID);
      startTime = 0;
      elapsedTime = 0;

      var nowTime = 0;
      if(parseInt(stopTime[0]) == 0){
        nowTime = parseInt(stopTime[1]) + '.' + stopTime[2];
      }else{
        nowTime = parseInt(stopTime[0]) + ':' + stopTime[1] + '.' + stopTime[2];
      }
      timeList.push(nowTime);
      $('#timelist').html(timeList[0]);
      for(var i=1;i<timeList.length;i++){
        $('#timelist').append(timeList[i] + ', ');
      }

      if(parseInt(stopTime[0]) * 60 + parseInt(stopTime[1]) >= parseInt(exceedSecond)){
        var ZBLLname = scrambleID.split('_');
        localStorage[scrambleID] = scramble[ZBLLname[0]][ZBLLname[1]][ZBLLname[2]].toString();
      }else if(localStorage[scrambleID]){
        localStorage.removeItem(scrambleID);
      }

      $('#exceedAlg').html('');
      for(var i=0;i<localStorage.length;i++){
        var ZBLLname = localStorage.key(i).split('_');
        $('#exceedAlg').append('<tr><td>' + localStorage.key(i) + '</td><td><img src="img/' + ZBLLname[0] + '-' + ZBLLname[1] + '-' + ZBLLname[2] + '.svg" width="50"></td></tr>')
      }
      
      var keys = Object.keys(listSelected);
      if(exceedFlag && localStorage.length != 0){
        var random1 = Math.floor(Math.random() * localStorage.length);
        var random2 = Math.floor(Math.random() * 12);
        scrambleID = localStorage.key(random1);
        $('#scramble').text(localStorage[scrambleID].split('_')[random2]);
      }else if(!exceedFlag && keys.length != 0){
        var random1 = Math.floor(Math.random() * keys.length);
        var random2 = Math.floor(Math.random() * 12);
        scrambleID = Object.keys(listSelected)[random1];
        $('#scramble').text(listSelected[scrambleID][random2]);
      }else if(exceedFlag && localStorage.length == 0){
        $('#scramble').text('出題された全ての手順で' + exceedSecond + '秒を切りました！');
      }else{
        $('#scramble').text('No pattern selected');
      }
    }
  }
}
