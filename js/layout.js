var delimiter_pixels = 600

if (window.innerWidth < delimiter_pixels) {
  function1()
} else {
  function2()
}


const mql = window.matchMedia("(max-width: 800px)");

if (mql.matches) {
  // console.log("Window width is less than or equal to 600px");
} else {
  // console.log("Window width is greater than 600px");
}


// TODO find new version of this
mql.addListener((event) => {
  if (event.matches) {
    // console.log("< 600px");
    function1() 
  } else {
    // console.log("> 600px");
    function2()
  }
});


function function1(){
  const lis = document.getElementsByTagName("li");

  for(let i = 0; i < lis.length; i++ ){
    let li = lis[i]
    // console.log(li)
    li.classList.add("grid-mode");
  }

  // lis[0].style.flexDirection = "column";
  
  
  let imgs = document.getElementsByTagName("img");

  for(let i = 1; i < imgs.length-1; i++){
    let img = imgs[i]
    img.style.marginTop = "10px";
    img.style.width = "200px";
    img.style.height = "200px";
    lis[i-1].insertBefore(img, lis[i-1].firstChild); 
  }
}


function function2(){
  const lis = document.getElementsByTagName("li");


  for(let i = 0; i < lis.length; i++ ){
    let li = lis[i]
    // console.log(li)
    li.classList.remove("grid-mode");
  }
  
  let imgs = document.getElementsByTagName("img");
  

  for(i = 1; i < imgs.length-1; i++){
    let img = imgs[i]
    img.style.marginTop = "50px";
    img.style.width = "350px";
    img.style.height = "350px";
    lis[i-1].insertAdjacentElement('beforebegin', img);
  }
}