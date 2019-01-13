var loader = {
  /**
   * 显示加载
   */
  show: function() {
    var bmLoader = document.getElementById('bmLoader');
    if (bmLoader == undefined) {
      var img = document.createElement('img'),
        div = document.createElement('div');

      img.className = 'loader';
      img.src = 'img/loading.gif';
      div.id = 'bmLoader';
      div.appendChild(img);
      document.body.appendChild(div);
    }
  },

  /**
   * 移除结束
   */
  remove: function() {
    var bmLoader = document.getElementById('bmLoader');
    if(bmLoader) {
      document.body.removeChild(bmLoader);
    }
  }
};
