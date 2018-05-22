(function core(){
   window.onload = function() {
     document.getElementsByClassName("loading")[0].innerHTML = null;
     const listOfBoxes = document.getElementsByClassName("listOfBoxes");
     for (let i = 1; i < 100; i++){
       if (i % 2 == 0){
         if (i % 5 == 0){
           listOfBoxes[0].innerHTML +=  '<li class="numberEven numberByFive number smallFont">' + i + '</li>';
         }else {
           listOfBoxes[0].innerHTML +=  '<li class="numberEven number smallFont">' + i + '</li>';
         }
       }else if (i % 5 == 0) {
         listOfBoxes[0].innerHTML +=  '<li class="numberByFive number smallFont">' + i + '</li>';
       }else{
         listOfBoxes[0].innerHTML +=  '<li class="number smallFont">' + i + '</li>';
       }
     }

     function evenButton() {
       const nums = document.getElementsByClassName("numberEven");
       for (let i = 0; i < nums.length; i++){
         if (nums[i].classList.contains("evenOn") == true){
           nums[i].classList.add("evenOff");
           nums[i].classList.remove("evenOn");
         }else{
           nums[i].classList.remove("evenOff");
           nums[i].classList.add("evenOn");
         }
         if (nums[i].classList.contains("evenOn") == true
         && nums[i].classList.contains("fiveOn")){
           nums[i].classList.add("tenOn");
         }else{
           nums[i].classList.remove("tenOn");
         }
       }
     }

     function byFiveButton() {
       const nums = document.getElementsByClassName("numberByFive");
       for (let i = 0; i < nums.length; i++){
         if (nums[i].classList.contains("fiveOn") == true){
           nums[i].classList.add("fiveOff");
           nums[i].classList.remove("fiveOn");
         }else{
           nums[i].classList.remove("fiveOff");
           nums[i].classList.add("fiveOn");
         }
         if (nums[i].classList.contains("evenOn") == true
         && nums[i].classList.contains("fiveOn")){
           nums[i].classList.add("tenOn");
         }else{
           nums[i].classList.remove("tenOn");
         }
       }
     }

     let listOfRecords = new Array();

     function clickBox() {
       if (this.classList.contains("smallFont") == true){
         this.classList.add("largeFont");
         this.classList.remove("smallFont");
       }else{
         this.classList.add("smallFont");
         this.classList.remove("largeFont");
       }
       if (listOfRecords.indexOf(this.innerHTML) == -1){
         document.getElementsByClassName("listOfClicked")[0].innerHTML += '<span>' + this.innerHTML + " " + '</span>';
         listOfRecords.push(this.innerHTML);
       }

     }

     for (let i = 1; i < 100; i++){
       const box = document.getElementsByClassName("number")[i - 1];
       box.addEventListener("click", clickBox);
     }

     document.getElementsByClassName("evenBtn")[0].addEventListener("click", evenButton);

     document.getElementsByClassName("byFiveBtn")[0].addEventListener("click", byFiveButton);
   }
 })();
