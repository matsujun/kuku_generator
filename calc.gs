var PAGE_INFO = {
  "18": {
    fontSize   : 18,
    rowPerPage : 18,
    colPerRow  : 4
  },
  "24": {
    fontSize   : 24,
    rowPerPage : 14,
    colPerRow  : 3
  },
  "32": {
    fontSize   : 32,
    rowPerPage : 11,
    colPerRow  : 2
  }
}
  

var CALC_TYPE_ADD = "add";
var CALC_TYPE_SUB = "sub";
var CALC_TYPE_MUL = "mul";
var CALC_TYPE_DIV = "div";

var CALC_TYPE_SIGN = {
  "add" : "+",
  "sub" : "-",
  "mul" : "×",
  "div" : "÷",
}

function onOpen(e) {
  var html = HtmlService
               .createTemplateFromFile('sidebar')
               .evaluate()
               .setSandboxMode(HtmlService.SandboxMode.IFRAME)
               .setTitle('計算ドリルの生成');
  DocumentApp.getUi().showSidebar(html);
}

function makeCalcDrillPages(mode, fontSize, pages){
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  var modeParams = mode.split(":");
  var calcType = modeParams[0];
  var paramNum = modeParams.length;
  var leftMaxNum = Math.pow(10, parseInt(modeParams[1])) - 1;
  var rightMaxNum = Math.pow(10, parseInt(modeParams[2]))-1;
  var resultMaxNum = paramNum>3 ? Math.pow(10, parseInt(modeParams[3]))-1:-1;
  var pageInfo = PAGE_INFO[fontSize];
  body.clear();

  for(var page=0;page<pages;page++){
    appendCalcDrillPage(body, calcType, leftMaxNum, rightMaxNum, resultMaxNum, pageInfo);
  }
}

function appendCalcDrillPage(body, calcType, leftMaxNum, rightMaxNum, resultMaxNum, pageInfo){
  var calcDrillTable = [];
  for(var row=0;row<pageInfo.rowPerPage;row++){
    var calcDrillLine = [];
    for(var col=0;col<pageInfo.colPerRow;col++){
      calcDrillLine.push(makeCalcDrill(calcType, leftMaxNum, rightMaxNum, resultMaxNum));
    }
    calcDrillTable.push(calcDrillLine);
  }

  var style = {};
  style[DocumentApp.Attribute.FONT_SIZE] = pageInfo.fontSize;

  var table = body.appendTable(calcDrillTable);
  table.setAttributes(style);
  body.appendPageBreak();
}

function makeCalcDrill(calcType, leftMaxNum, rightMaxNum, resultMaxNum) {
  var calcSign = CALC_TYPE_SIGN[calcType];
  var left,right;
  if (calcType == CALC_TYPE_SUB) {
    left = getRandom(leftMaxNum-1)+1;//2以上
    var tmp = Math.min(rightMaxNum, left-1);
    right = getRandom(Math.min(rightMaxNum, left-1));//left未満
  } else if (calcType == CALC_TYPE_DIV) {
    right = getRandom(rightMaxNum);
    var _resultMaxNum = Math.floor(leftMaxNum/right)
    if (_resultMaxNum > 0) {
      //答えの桁数上限が指定されていたら、答えの最大値を調整
      _resultMaxNum = Math.min(_resultMaxNum, resultMaxNum);
    }
    var answer = getRandom(_resultMaxNum);//割り切れるように答えを先に算出
    left = right * answer;
  } else {
    left = getRandom(leftMaxNum);
    right = getRandom(rightMaxNum);
  }

  return left+" "+calcSign+" "+right+" =";
}

function getRandom(maxNum) {
  return Math.floor(Math.random()*maxNum)+1;
}