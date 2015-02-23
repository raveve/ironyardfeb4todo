var tdList = {

  config: {
    url: 'http://rh-tiny-server.herokuapp.com/collections/raveve',
  },

  init: function () {
    tdList.initStyling();
    tdList.initEvents();
  },

  initStyling: function () {
    tdList.renderItems();
  },

  initEvents: function () {

      /////////////////////////////////////////////////////
     ///// Event delegation of check-circle icon click to complete item
    /////////////////////////////////////////////////////
    $('section').on('click', '.fa-check-circle', function (event) {
      console.log ('check-circle click works');
      $(this).parent().siblings('h2').toggleClass('completed');
    });
    /////////////////////////////////////////////////////
   /////////////////////////////////////////////////////

      /////////////////////////////////////////////////////
     ///// Event delegation of double click to edit item /
    /////////////////////////////////////////////////////
    $('article').on('dblclick', '.dbl-click', function (event) {
        event.preventDefault();
        $(this).closest('article').find('form').toggleClass('form-group');
    });
    /////////////////////////////////////////////////////
   /////////////////////////////////////////////////////

      /////////////////////////////////////////////////////
     /////   Enter submits update for editing item    ////
    /////////////////////////////////////////////////////
    $('section').on('submit', '.editItem', function (event) {
        event.preventDefault();
        var itemId = $(this).closest('article').data('itemid');
        var editedItem = {
        item: $(this).find('input[name="editItem"]').val()
        };

        tdList.updateItems(itemId, editedItem);
      });
      /////////////////////////////////////////////////////
     /////////////////////////////////////////////////////

        /////////////////////////////////////////////////////
       /////    Enter submits text for creating item    ////
      /////////////////////////////////////////////////////
      $('#createItem').on('submit', function (event) {
        event.preventDefault();
        var newItem = {
          item: $(this).find('input[name="createItem"]').val(),
          complete: false
        }
        if(newItem.item === "") {
         // Does nothing, this keeps from creating an empty item
       }
       else {
         tdList.createItems(newItem);
       }
      });
      /////////////////////////////////////////////////////
     /////////////////////////////////////////////////////

        /////////////////////////////////////////////////////
       ///// Event delegation of x icon click to delete item
      /////////////////////////////////////////////////////
      $('section').on('click', '.delete-item', function (event) {
        event.preventDefault();
        var itemId = $(this).closest('article').data('itemid');
        console.log(itemId);

        tdList.deleteItems(itemId);
      });
      /////////////////////////////////////////////////////
     /////////////////////////////////////////////////////
    },

    /////////////////////////////////////////////////////
   /////    Function that renders item on DOM     //////
  /////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////
 /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
   /////   Function that creates item on server   //////
  /////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////
 /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
   /////   Function that deletes item on server   //////
  /////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////
 /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
   /////   Function that updates item on server   //////
  /////////////////////////////////////////////////////
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
 /////////////////////////////////////////////////////
/////////////////////////////////////////////////////

};

  /////////////////////////////////////////////////////
 /////          Initialize on DOM load          //////
/////////////////////////////////////////////////////
$(document).ready(function () {

  tdList.init();

});
 /////////////////////////////////////////////////////
/////////////////////////////////////////////////////
