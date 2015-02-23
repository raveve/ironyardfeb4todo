//  http://tiy-fee-rest.herokuapp.com/collections/raveve


$(document).ready(function () {

  tdList.init();

});

var tdList = {

  init: function () {
    console.log("init works");
    tdList.initStyling();
    tdList.initEvents();
  },

  initStyling: function () {
    console.log("initStyling works")
    tdList.renderItems();
  },

  initEvents: function () {
    console.log("initEvents works")


    // Event delegation for double click to edit item
    $("article").on("dblclick", "h2", function (event) {
        event.preventDefault();
        $(this).closest('article').find('form').toggleClass('form-group');
      });


    $('section').on('submit', '.editItem', function (event) {
        event.preventDefault();
        var itemId = $(this).closest('article').data('itemid');
        var editedItem = {
        item: $(this).find('input[name="editItem"]').val()
        };

        tdList.updateItems(itemId, editedItem);
      });

      $('#createItem').on('submit', function (event) {
        event.preventDefault();
        var newItem = {
          item: $(this).find('input[name="createItem"]').val()
        };

        tdList.createItems(newItem);
      });

    //Hover for showing delete button. In case I decide to add this back in later
          // $('section').on('mouseover', 'article', function(event) {
          //   //  console.log(event.target);
          //   $(this).find('a').toggleClass('delete-item');
          // })
          // .on('mouseout', 'article', function() {
          //   $(this).find('a').toggleClass('delete-item');
          // });

      $('section').on('click', '.delete-item', function (event) {
        event.preventDefault();
        var itemId = $(this).closest('article').data('itemid');
        console.log(itemId);

        tdList.deleteItems(itemId);
      });
},
      config: {
        url: 'http://rh-tiny-server.herokuapp.com/collections/raveve',
      },

  renderItems: function () {
    $.ajax({
      url: tdList.config.url,
      type: 'GET',
      success: function (items) {
        console.log(items);
        var template = _.template($('#todoTmpl').html());
        var markup = "";
        items.forEach(function (item, idx, arr){
          markup += template(item);
        });
        console.log('markup is...', markup);
        $('article').html(markup);
      },
    });
  },

  createItems: function (item) {

    $.ajax({
      url: tdList.config.url,
      data: item,
      type: 'POST',
      success: function (data) {
        console.log(data);
        tdList.renderItems();

        // Clears the input text areas
        $('.form-create input').val('');
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  deleteItems: function (id) {

    $.ajax({
      url: tdList.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        tdList.renderItems();
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  updateItems: function (id, item) {

    $.ajax({
      url: tdList.config.url + '/' + id,
      data: item,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        tdList.renderItems();

      },
      error: function (err) {
        console.log(err);
      }
    });
  },

};
