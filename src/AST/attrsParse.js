export default function attrsParse(attrsStr){
  if(!attrsStr) return []
  console.log('这里是attrsParse→',attrsStr)
  //for循环写法
  var flag = false //是否开其无视引号内空格
  var point =0  //截取开始索引
  var result =[] //结果数组
  
  for(let index =0;index<attrsStr.length;index++){
    let str = attrsStr[index]
    if(str === '"'){
      flag=!flag
    }else if(str === ' '&&!flag){
      console.log("引号外空格",index,str.match(/^\s/))
      if(!/^[\s]*$/.test(attrsStr.substring(point,index))){
       result.push(attrsStr.substring(point,index).trim())
       point = index
      }
    }
  }
  result.push(attrsStr.substring(point).trim())
  return result.map(item=>{
  var res =item.trim().match(/([^\=]+)\=\"([^\=]+)*\"/)
  return {
    name:res[1],
    value:res[2]
  }
})


//   //自己写的指针写法
//   var startIndex=0;
//   var flag = false; //是否忽略空格
//   var stack= [] //存放切割好的 字符键值对 
//   var spaceIndex =0
//   while(startIndex <attrsStr.length){
//     console.log(attrsStr[startIndex],startIndex)
//     let str = attrsStr[startIndex]
//     if(str ===  '"'&& attrsStr[startIndex-1]=== "="){
//       flag=false
//     }else if(str ===  '"'&& attrsStr[startIndex-1]!== "="){
//       flag=true
//     }
//     if(/^[\s]/.test(str) &&flag){
//       console.log('当前为外部空格',startIndex)
//      const temp =  attrsStr.substring(spaceIndex,startIndex)
//      stack.push(temp)
//      attrsStr = attrsStr.substring(startIndex)
//      startIndex = 0
//     }
//     startIndex++
//   } 

//   stack.push(attrsStr)
//   // console.log(stack,attrsStr)
//   return stack.map(item=>{
//     var res =item.trim().match(/([^\=]+)\=\"([^\=]+)*\"/)
//     return {
//       name:res[1],
//       value:res[2]
//     }
//   })
 }