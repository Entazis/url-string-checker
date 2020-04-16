function main() {
  var inputWords = getInputWords();
  var inputUrl = getInputUrl();

  var siteContentText = UrlFetchApp.fetch(inputUrl).getContentText().toLowerCase();
  var matches = getMatches(siteContentText, inputWords);

  writeOutput(matches);
}

function getInputWords() {
  var inputSheet = SpreadsheetApp.getActive().getSheetByName('input');
  var rangeValues = [].concat.apply([], inputSheet.getRange('A2:A').getValues());

  var words = rangeValues.filter(function (value) {
    return value.toString().toLowerCase();
  });

  return words;
}

function getInputUrl() {
  var inputSheet = SpreadsheetApp.getActive().getSheetByName('input');
  var url = inputSheet.getRange('B2').getValues()[0][0];

  return url;
}

function getMatches(text, words) {
  var wordCounts = {};
  var matches = {};
  for (var i=0; i<words.length; i++) {
    wordCounts[words[i]] = (text.match(new RegExp(words[i], "g")) || []).length;
    if (wordCounts[words[i]] > 0) {
      matches[words[i]] = wordCounts[words[i]];
    }
  }
  return matches;
}

function writeOutput(object) {

}


