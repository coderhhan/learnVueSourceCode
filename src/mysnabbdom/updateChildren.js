import createElement from './createElement'
import patchVnode from './patchVnode'
 function sameNode(firstNode,secondNode){
  return firstNode.sel === secondNode.sel && firstNode.key  ===secondNode.key
}
export default function (parentElm,oldChildren,newChildren){
  //子节点比较四种情况
  /**
   * 1.新前与旧前
   * 2 新后与旧后
   * 3 新后与旧前
   * 4 新前与旧后
   * 
   * 未命中则循环查找 新指针指的节点在旧节点中的位置，
   */

    //新前
    let newStartIndex = 0
    //新后
    let newEndIndex = newChildren.length -1
    //新前节点
    let newStartNode = newChildren[0]
    //新后节点
    let newEndNode = newChildren[newEndIndex]
    //旧前
    let oldStartIndex = 0
    //旧后
    let oldEndIndex = oldChildren.length -1
    //旧前节点
    let oldStartNode = oldChildren[0]
    //旧后节点
    let oldEndNode = oldChildren[oldEndIndex]


    while(newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex){
      console.log('循环中')
      if(sameNode(newStartNode,oldStartNode)){
        console.log('1新前与旧前')
          patchVnode(oldStartNode,newStartNode)
          oldStartNode = oldChildren[++oldStartIndex]
          newStartNode = newChildren[++newStartIndex]
      }else if(sameNode(newEndNode,oldEndNode)){
        console.log('2新后与旧后')
          patchVnode(oldEndNode,newEndNode)
          oldEndNode = oldChildren[--oldEndIndex]
          newEndNode = newChildren[--newEndIndex]
      }else if(sameNode(newEndNode,oldStartNode)){
        console.log('3新后与旧前')
          patchVnode(oldStartNode,newEndNode)
          parentElm.insertBefore(oldStartNode.elm,oldEndNode.elm.nextSibling)
          oldStartNode = oldChildren[++oldStartIndex]
          newEndNode = newChildren[--newEndIndex]
      }else if(sameNode(newStartNode,oldEndNode)){
        console.log('4新前与旧后')
          patchVnode(oldEndNode,newStartNode)
          parentElm.insertBefore(oldEndNode.elm,oldStartNode.elm)
          oldEndNode = oldChildren[--oldEndIndex]
          newStartNode = newChildren[++newStartIndex]
      }
    }
}
