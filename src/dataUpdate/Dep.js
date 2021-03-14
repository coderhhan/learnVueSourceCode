var uid = 0
export default class Dep{
  constructor(){
    console.log('我是Dep类的构造器',Dep.target)
    this.id = uid++
    //用数组存储自己的订阅者 subs是英语subcribes订阅者的意思
    this.subs=[]
  }
  //添加订阅
  addSub(sub){
    this.subs.push(sub)
  }
  //添加依赖
  depend(){
    if(Dep.target){
      this.addSub(Dep.target)
    }
  }
  //通知更新
  notify(){
    console.log('这里是notify')
    //浅克隆一份
    const subs = this.subs.slice()
    //遍历执行储存的watcher实例里的update方法
    for (let index = 0, i= subs.length; index<i ;index++) {
      console.log('调用update方法',subs[index])
      subs[index].update()
    }
  }
}