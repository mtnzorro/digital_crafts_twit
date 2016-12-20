// console.log(
// `String String
// Oh my oh my
// String!
// `
// );

// var hello = function(name){
//   name = name || 'world';
//   console.log('Hello '+ name + '!');
// }
// hello('Mustache');

// var madlib = function(name, subject){
//   return name + "'s favorite subject in school is " + subject;
// }
// madlib ('Jason', 'CS')

// var tipAmount = function(bill, service){
//   if (service === 'good'){
//     return bill * .2;
//   }
//   else if (service === 'fair'){
//     return bill * .15;
//   }
//   else return bill * .1;
// };
//
// var totalAmount = function(bill, service){
//   return bill + tipAmount(bill, service);
// };
//
//
// var splitAmount = function(bill, service, guests){
//   return totalAmount(bill, service)/guests;
// };
// splitAmount (100, 'good', 5)

// WHILE LOOP
// var printNumbers = function(start, end){
//   while (end >= start){
//     console.log(start);
//     start +=1;
//   }
// };

//FOR LOOP
// var printNumbers = function(start, end){
//   for(i = start; i <= end; i++){
//     console.log(i);
//   }
// };
// printNumbers(1,10);

// var printSquare = function(size){
//   var width = '';
//   for (i = size; i > 0;  i--){
//     width = width + '*';
//   }
//
//   for (i = size; i > 0; i--){
//     console.log(width);
//   }
//   // for (width; width.length < size; width +='*'){
//   //   console.log (width);
//   // for (i = size; i >=0; i--){
//   //   console.log('*' * width);
//   // }
// // }
// };



// var printBox = function(width, height){
//   var solid = '';
//   for (i = width; i > 0;  i--){
//     solid = solid + '*';
//   }
//   var spaced = '*';
//   for (i = width - 2; i > 0; i--){
//     spaced = spaced + ' ';
//   }
//   spaced = spaced + "*";
//   console.log(solid);
//   for (i = height-2; i > 0; i--){
//     console.log(spaced);
//   }
//   console.log(solid);
//   // for (width; width.length < size; width +='*'){
//   //   console.log (width);
//   // for (i = size; i >=0; i--){
//   //   console.log('*' * width);
//   // }
// // }
// };
// printBox(8,8);
//
// var printBanner = function(text){
//   var solid = '';
//   for (i = text.length+4; i > 0;  i--){
//     solid = solid + '*';
//   }
//   var spaced = '* '+ text + ' *';
//   console.log(solid);
//   console.log(spaced);
//   console.log(solid);
//   // for (width; width.length < size; width +='*'){
//   //   console.log (width);
//   // for (i = size; i >=0; i--){
//   //   console.log('*' * width);
//   // }
// // }
// };
// printBanner('welcome to digital crafts');

// var factors = function(number){
//   factor_arr = [];
//   for (i = 1; i <= number; i++)
//   if(number%i === 0){
//     factor_arr.push(i);
//   }
//   console.log(factor_arr);
// };
// factors(120);
//
// var decipher = function(message){
//   var code = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
//   var message_arr = message.split('');
//   var final_message = [];
//   for (var i = 0; i < message_arr.length; i++){
//     if (message_arr[i] === ' '){
//       final_message.push(' ');
//     }
//     for (var j = 0; j <= code.length; j++){
//       if(message_arr[i] === code[j]){
//         if (j < 13){
//         var change = j + 13;
//         final_message.push(code[change]);
//       }
//       else if (j >= 13) {
//         var offset = 25 - j;
//         offset = 12 - offset;
//         final_message.push(code[offset]);
//       }
//       }
//       upper_true = false;
//     }
//   }
//   final_str = final_message.join("");
//   console.log(final_str);
//
// };
// decipher('Travhf jvgubhg rqhpngvba vf yvxr fvyire va gur zvar');

//ASCII Version
var decipher = function(message){
  var message_arr = message.split('');
  var final_message = [];
  var final_str = '';
  for (var i = 0; i < message_arr.length; i++){
    if (message_arr[i] === ' '){
      final_message.push(' ');
    }
    char_code = message_arr[i].charCodeAt();
        if (char_code < 77 && char_code >= 65 || char_code < 109 && char_code >= 97){
        var offset = char_code + 13;
      }
      else{
        var offset = char_code - 13;
      }
      final_message.push(String.fromCharCode(offset));
  }
final_str = final_message.join("");
console.log(final_str);
};
decipher('Travhf jvgubhg rqhpngvba vf yvxr fvyire va gur zvar');

