var App = {
  baseUrl: 'https://api.mlab.com/api/1/databases/sample/collections',
  apiKey: 'zAIsqJqj73FywHB6GzNSEDI7aeO-09o3',

  /**
   * 初始化验证
   */
  initValidator: function() {
    $.extend($.validator.defaults, {
      errorElement: 'span',
      errorClass: 'help-block',
      focusInvalid: false,
      ignore: "",

      highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
      },

      success: function(label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
      },

      errorPlacement: function(error, element) {
        if (element.closest('.input-icon').size() == 1) {
          error.insertAfter(element.closest('.input-icon'));
        } else if (element.closest('.input-group').size() == 1) {
          error.insertAfter(element.closest('.input-group'));
        } else {
          error.insertAfter(element);
        }
      }
    });
  },
};

$(function() {
  // Ajax公共配置
  $.ajaxSetup({
    timeout: 30000,
    contentType: 'application/json;charset=utf-8',
    dataType: 'json',
    error: function(jqXHR, textStatus, error) {
      $('button[type="submit"]').removeAttr('disabled')
        .removeClass('disabled');

      loader.remove();
      var msg = '';
      if (jqXHR.status == 0) {
        msg = '没有连接或跨域请求，请检查网络';
      } else if (jqXHR.status == 400) {
        msg = '输入错误';
      } else if (jqXHR.status == 401) {
        msg = '请求没有授权';
      } else if (jqXHR.status == 403) {
        msg = '用户没有权限';
      } else if (jqXHR.status == 404) {
        msg = '请求资源未请求找到';
      } else if (jqXHR.status == 405) {
        msg = '不支持的HTTP方法';
      } else if (jqXHR.status == 500) {
        msg = '服务器错误';
      } else if (textStatus == 'parsererror') {
        msg = '请求JSON解析错误';
      } else if (textStatus == 'timeout') {
        msg = '请求超时';
      } else if (textStatus == 'abort') {
        msg = '请求取消';
      } else if (jqXHR.responseJSON) {
        msg = jqXHR.responseJSON.responseMsg;
      } else {
        msg = '未知错误';
      }
      if (msg) {
        toast.show(msg);
      }
    }
  });
});
