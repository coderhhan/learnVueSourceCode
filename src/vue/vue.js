import Compile  from './Compile';
import observe from './observe'
import Watcher from './Watcher'
export default class Vue {
  constructor(option){
    console.log('这里是vue的构造器',option)
    //把参数对象option 作为$option
    this.$option = option;
    //存data 的数据
    this._data = option.data() || undefined;
    //数据变成响应的
    observe(this._data)
    //默认数据要变成响应式
    this._initData()
    //watch函数
    this._initWatch()
    //模板编译
    new Compile(option.el,this)
    
  }


  _initData(){
    const self = this
    const keys = Object.keys(this._data)
    keys.forEach(key=>{
      Object.defineProperty(self,key,{
        get(){
          return self._data[key]
        },
        set(newValue){
          self._data[key] = newValue
        }
      })
    })
  }

  _initWatch(){
    console.log('`1')
    var self = this
    var watch = this.$option.watch
    const keys = Object.keys(watch)
    keys.forEach(key=>{
      console.log('key',key)
     new Watcher(this._data,key,watch[key])
    })
  }
 
}