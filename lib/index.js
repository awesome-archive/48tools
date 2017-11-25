/*

 @@@@    @@@   @       @@@   @@@@    @@@   @       @@@
 @   @    @    @        @    @   @    @    @        @
 @@@@     @    @        @    @@@@     @    @        @
 @   @    @    @        @    @   @    @    @        @
 @@@@   @@@@@  @@@@@  @@@@@  @@@@   @@@@@  @@@@@  @@@@@

*/
var BREAK_INDEX, CID, SIGN, av, body, div, page, start;

import {
  getFlvUrl,
  queryUrl,
  download
} from './getFlvUrl';

import {
  getHash,
  getAvNumber
} from './getLocation';

// it from playurl
// change it if need
SIGN = 'a0cfb0ac98c3ec669cd52ea491ba38ab';

// change it
BREAK_INDEX = 0;

CID = window.cid;

body = document.getElementsByTagName('body')[0];

page = getHash();

av = getAvNumber();

div = document.createElement('div');

// init div
div.style.cssText = 'position: fixed; z-index: 100; top: 0; left: 0; padding: 5px; background-color: #fff; border: 5px solid #000;';

body.appendChild(div);

start = async function() {
  var a, blobUrl, flvList, i, index, index2, item, len, result, results, title;
  result = (await getFlvUrl(CID, SIGN));
  flvList = queryUrl(result.durl);
  results = [];
  for (index = i = 0, len = flvList.length; i < len; index = ++i) {
    item = flvList[index];
    if (index > BREAK_INDEX) {
      index2 = index + 1;
      blobUrl = (await download(item));
      title = `${av}_${page}_${index2}.flv`;
      a = document.createElement('a');
      a.style.cssText = 'display: block; padding: 5px;';
      a.href = blobUrl;
      a.download = title;
      a.innerText = title;
      div.appendChild(a);
      results.push(console.log('Finish: ' + index2));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

start();