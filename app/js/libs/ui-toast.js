var toast = {
  // 计时器id
  intervalId: 0,

  /**
   * 显示提示消息
   * @param msg
   */
  show: function(msg) {
    var toastLayer = $('#toastLayer');
    if (toastLayer.size() == 0) {
      $(document.body).append('<div id="toastLayer">' +
        '<div class="toast">' +
        '<h4 class="toast-title">提示</h4>' +
        '<p class="toast-content">' + msg + '</p>' +
        '</div>' +
        '</div>');
      var toast = $('.toast'),
        win = $(window),
        w = toast.width(),
        h = toast.height();

      toast.css({
        left: Math.round((win.width() - w) / 2) + 'px',
        top: Math.round((win.height() - h) / 2) + 'px'
      });

      $(document.body).click(function() {
        toast.remove();
      });

      toast.intervalId = setTimeout(function() {
        toast.fadeOut(1000, function() {
          toast.remove();
        });
      }, 3000);
    }
  },

  /**
   * 移除提示消息
   * @param intervalID
   */

  remove: function() {
    clearTimeout(toast.intervalId);
    $('.toast').fadeOut(500, function() {
      $(this).parent().remove();
    });
  }
};
