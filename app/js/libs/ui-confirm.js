/**
 * 确认框
 */
var confirm = {
  /**
   * 显示确认框
   * @param callback
   */
  show: function(callback) {
    var html = '<form class="modal fade" id="confirmModal" tabindex="-1"' +
      'role="dialog" aria-hidden="true" data-back-drop="static">' +
      '<div class="modal-dialog modal-sm">' +
      '<div class="modal-content">' +
      '<div class="modal-body">确认要删除吗？</div>' +
      '<div class="modal-footer" align="center">' +
      '<button type="button" class="btn btn-default" id="okBtn">确定</button>' +
      ' <button type="submit" class="btn btn-primary" data-dismiss="modal" id="cancelBtn">取消</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</form>';

    $(document.body).append(html);

    $('#confirmModal').modal('show').on('hide.bs.modal', function() {
      $(this).remove();
    });

    $('#okBtn').click(function() {
      if (typeof callback === 'function') {
        callback();
      }
    });
  },

  /**
   * 移除确认框
   */
  remove: function(){
    $('#confirmModal').modal('hide');
    $('#confirmModal').remove();
  }
};
