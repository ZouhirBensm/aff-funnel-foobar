let sections = document.getElementsByTagName("section");
let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
let header = document.getElementsByTagName("header")[0];

class MyClass {
  constructor(section, triggerPoint) {
    this.section = section
    this.triggerPoint = triggerPoint
  }
  fadeInOnScroll(i) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.triggerPoint) {
      // console.log("BAM")
      this.section.classList.add("active");
      window.removeEventListener("scroll", eval('func' + i));
    }
  }
}

for (let i = 0; i < sections.length; i++) {
  var triggerPoint = header.scrollHeight/3

  if (i == 0) {
    let instance = new MyClass(sections[i], triggerPoint)
    var func0 = () => { instance.fadeInOnScroll(i) }
    window.addEventListener("scroll", func0);
    // console.log("triggerPoint=>", triggerPoint)
    continue
  }

  for (let j = 0; j < i; j++) {
    triggerPoint += addSecHeight(j)
    triggerPoint += 200
  }

  // console.log("triggerPoint=>", triggerPoint)

  let instance = new MyClass(sections[i], triggerPoint)
  eval('var func' + i + '= ' + function () { instance.fadeInOnScroll(i) } + ';');
  // console.log(eval('func' + i))

  window.addEventListener("scroll", eval('func' + i));
}

function addSecHeight(j) {
  return sections[j].scrollHeight
}

// DISPLAY
// window.addEventListener("scroll", function () {
//   console.log(window.pageYOffset || document.documentElement.scrollTop);
// });