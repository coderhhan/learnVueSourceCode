/**创建dom节点元素
 * 传入一个虚拟节点，返回一个dom对象
 * 创建孤儿节点不进行插入
 */

export default function createElement(vnode){
  const vDom = document.createElement(vnode.sel)
  //子节点是文字还是 有孙子节点[]
  if(vnode.text !== '' &&(vnode.children == undefined || vnode.children.length === 0)){
    //有子节点含文本
     vDom.innerText = vnode.text
    // console.log(vnode)
    //  pra.parentNode.insertBefore(vDom,pra)
  }else if(Array.isArray(vnode.children) && vnode.children.length>0){
    //他内部的子节点需要用到递归创建节点
    for(let i=0; i<vnode.children.length;i++){
      //获得children里面的虚拟字节点
       let child = vnode.children[i]
        //转换成dom节点
        let childDom = createElement(child)
        //插入到父元素上面
        vDom.appendChild(childDom) 
    }
  }
    //补充elm属性
   vnode.elm = vDom
  //返回一个纯dom的对象
  return vDom
}