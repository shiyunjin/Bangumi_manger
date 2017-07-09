module.exports = [
  function() {
      return function(text) {
          var icon='movie';
          switch(text){
            case '480P':
              icon='theaters';
            break;
            case '720P':
              icon='hd';
            break;
            case '1080P':
              icon='high_quality';
            break;
          }
          return icon;
      }
  }
];
