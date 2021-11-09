/*
 * @Descripttion: 
 * @version: v1.0
 * @Author: aguan
 * @Date: 2021-11-08 17:09:50
 * @LastEditors: aguan
 * @LastEditTime: 2021-11-08 20:09:55
 */ 
import { REACT_ELEMENT } from './contants'
import  { wrapToVdom } from './utils'
/**
 * reactElement是jsx经过babel编译过后的一种正规的js写法（jsx是reactElement的语法糖）
 * 
 * @category Function
 * @param {*} type 就是我们要渲染的元素类型，可以是一个元素Tag名称（小写字符串），也可以是一个组件的名称（大写的...组建）。
 * @param {object} config 就是我们在jsx中给元素/组建绑定的属性，这些属性会在config对象种以健值对的形式存在。
 * @param {...object} children 第3～n个参数 是元素/组件的内容/子元素，以children的形式存在。
 * @returns {object} 一个js对象树，他能完整的描述dom结构，称之为虚拟DOM
 * @example null
 */
function createElement(type, config, children) {
    let ref,key;
    if (config) {
        ref = config.ref; // 后面会说 是用来引用这个真实DOM元素的
        key = config.key; // 后面会说 是用来进行DOM-diff优化的，用来唯一表示某个子元素的
        delete config.ref;
        delete config.key;
    }
    let props = { ...config }
    if (arguments.length > 3) { // 如果参数的长度大于三，说明有多个儿子
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
    } else if (arguments.length === 3) {
        props.children = wrapToVdom(children); // 可以是字符串 数字 React元素
    }
    return { // 虚拟dom
        $$typeof: REACT_ELEMENT, // 元素的类型
        type,// dom标签的类型 h1 h2 span div
        ref,
        key,
        props, // className style children
    }
}

const React = {
    createElement 
}

export default React