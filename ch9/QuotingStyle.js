/**
 * Created by junghyunkwon on 1/1/16.
 */



var text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/^'|(\W)'|'(\W)|'$/g, "$1\"$2"));
// → "I'm the cook," he said, "it's my job."