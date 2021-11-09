/*
 * @Descripttion: 
 * @version: v1.0
 * @Author: aguan
 * @Date: 2021-11-08 17:24:24
 * @LastEditors: aguan
 * @LastEditTime: 2021-11-08 20:53:14
 */
import { REACT_ELEMENT, REACT_TEXT } from './contants'


/**
 * 为了更方便的进行虚拟DOM的对比，我们把虚拟DOM进行一下包装
 * 需要把字符串或者数字也变成一个对象
 */

export function wrapToVdom (element) {
    return typeof element === 'string' || typeof element === 'number' ?
    {$$typeof: REACT_ELEMENT, type: REACT_TEXT, props: {content: element}} : element
}