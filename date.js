// module.exports = datesend;
exports.datesend = datesend;
 function datesend(){
  let date = new Date();
  let options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  var dayval = date.toLocaleDateString("en-US",options);
  return dayval;

}

 exports.daysend =daysend;
  function daysend(){
   let date = new Date();
   let options = {
     weekday:"long"
   };
   var dayval = date.toLocaleDateString("en-US",options);
   return dayval;

 }
