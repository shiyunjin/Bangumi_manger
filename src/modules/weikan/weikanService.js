module.exports = [ '$window',
    function ( $window ) {
        this.getfang = function ( key , block_test_list, callback ) {
            var reg = /(?:\[)[^\[\]]*(?:\])/g;
            var nokreg= /((?:\])[^\[\]]{1,}(?:\[)|(?:\])[^\[\.]{1,}(?:\.))/g;
            var res = key.match(reg);
            var info = {};
            info['file']=key;
            var nowlenght = ylenght = res.length;
            //console.info(res);
            res.forEach(function (item) {
              item_upper = fldel(item).toUpperCase();
              nowlenght--;
              switch (item_upper) {
                case '720P':
                  info['clarity']='720P';
                break;
                case '1080P':
                  info['clarity']='1080P';
                break;
                case '480P':
                  info['clarity']='480P';
                break;
                case 'GB':
                  info['language']='简体';
                break;
                case 'CHS':
                  info['language']='简体';
                break;
                case 'CHT':
                  info['language']='繁体';
                break;
                case 'GB_MP4':
                  info['language']='简体';
                break;
                case '简体':
                  info['language']='简体';
                break;
                case '简日':
                  info['language']='简日';
                break;
                case 'GB_JP':
                  info['language']='简日';
                break;
                case 'BIG5':
                  info['language']='繁体';
                break;
                case '1280X720':
                  info['clarity']='720P';
                break;
                case '1920X1080':
                  info['clarity']='1080P';
                break;
                case '848X480':
                  info['clarity']='480P';
                break;
                case 'OVA':
                  info['ova']=true;
                break;
                case 'SP':
                  info['sp']=true;
                break;
                case 'JP_SC':
                  info['language']='简日';
                break;
                case '简日双语字幕':
                  info['language']='简日';
                break;
                case 'JP_TC':
                  info['language']='繁日';
                break;
                case '繁日双语字幕':
                  info['language']='繁日';
                break;
                case 'END':

                break;
                case 'PREV':

                break;
                case 'HARDSUB':

                break;
                case '日语版':

                break;
                default:
                  if(item_upper.indexOf('AAC')>=0 || item_upper.indexOf('X264')>=0 || (item_upper.indexOf('第')>=0 && (item_upper.indexOf('季')>=0))|| item_upper.indexOf('HDRIP')>=0)
                    nowlenght--;
                  else if(!info['number']){
                    var temp=item_upper.toLowerCase().match(/(?![0-9a-zA-Z ]*\.)(?![0-9a-zA-Z ]*p)(?![0-9a-zA-Z ]*P)(?![0-9a-zA-Z ]*X)(?![0-9a-zA-Z ]*x)[0-9a-zA-Z ]*[^\s]/);
                    if(temp && typeof(temp[0])!=undefined && !isNaN(temp[0])){
                      info['number']=temp[0];
                    }
                  }
                  nowlenght++;
                break;
              }
            });
            if(nowlenght<=2){
              var tempname=info['file'].match(nokreg);
              if(tempname){
                info['ass']=fldel(res[0]);
                info['name']=fldel(tempname[0]);
              }else{
                info['ass']='无';
                info['name']=fldel(res[0]);
              }
            }else{
              if(res[1].indexOf('新番')>=0){
                info['ass']=fldel(res[0]);
                info['name']=fldel(res[2]);
              }else{
                info['ass']=fldel(res[0]);
                info['name']=fldel(res[1]).split('_').join(' ');
              }
            }
            if(info['name'].indexOf(' - ')>=0 && !info['number']){
              var temp=togang(info['name']);
              info['name']=temp[0];
              info['number']=temp[1];
            }
            if(info['name'].indexOf(' ')>=0 && !info['number']){
              var temp = info['name'].split(' ');
              var tempnumber = temp[temp.length-1];
              if(tempnumber.length == 2 && !isNaN(tempnumber)){
                info['number']=tempnumber;
                temp.pop();
                info['name'] = temp.join(' ');
              }
            }
            //if(!isNaN(info.name))
              //console.info(info);
            callback(info);
        };

        fldel = function ( str ) {
          return str.substr(1,str.length-2);
        };

        togang = function ( str ) {
          var obj = str.split(' - ');
          return obj;
        };
    }
]
