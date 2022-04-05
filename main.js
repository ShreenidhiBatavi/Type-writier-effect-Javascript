const TypeWriter=function(txtElement,words,wait=3000){
  this.txtElement=txtElement
  this.words=words
  this.txt=''
  this.wordIndex=0
  this.wait=parseInt(wait,10)
  this.type()
  this.isDeleting=false
}

// type method
TypeWriter.prototype.type=function(){
//    curretnt index of word
const current=this.wordIndex%this.words.length
const fulltxt=this.words[current]
if(this.isDeleting){
    this.txt=fulltxt.substring(0,this.txt.length-1)
}else{
    this.txt=fulltxt.substring(0,this.txt.length+1)
}
this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`
// Initial type speed
let typeSpeed=300
if(this.isDeleting){
    typeSpeed/=2 
}
// if word complete
if(!this.isDeleting&&this.txt===fulltxt){
    typeSpeed=this.wait //this will make pause at end
    // set delete to true
    this.isDeleting=true
}else if(this.isDeleting && this.txt===''){
    this.isDeleting=false
    this.wordIndex++
    // move to next word
    typeSpeed=500

}
    setTimeout(() => {this.type() }, typeSpeed);
}
// initialization on dom load
document.addEventListener('DOMContentLoaded',init)

// init function
function init(){
    const txtElement=document.querySelector('.txt-type');
    const words=JSON.parse(txtElement.getAttribute('data-words'))
    const wait=txtElement.getAttribute('data-wait')
    // initalizing typewriter with new keyword
    new TypeWriter(txtElement,words,wait)
}

