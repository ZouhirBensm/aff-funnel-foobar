const lis = document.getElementsByTagName("li")

// Adding click event to entire li elements
for (let i = 0; i < lis.length; i++) {
  const li = lis[i];
  // console.log(li.children)
  let as = []
  for (const child of li.children) {
    if(child.tagName == "A") as.push(child)
  }

  const a = as[0]
  // append to li a click to the proper href
  li.addEventListener('click', (e)=>{
    window.open(a.href, '_blank')
  })
}