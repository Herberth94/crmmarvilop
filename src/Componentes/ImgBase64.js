


/* Convertir Imagen a base 64 */

function toDataURL(src, callback){
    var image = new Image();
    image.crossOrigin = 'Anonymous';
 
    image.onload = function(){
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      context.drawImage(this, 0, 0);
      var dataURL = canvas.toDataURL('image/jpeg');
      callback(dataURL);
    };
    image.src = src;
  }

/* 

      toDataURL('https://images.unsplash.com/photo-1606115915090-be18fea23ec7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80', function(dataURL){
        alert(dataURL);         
    }) */