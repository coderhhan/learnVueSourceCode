import Watcher from "./Watcher";

export default class Compile {
  constructor(el,vue){
    console.log('compiler编译模板类',el,vue,document.querySelector(el));
    //vue实例
    this.$vue = vue;
    //挂载点
    this.$el = document.querySelector(el);
    if(this.$el){
      //实际上是将dom节点转为AST抽象语法树，此处用轻量级的fragment
      let $fragment = this.node2Fragment(this.$el);
      //编译
     this.compile($fragment)
     //替换好的内容上树
     this.$el.appendChild($fragment)
    }
  }

  node2Fragment(el){
    console.log(el);
    var fragment = document.createDocumentFragment();
   
    var child;
    while(child = el.firstChild){
      //把el里的节点全部插入到fragment里，页面上的dom就没有了
      fragment.appendChild(child)
    }
    return fragment   
  }
  compile(el){
    //得到子元素,如果没有子元素则把所有节点作为app的子元素
    var childNodes = el.childNodes?el.childNodes :el
    //下面用到箭头函数，需要另存this待会调用元素编译器跟文本编译器
    var self = this
    var reg = /\{\{(.*)\}\}/
    childNodes.forEach(node => {
      console.log(node,'进入次数')
      var text = node.textContent
      //如果是元素节点则元素编译器
      console.log(node.nodeType,reg.test(text))
      if(node.nodeType === 1){
        self.compileElement(node)
      }else if(node.nodeType === 3 && reg.test(text)){
        self.compileText(node,text.match(reg)[1])
      }
    });
  }
  compileElement(node){
    const self = this
    //这里方便之处在于不是将HTML结构看作字符串，而是真正的属性列表
    var nodeAttrs = node.attributes
    //类数组对象变为真数组
    Array.prototype.slice.call(nodeAttrs).forEach(attr=>{
      var name = attr.name
      var value = attr.value
      //指令v开头的
      var dir = name.substring(2)
      if(name.indexOf('v-') === 0) {
        //是if指令
       
        if(dir === 'model'){
          //model绑定指令
          new Watcher(self.$vue._data,value,value=>{
            node.value = value
          })
          var v = self.getVueVal(self.$vue,value)
          node.value = v

          node.addEventListener('input',e=>{
            var newValue = e.target.value
            self.setVueVal(self.$vue,value,newValue)
            
            v = newValue
          })
          console.log('model指令',value)
        }else if(dir === 'if'){
          //if指令
        }
      }
    })

  }
  compileText(node,name){
    const self = this
    node.textContent = this.getVueVal(this.$vue,name)
    console.log(name,this.$vue._data)
    new Watcher(this.$vue._data,name,(value)=>{
      node.textContent = value
      console.log('修改了',node.textContent)
    })
  }
  getVueVal(val,exp){
    var exps = exp.split('.')
    exps.forEach(e=>{
      val = val[e]
    })
    return val
  }

  setVueVal(vue,exp,value){
    var val =vue
    var exps = exp.split('.')
    exps.forEach((e,index)=>{
      if(index <exps.length - 1) {
        val = val[e]
      }else{
        val[e] = value
      }
    })
  }
}