export const deepcopy =(data)=>{
  const copiedData=JSON.parse(JSON.stringify(data))
  return copiedData
}