export default function (firstNode,secondNode){
  return firstNode.sel === secondNode.sel && stringify(firstNode.key)  === JSON.stringify(secondNode.key)
}