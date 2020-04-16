function main() {
  var inputWords = getInputWords();
  var inputUrl = getInputUrl();

  var siteContentText = UrlFetchApp.fetch(inputUrl).getContentText().toLowerCase();
  var matches = getMatches(siteContentText, inputWords);

  writeOutput(matches);

  Logger.log('done!');
  Logger.log(matches);
}

function getInputWords() {
  var inputSheet = SpreadsheetApp.getActive().getSheetByName('input');
  var rangeValues = [].concat.apply([], inputSheet.getRange('A2:A').getValues());
  return rangeValues.filter(function (value) {
    return value.toString().toLowerCase();
  });
}

function getInputUrl() {
  var inputSheet = SpreadsheetApp.getActive().getSheetByName('input');
  return inputSheet.getRange('B2').getValues()[0][0];
}

function getMatches(text, words) {
  var wordCounts = {};
  var matches = [];
  for (var i=0; i<words.length; i++) {
    wordCounts[words[i]] = (text.match(new RegExp(words[i], "g")) || []).length;
    if (wordCounts[words[i]] > 0) {
      matches.push([words[i], wordCounts[words[i]]]);
    }
  }
  return matches;
}

function writeOutput(rows) {
  var outputSheet = SpreadsheetApp.getActive().getSheetByName('output');
  outputSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}