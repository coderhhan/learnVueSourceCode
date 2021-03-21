var uid = 0
export default class Dep{
  constructor(){
    //发布订阅者模式，存放的是watcher的实例
    this.id = uid++
    this.subs=[]
  }
  //添加订阅
  addSubs(sub){
    //如果存在相同的id的订阅 则不需要添加
    if(!this.subs.some(item=>{
      return item.id === sub.id
    })){
      this.subs.push(sub)
    }
  }
  //收集依赖
  depend(){
    if(Dep.target){
        this.addSubs(Dep.target)
    }
  }
  //通知修改
  notify(){
    const subs = this.subs.slice()
    console.log(subs)
    for(let i = 0;i<subs.length;i++){
      subs[i].update()
    }
  }
}