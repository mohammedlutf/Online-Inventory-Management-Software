var row_id = document.getElementById("item_table").rows.length;
console.log(row_id);

$(document).ready(function(){

//add row
$('.item_bar').focus();


//remove row
 $(document).on('click', '.remove',function(){
  $(this).closest('tr').remove();
  totalamount();
 });

//prevent enter to work on the page
 $(document).keypress(function(event){
     if (event.which == '13') {
       event.preventDefault();
     }
 });

//insert data to database
 $('#insert_form').on('submit', function(event){

  event.preventDefault();
  var error = '';
  $('.item_bar').each(function(){
   var count = 1;
   if($(this).val() == '')
   {
    error += "<p>Enter Item Name at "+count+" Row</p>";
    return false;
   }
   count = count + 1;
  });

  $('.item_quantity').each(function(){
   var count = 1;
   if($(this).val() == '')
   {
    error += "<p>Enter Item Quantity at "+count+" Row</p>";
    return false;
   }
   count = count + 1;
  });


  if(error == '')
  {
   $.ajax({
    url:"/insert",
    method:"POST",
    data:$(this).serialize(),
    success:function(data)
    {
     if(data.data == 'ok')
     {
      $('#item_table').find("input").val('');
      $('#item_table').find("tr:gt(1)").remove();
      $('#total_amount').val('');
      row_id = 2;
      $('#error').html('<div class="alert alert-success">Item Details Saved</div>');
     }
    }
   });
  }
  else
  {
   $('#error').html('<div class="alert alert-danger">'+error+'</div>');
  }
 });

});




function addrow() {
  var html = '';

  html += '<tbody>';
  html += '<tr>';
  html += '<td><input type="text" name="item_bar[]" class="form-control item_bar" id ="item_'+row_id+'" onkeydown="getProduct(event,'+row_id+');"/></td>';
  html += '<td><input type="text" name="item_quantity[]" class="form-control item_quantity" id ="qty_'+row_id+'" onkeyup="getTotal('+row_id+')"/></td>';
  html += '<td><input type="text" name="item_name[]" class="form-control item_name" id ="name_'+row_id+'" readonly/></td>';
  html += '<td><input type="text" name="price[]" class="form-control item_price" id ="price_'+row_id+'" readonly /></td>';
  html += '<td><input type="text" name="total[]" class="form-control item_total" id ="total_'+row_id+'" readonly /></td>';
  html += '<td><button type="button" name="remove" class="btn btn-danger btn-sm remove"><i class="fas fa-minus"></i></button></td></tbody></tr>';
  $('#item_table').append(html);
  $('.item_bar').focus();
  row_id += 1 ;
}


function getTotal(row_id) {
  var q = $("#qty_"+row_id).val();
  var p = $("#price_"+row_id).val();
  $("#total_"+row_id).val(q*p);
  totalamount();
}


function getProduct(event , row_id) {
  if(event.which == 13) {
      var item_bar = $('#item_'+row_id).val();
      var values = $("input[name='item_bar[]']").map(function(){return $(this).val();}).get();
      //this will check if the same value is enterd then do not enter it to the table instead increment the Quantity by one .. we did not take the last element becuse it will be the same

      for (var i=0 ; i < values.slice(0, -1).length;i++){
        if (item_bar == values[i]){
          var n = Number($('#item_table').find("#qty_"+(i+1)).val());
          $('#item_table').find("#qty_"+(i+1)).val((n+1))
          getTotal(i+1);
          $('#item_'+row_id).val('');
          totalamount();
          // this is to get out of the function
          return;
        }
      }

      $.ajax({
       url: '/data',
       contentType: 'application/json;charset=UTF-8',
       type: 'POST',
       data: JSON.stringify(item_bar) ,
       success: function (response) {
        if (response.quantity == 0){
           alert("sorry you do not have enough product")
         }else{
           $("#price_"+row_id).val(response.price);
           $("#name_"+row_id).val(response.name);
           $("#qty_"+row_id).val(1);
           getTotal(row_id);
           totalamount();
           addrow();
         }

      },
       error: function (error) {
       // console.log(error);
       alert("sorry you do not have this product")
       }
     });




  }
}

function totalamount() {
  var total = 0;
  $('.item_total').each(function(){
           var i = Number($(this).val());
           total +=i;
           // total += parseFloat($(this).val());
  });

  $('#total_amount').val(total);

}
