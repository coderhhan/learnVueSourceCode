import createElement from './createElement'
import patchVnode from './patchVnode'
 function sameNode(firstNode,secondNode){
  return firstNode.sel === secondNode.sel && firstNode.key  ===secondNode.key
}
export default function (parentElm,oldChildren,newChildren){
  console.log(oldChildren)
  console.log(newChildren)
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
    let keyMap =null

    while(newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex){
      console.log('循环中')
      if(newStartNode === undefined || newStartNode === null){
        newStartNode = newChildren[++newStartIndex]
      }else if(newEndNode === undefined || newEndNode === null){
        newEndNode = newChildren[--newEndIndex]
      }else if(oldStartNode === undefined || oldStartNode === null){
        oldStartNode = oldChildren[++oldStartIndex]
      }else if(oldEndNode === undefined || oldEndNode === null){
        oldEndNode = oldChildren[--oldEndNode]
      }else if(sameNode(newStartNode,oldStartNode)){
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
      }else{
          //newStartNode = newChildren[++newStartIndex]
           if(!keyMap){
            keyMap = {}
            for (let index = 0; index < oldChildren.length; index++) {
              const key = oldChildren[index]&&oldChildren[index].key
              if(key) {
                keyMap[key]=index
              }
            }
           }
          
          let indexOld = keyMap[newStartNode.key]
          if(indexOld ==undefined){
            console.log('bu同个节点')
            let newDom = createElement(newStartNode)
            parentElm.insertBefore(newDom,oldStartNode.elm)
          }else{
            const elemTomove = oldChildren[indexOld]
            console.log('同个节点')
            patchVnode(elemTomove,newStartNode)
            oldChildren[indexOld] = undefined
            parentElm.insertBefore(elemTomove.elm,oldStartNode.elm)
          
          }
          newStartNode = newChildren[++newStartIndex]
      }
    }
    
    if(newStartIndex <= newEndIndex) {
      console.log('新剩余')
      for (let index=newStartIndex; index <= newEndIndex;index++) {
        let createDom = createElement(newChildren[index])
        const before =oldChildren[oldStartIndex]&& oldChildren[oldStartIndex].elm?oldChildren[oldStartIndex].elm:undefined
        parentElm.insertBefore(createDom,before)
        
      }
    }else if(oldStartIndex <= oldEndIndex)  {
      console.log('旧剩余')
      for (let index=oldStartIndex; index <= oldEndIndex;index++) {
        if(oldChildren[index]){
        parentElm.removeChild(oldChildren[index].elm)

        }
        
      }
    }
}
