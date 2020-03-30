'use strict';

let keywordArray = [];
let hornArray = [];

function Gallery(value) {
  this.image_url = value.image_url;
  this.title = value.title;
  this.description = value.description;
  this.keyword = value.keyword;
  this.horns = value.horns;
  hornArray.push(this);
  if (keywordArray.includes(this.keyword) === false) {
    keywordArray.push(this.keyword);
  }
}



$.get('./data/page-1.json')
  .then(data => {
    data.forEach((value) => {

      let gallary1 = new Gallery(value);
      gallary1.render();
    });
    keywordArray.forEach(value => {
      list(value);
    });

  })
  .then(() => selectlist());



Gallery.prototype.render = function () {
  let sectionClone = $('#photo-template').clone();
  sectionClone.find('h2').text(this.title);
  sectionClone.find('img').attr('src', this.image_url);
  sectionClone.find('p').text(this.description);
  $('main').append(sectionClone);
};

function list(value) {
  let options = $('<option></option>').text(value);
  $('select').append(options);
}

function selectlist() {
  $('select').on('change', function () {
    let select = $(this).val();
    console.log(select);
    let selected =hornArray.filter((value) => value.keyword=== select);
    console.log(selected);
    $('section:not(:first)').remove();
    selected.forEach(value => {
      value.render() ;
    });
  });
}
