/*
 * @Descripttion: 
 * @version: v1.0
 * @Author: aguan
 * @Date: 2021-11-01 16:42:47
 * @LastEditors: aguan
 * @LastEditTime: 2021-11-08 20:54:00
 */
import React from './react';
import ReactDOM from './react-dom';
//let reactElement1 = <h1 className="title" style={{color:'red',}}>hello</h1>

let reactElement2 = React.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, 'hello', React.createElement("span", {}, "World"));

//ReactDOM.render(reactElement1, document.getElementById('root'));

//console.log(JSON.stringify(reactElement1))
console.dir(reactElement2)
ReactDOM.render(reactElement2, document.getElementById('root'));