// var cipher = function(message){
//   var code = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
//   var message_arr = message.split('');
//   var final_message = [];
//   for (var i = 0; i < message_arr.length; i++){
//     if (message_arr[i] === ' '){
//       final_message.push(' ');
//     }
//     for (var j = 0; j <= code.length; j++){
//       if(message_arr[i] === code[j]){
//         if (j >= 13){
//         var change = j - 13;
//         final_message.push(code[change]);
//       }
//       else if (j < 13) {
//         var offset = 13 - j;
//         offset = 26 - offset;
//         final_message.push(code[offset]);
//       }
//       }
//     }
//   }
//   final_str = final_message.join("");
//   console.log(final_str);
//
// };
// cipher('genius without education is like silver in the mine');
//
// var leetspeak = function(message){
//   var mess_arr = message.split('');
//   var final_arr = [];
//   var final_mess = "";
//   for (var i=0; i < message.length; i++){
//     switch(mess_arr[i]){
//       case "a":
//       final_arr.push(4);
//       break;
//       case "e":
//       final_arr.push(3);
//       break;
//       case "g":
//       final_arr.push(6);
//       break;
//       case "l":
//       final_arr.push(1);
//       break;
//       case "o":
//       final_arr.push(0);
//       break;
//       case "s":
//       final_arr.push(5);
//       break;
//       case "t":
//       final_arr.push(7);
//       break;
//       default:
//       final_arr.push(i);
//     }
//   }
//   final_mess = final_arr.join('');
//   console.log(final_mess);
// };
// leetspeak('leet');
//
// var longVowel = function(word){
//   var vowels = ['a', 'e', 'i', 'o', 'u'];
//   var word_arr = word.split('');
//   var new_word_arr = [];
//   var new_word_str = '';
//   for (var i = 0; i < word_arr.length; i++){
//     for (var j = 0; j < vowels.length; j++){
//       if (word_arr[i] === vowels[j]){
//         if(word_arr[i+1] === vowels[j]){
//           new_word_arr.push(vowels[j]+ vowels[j] + vowels[j]);
//           j += 1;
//         }
//
//       }
//
//       }
//       new_word_arr.push(word_arr[i]);
//     }
//
//
//     new_word_str = new_word_arr.join('');
//     console.log(new_word_str);
// };
// longVowel("boot");
//
// var sumNumbers = function(arr){
//   var sum = 0;
//   for (var i=0; i < arr.length; i++){
//     sum += arr[i];
//   }
//   console.log(sum);
// };
// sumNumbers([1,4,8]);

// var positiveNumbers = function (nums) {
//   var pos_num_arr = [];
//   for (var i = 0; i < nums.length; i++){
//     if (nums[i] >= 0){
//       pos_num_arr.push(nums[i]);
//     }
//   }
//   console.log(pos_num_arr);
// };
//
// positiveNumbers([1, -3, 5, -3, 0])
//
// var matrixAdd = function(matrix1, matrix2){
//   var result1 = [];
//   var result2 = [];
//   var result3 = [];
// result1.push(matrix1[0][0] + matrix2[0][0]);
// result1.push(matrix1[0][1] + matrix2[0][1]);
// result2.push(matrix1[1][0] + matrix2[1][0]);
// result2.push(matrix1[1][1] + matrix2[1][1]);
// result3.push(result1, result2);
// console.log(result3);
// };
//
// matrixAdd([[1, 3], [2, 4]], [[5, 2], [1, 0]]);

// var matrixMult = function(matrix1, matrix2){
//   var result1 = [];
//   var result2 = [];
//   var result3 = [];
// result1.push(matrix1[0][0] * matrix2[0][0] + matrix1[0][1] * matrix2[1][0]);
// result1.push(matrix1[0][0] * matrix2[0][1] + matrix1[0][1] * matrix2[1][1]);
// result2.push(matrix1[1][0] * matrix2[0][0] + matrix1[1][1] * matrix2[1][0]);
// result2.push(matrix1[1][0] * matrix2[0][1] + matrix1[1][1] * matrix2[1][1]);
// result3.push(result1, result2);
// console.log(result3);
// };
//
// matrixMult([[2, 4], [3, 4]], [[5, 2], [3, 1]]);

// var rockPaperScissors = function(play1, play2){
//   var r = 'rock';
//   var p = 'paper';
//   var s = 'scissors';
//   if (play1 === r && play2 === s){
//     return 'player 1';
//   }
//   else if (play1 === p && play2 === r){
//     return 'player 1';
//   }
//   else if (play1 === s && play2 === p){
//     return 'player 1';
//   }
//   else if (play2 === s && play1 === p){
//     return 'player 2';
//   }
//   else if (play2 === p && play1 === r){
//     return 'player 2';
//   }
//   else if (play2 === r && play1 === s){
//     return 'player 2';
//   }
//   else {
//     return 'draw';
//   }
// };
// rockPaperScissors('rock', 'paper');
// var rowCheck = function(row){
//     if (row[0] === row[1] && row[1] === row[2]){
//       return true;
//     }
//   };

// var columnCheck = function(grid){
//     for (var j = 0; j < grid[0].length; j++){
//       if(grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]){
//         return grid[0][j];
//       }
//
//     }
//   return false;
// };
//
//
// var ticTacToe = function(grid){
//   for (var i = 0; i < grid.length; i++){
//     var result = rowCheck(grid[i]);
//     if (result){
//       if (grid[i][0] === 'O'){
//         return 'O';
//       }
//       else{
//         return 'X';
//       }
//     }
//     else {
//       result = columnCheck(grid);
//       if (result){
//         return result;
//       }
//     }
//   }
//   return null;
// };
//
// console.log(ticTacToe([
//   ['O', 'X', 'O'],
//   ['O', 'O', null],
//   [null, 'X', 'X']
//   ]));
