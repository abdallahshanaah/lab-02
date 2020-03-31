'use strict ';
let galeryArray=[];

$.get('./data/page-1.json')
  .then(data => {
    data.forEach((val) => {
      let pic = new Galery(val);
      pic.renderImg();
    });
    renderList();
    filterBykeyword();
  });


function Galery(val) {
  this.img_url =val.img_url;
  this.title = val.title;
  this.description = val.description;
  this.keyword =val.keyword;
  this.horns =val.horns;
  galeryArray.push(this);
}
function renderList () {
  let allkeywords =[];
  galeryArray.forEach((val) =>{
    if(!allkeywords.includes()){
      allkeywords.push(val.keyword);
    }
  });
  allkeywords.forEach((val) =>{
    $('#clone').append(`<option value="${val}"> ${val} </option>`);
  });
}


// render the imeges
Galery.prototype.renderImg = function () {
  let galeryClone = $('.photo-template').clone();
  galeryClone.removeClass('photo-template');
  galeryClone.find('h2').text(this.title);
  galeryClone.find('img').attr('src',this.img_url);
  galeryClone.find('p').text(this.description);
  galeryClone.attr('class',this.keyword);
  $('main').append(galeryClone);
};
function filterBykeyword() {
  $('select').on('change',function(){
    $('section').hide();
    let selected = $(this).val();
    $(`.${selected}`).fadeIn();
    // galeryArray.forEach(val =>{
    //   if(val.keyword === selected){
    //     $(`section[class ='${selected}']`).fadeIn(); //or show()
    //   }
    // });
  });
}
