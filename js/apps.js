'use strict';

let galeryArray = [];
let keywordArray = [];


$.get('./data/page-1.json')
  .then(data => {
    data.forEach((element) => {

      let newGallery = new Gallery(element);
      newGallery.render();
    });
    keywordArray.forEach(val => {
      theOption(val);
    });

  })
  .then(() => selected());



function Gallery(val) {
  this.image_url = val.image_url;
  this.title = val.title;
  this.description = val.description;
  this.keyword = val.keyword;
  this.horns = val.horns;
  galeryArray.push(this);
  if (keywordArray.includes(this.keyword) === false) {
    keywordArray.push(this.keyword);
  }
}


Gallery.prototype.render = function () {


  let clone = $('.photo-template').clone();
  clone.removeClass('photo-template');
  clone.find('h2').text(this.title); 
  clone.find('img').attr('src', this.image_url);
  clone.find('p').text(this.description);
  $('main').append(clone);


};
function theOption(val) {

  let options = $('<option></option>').text(val);
  $('select').append(options);
}


function selected() {
  $('select').on('change', function () {

    let selected = $(this).val();
    console.log(selected);
    let allselected = galeryArray.filter((element) => element.keyword === selected);
    console.log(allselected);
    $('section:not(:first)').remove();
    allselected.forEach(value => {
      value.render();
    });


  });
}
