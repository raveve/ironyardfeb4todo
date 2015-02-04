//  http://tiy-fee-rest.herokuapp.com/collections/raveve


$(document).ready(function () {
  tdList.init();

});

var tdList = {

  init: function () {
    tdList.initStyling();
    tdList.initEvents();
  },

  initStyling: function () {
    tdList.renderItems();
  },

  initEvents: function () {

    $('section').on('dblclick', '.editItem', function (event) {
        event.preventDefault();
        $(this).closest('article').find('.editItem').toggleClass('show');
      });

    $('section').on('submit', '.editItem', function (event) {
        event.preventDefault();
        var itemId = $(this).closest('article').data('itemId');
        var editedItem = {
        item: $(this).find('input[name="createItem"]').val()
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

    $("article _id").hover(
      function() {
        $(this).append("<span class='hover-hide'");
      },
      function() {
        $(this).find( "span:last" ).remove();
      });

      $('section').on('click', '.deleteItem', function (event) {
        event.preventDefault();
        var itemId = $(this).closest('article').data('itemId');
        console.log(itemId);

        tdList.deleteItems(itemId);
      });
},
      config: {
        url: 'http://tiy-fee-rest.herokuapp.com/collections/raveve',
      },

      render: function () {
        var template = _.template(data, tmpl);

        $el.append(template);
      },

  renderItems: function () {
    $.ajax({
      url: tdList.config.url,
      type: 'GET',
      success: function (items) {
        console.log(items);
        var template = _.template($('#todoTmpl').append('article'));
        var markup = "";
        items.forEach(function (item, idx, arr){
          markup += template(item);
        });
        console.log('markup is...', markup);
        $('article').append(markup);
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

  updateItems: function () {
    $.ajax({
      url: tdList.config.url + '/' + id,
      data: item,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        items.renderItems();
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

};