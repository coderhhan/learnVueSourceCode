
import observe from './dataUpdate/observe'
import Watcher from './dataUpdate/Watcher'

var data = {
  a:{
    m:{
      n:{
        h:'222'
      }
    }
  },
  b:{
    d:{
      c:222
    }
  },
  f:[222,233,555,666]
}
observe(data)


new Watcher(data,'a.m.n.h',(val)=>{
console.log('改变了',val)
})
data.a.m.n.h = '2'