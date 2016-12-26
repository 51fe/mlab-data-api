$(function() {
  var tbody = $('#userTbl tbody'),
    userModal = $('#userModal'),
    users = [],
    user = {},
    isAdd = false,
    index = -1;

  // 搜索
  $('#searchForm').submit(function(e) {
    e.preventDefault();
    read();
  }).submit();

  // 点击新增按钮
  $('.add-btn').click(function() {
    user = {
      name: '',
      age: '',
      sex: 1
    };
    initUserForm(user, true);
  });

  // 点击编辑按钮
  tbody.on('click', '.edit-btn', function() {
    index = tbody.find('.edit-btn').index($(this));
    user = users[index];
    initUserForm(user, false);
  });

  /**
   * 初始化用户表单
   * @param user
   * @param isAdd
   */
  function initUserForm(user, isAdd) {
    $('.modal-content').load('tpl/user-form.html', function() {
      $(this).html(template('userTmp', {
        user: user,
        isAdd: isAdd
      }));
      userModal.modal('show');
    });
  }

  // 新增编辑
  App.initValidator();

  userModal.validate({
    submitHandler: function(form) {
      $(form).find('button[type="submit"]')
        .attr('disabled', true).addClass('disabled');

      save();
    }
  });

  // 点击删除按钮
  tbody.on('click', '.delete-btn', function() {
    index = tbody.find('.delete-btn').index($(this));
    confirm.show(function() {
      user = users[index];
      remove();
    });
  });

  /**
   * 读取
   */
  function read() {
    loader.show();
    var key = $.trim($('#keyName').val()) || "";
    $.get(App.baseUrl + '/users?q={"name":{"$regex":"' + key + '"}}&apiKey=' + App.apiKey, function(data) {
      loader.remove();
      users = data;
      tbody.html(template('usersTmp', {users: users}));
    });
  }

  /**
   * 新增编辑
   */
  function save() {
    user.name = $('#name').val();
    user.age = parseInt($('#age').val());
    user.sex = parseInt($('input[name="sex"]:checked').val());
    loader.show();
    $.post(App.baseUrl + '/users?apiKey=' + App.apiKey,
      JSON.stringify(user), function(data) {
        userModal.modal('hide');
        loader.remove();
        // _id为空则新增
        isAdd = user._id === undefined;
        if (isAdd) {
          users.push(user)
        } else {
          users[index] = user;
        }
        tbody.html(template('usersTmp', {
          users: users,
          isAdd: isAdd
        }));
      });
  }

  /**
   * 删除
   */
  function remove() {
    loader.show();
    $.ajax({
      url: App.baseUrl + '/users/' + user._id.$oid + '?apiKey=' + App.apiKey,
      type: "DELETE",
      success: function() {
        loader.remove();
        users.splice(index, 1);
        confirm.remove();
        tbody.html(template('usersTmp', {users: users}));
      }
    });
  }
});