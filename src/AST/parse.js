export default function parse(templateStr){
  var index = 0 //指针
  var rest = templateStr
  var startRegExp = /^\<([a-z]+[0-9]?)\>/ //匹配 <>开始标签
  var endRegExp = /^\<\/([a-z]+[0-9]?)\>/ //匹配 </>开始标签
  var wordRegExp = /^([^\<]+)\<\/([a-z]+[0-9]?)\>/  //匹配 文本内容去掉空行
  var stack1 = []  //标签栈
  var stack2 = [] //文本栈
  var final = {} //最终结果

  while(index < templateStr.length){
    rest = templateStr.substring(index)
    if(startRegExp.test(rest)){
      let tag =rest.match(startRegExp)[1]
      stack1.push(tag)
      stack2.push({tag,children:[],type:1})
      console.log('开始标签',tag)
      index += tag.length +2  //指针移动 匹配长度加<>的2个长度
    }else if(endRegExp.test(rest)){
      
      let temp2 =rest.match(endRegExp)[1]
      console.log('结束标签',temp2,stack1[stack1.length-1])
      if(temp2 === stack1[stack1.length-1]) {
        let tag = stack1.pop()
        let text = stack2.pop()
        if(stack2.length>0){
          stack2[stack2.length-1].children.push(text)
         }else{
          final = text
         }
        
      }else {
        throw new Error('标签没有封闭')
      }
      
      index += temp2.length +3  //指针移动 匹配长度加</>的3个长度
    }else if(wordRegExp.test(rest)){
      let word =rest.match(wordRegExp)[1]
      if(!/^\s+$/.test(word)){
       stack2[stack2.length-1].children.push({type:3,text:word})
      }
      index += word.length //指针移动 匹配长度加文本内容的长度
    }else{
      index++ //指针移动
    }
  }
  console.log(final)
}