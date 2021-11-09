/*
 * @Descripttion: 
 * @version: v1.0
 * @Author: aguan
 * @Date: 2021-11-08 19:22:47
 * @LastEditors: aguan
 * @LastEditTime: 2021-11-09 10:24:17
 */
import { REACT_TEXT } from "./contants";

/**
 * @name: render
 * @param {object} vdom 虚拟DOM 也就是React元素
 * @param {Element} container 真实DOM容器
 * @return {*}
 */
function render(vdom, container) {
    mount(vdom, container)
}

function mount(vdom, parentDom) {
    // 把虚拟dom变成真实dom
    let newDOM = createDOM(vdom)
    // 把真实dom追加到容器上
    parentDom.appendChild(newDOM)
}

/**
 * @name: createDOM
 * @msg 把虚拟DOM变成真实DOM
 * @param {*} vdom 虚拟DOM
 * @return {*} 真实DOM
 */
function createDOM(vdom) {
    let { type, props } = vdom;
    let dom; // 真实DOM
    if (type === REACT_TEXT) { // 创建文本节点
        dom = document.createTextNode(props.content)
    } else { // 创建DOM节点
        dom = document.createElement(type)
    }

    if (props) {
        // 更新DOM的属性 注： 暂时没有第二个实参 后面实现组件的更新的时候就会有了，暂时写死
        updateProps(dom, {}, props)
        let children = props.children;
        // 如果说children是一个React元素，也就是说也是个虚拟DOM
        if (typeof children === 'object' && children.type) {
            // 把这个儿子这个虚拟DOM挂在到父节点DOM上
            mount(children, dom)
        } else if (Array.isArray(children)) {
            reconcileChildren(children, dom)
        }
    }

    vdom.dom = dom; // 在虚拟DOM上挂载或者说放置一个dom属性指向此虚拟DOM对应的真实DOM
    return dom;
}

function reconcileChildren(children, parentDom) {
    children.forEach(childVdom => mount(childVdom,parentDom))
}

/**
 * @name: updateProps
 * @msg: 更新真实DOM上面的属性
 * @param {*} dom 真实DOM
 * @param {*} oldProps 老的属性
 * @param {*} newProps 新的属性
 * @return {*} undefined
 * @example: 
 */
function updateProps(dom, oldProps, newProps) {
    for (let key in newProps) {
        if (key === 'children') {
            continue; // 此处不处理子节点
        } else if (key === 'style') {
            let styleObj = newProps[key];
            for (let attr in styleObj) {
                dom.style[attr] = styleObj[attr]
            }
        } else {
            dom[key] = newProps[key]
        }
    }
    for(let key in oldProps) {
        // 如果说一个属性劳动属性对象里边有，新的属性对象里边没有，就需要删除
        if (!newProps.hasOwnProperty(key)) {
            dom[key] = null;
        }
    }
}

const ReactDOM = {
    render
}

export default ReactDOM;