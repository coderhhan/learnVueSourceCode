import vnode from './vnode'
import createElement from './createElement'
export default function (oldVnode,newVnode){

  //判断节点传入的旧节点是虚拟节点 还是 dom节点
  if(oldVnode.sel === '' || oldVnode.sel ===  undefined){

    /**是dom节点 转为虚拟节点 */
    oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)

  }

  if( newVnode.key&& oldVnode.key&& oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    /**同一个节点 */
  }else{
    
    // console.log(oldVnode,newVnode)
    
    /**不是同一个节点 */
    var createDom =  createElement(newVnode)
    //将新创建的节点并且插入在就旧节点之前
    if(oldVnode.elm.parentNode && oldVnode.elm){
      //插入新节点
      oldVnode.elm.parentNode.insertBefore(createDom,oldVnode.elm)
      //删除旧几点
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
    console.log(createDom)
  }
}