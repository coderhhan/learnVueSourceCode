import createElement from "./createElement"
import updateChildren from './updateChildren'

import sameNode from './sameNode'
export default function(oldVnode,newVnode){
  console.log('oldVnode',oldVnode)
  console.log('newVnode',newVnode)
  //如果新旧虚拟节点是同一个对象，则不处理
  // console.log(sameNode(oldVnode,newVnode))
  if(oldVnode === newVnode) {
    console.log('如果新旧虚拟节点是同一个对象，则不处理')
    return
    }
  //新节点的文本不为空，且没有子节点
  if(newVnode.text !== '' &&( newVnode.children === undefined ||newVnode.children.length === 0)){
    if(newVnode.text !== oldVnode.text){
   
        //将旧节点的文字更新
       oldVnode.elm.innerText = newVnode.text
    }
  }else{
    //新节点的文本为空，且有子节点
    console.log('新节点的文本为空，且有子节点')
    //旧节点有childeren
    if(oldVnode.children !== undefined &&oldVnode.children.length > 0){

      updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)

    }else{
      //由于简易版只能text 或者children 因此需要设置为空
      oldVnode.elm.innerText = ''
      for (let index = 0; index < newVnode.children.length; index++) {
         //旧节点没有children 新节点有children将节点插入到旧节点
         //根据虚拟node 创建dom对象
         let  createNode =  createElement( newVnode.children[index])
          //上树
         oldVnode.elm.parentNode.appendChild(createNode)
      }
    }
  }
}