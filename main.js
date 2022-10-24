"use strict";

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
//keyをplaceholderの正規表現として使いながらループを回したいので連想配列をつくる。
let insertItem = new Map();
insertItem.set("insertX", ["Willy the Goblin","Big Daddy","Father Christmas"]);
insertItem.set("insertY", ["the soup kitchen","Disneyland","the White House"]);
insertItem.set("insertZ", ["spontaneously combusted","melted into a puddle on the sidewalk","turned into a slug and crawled away"]);

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    for (const [key, value] of insertItem) {
        //配列からランダムに1つの文字列を抽出
        let Item  = randomValueFromArray(value);
        //placeholderの置換
        newStory = replacePlaceholder(newStory,Item,key);
    }

    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replace("Bob",name);
    }

    if(document.getElementById("uk").checked) {
        //const weight = 300;
        //const temperature = 94;
        //重さと温度の単位をポンド・華氏から、ストーン・摂氏に変換
        //変換式はここで検索 https://www.metric-conversions.org/ja/
        //const Stone = Math.round(weight * 0.071429)+' stone';
        //const Celsius =  Math.round((temperature-32)/1.8)+' centigrade';
        //newStory = newStory.replace("300 pounds" , Stone);
        //newStory = newStory.replace("94 fahrenheit" , Celsius);

        //修正 @fq79074さんより
        newStory = newStory
        .replace(/(\d+)\s*pounds/ig, (a, b) => `${Math.round(b * 0.071429)} stone`)
        .replace(/(\d+)\s*fahrenheit/ig, (a, b) => `${Math.round((b - 32) / 1.8)} centigrade`);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}

function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}

function replacePlaceholder(newStory,item,placeholder){
    const regex = new RegExp(`:${placeholder}:`, 'ig');
    return newStory.replace(regex, item);
}
