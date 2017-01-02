/**
 * 确认框
 */
var confirm = {
  /**
   * 显示确认框
   * @param message
   * @param callback
   */
  show: function(message, callback) {
    var html = '<form class="modal fade" id="confirmModal" tabindex="-1"' +
      'role="dialog" aria-hidden="true" data-backdrop="static">' +
      '<div class="modal-dialog modal-sm">' +
      '<div class="modal-content">' +
      '<div class="modal-body">' + message + '</div>' +
      '<div class="modal-footer" align="center">' +
      '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
      '<button type="submit" class="btn btn-primary">确定</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</form>';

    $(document.body).append(html);

    $('#confirmModal').modal('show').on('hide.bs.modal', function() {
      $(this).remove();
    }).submit(function(e) {
      e.preventDefault();
      if (typeof callback === 'function') {
        callback();
      }
    });
  },

  /**
   * 移除确认框
   */
  remove: function() {
    $('#confirmModal').modal('hide');
  }
};
