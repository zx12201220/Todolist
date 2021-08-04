$(function () {
  widthLoad();
  load();
  $(".today").html(getTime());
  function getTime() {
    let mydate = new Date();
    let y = mydate.getFullYear();
    let m = mydate.getMonth();
    m = m + 1;
    if (m <= 9) {
      m = "0" + m;
    }
    let d = mydate.getDate();
    if (d <= 9) {
      d = "0" + d;
    }
    return y + "." + m + "." + d;
  }

  //讀取數據
  function getData() {
    let data = localStorage.getItem("todolist");
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  //儲存數據
  function saveData(data) {
    localStorage.setItem("todolist", JSON.stringify(data));
  }
  //渲染頁面
  function load() {
    let data = getData();
    $(".dolist,.donelist").empty();

    $.each(data, function (i, n) {
      if (n.done) {
        $(".donelist").append(
          '<li><input type="checkbox" name="" id="" class="done_btn"><label></label><i class= "close displayNone" id=' +
          i +
          "> X</i ><p> " +
          n.title +
          "</p></li >"
        );
        $(".donelist label").attr("data-content", "");
      } else {
        $(".dolist").append(
          '<li><input type="checkbox" name="" id="" class="done_btn"><div class="animate">DONE</div><label></label><i class= "close displayNone" id=' +
          i +
          "> X</i ><p> " +
          n.title +
          "</p></li >"
        );
      }
    });
  }

  //sidebar nav切換
  let flag = true;
  $('.nav_toggle').on('click', function () {
    $('.sidebar').show().css('position', 'absolute');
    $('.nav_close').show();
    $('.nav_bg').show();
    flag = false;
  })
  $('.nav_close').on('click', function () {
    $('.sidebar').hide().css('position', 'relative');
    $('.nav_close').hide();
    $('.nav_bg').hide();
    flag = true;
    widthLoad();
  })
  $(window).on('resize', function () {
    if (flag) {
      widthLoad();
    }
  })
  function widthLoad() {
    let width = $(window).width();  
    if (width > 1350) {
      $('.sidebar').show();
      $('.nav_toggle').hide();
    } else {
      $('.sidebar').hide();
      $('.nav_toggle').show();
    }
  }
  //手機端 item tab切換
  let itemsIndex;
  $(".items").eq(0).show();
  $(".items_tab ul").on("click", "li", function () {
    $(this).addClass("items_tab_current");
    $(this).siblings("li").removeClass("items_tab_current");
    itemsIndex = $(this).index();
    $(".items").eq(itemsIndex).show().siblings(".items").hide();
  });

  //編輯按鈕 點擊彈出編輯清單
  $(".dolist_edit").on("click", function () {
    $(".dolist_edit ul").fadeToggle("fast");
  });
  $(".donelist_edit").on("click", function () {
    $(".donelist_edit ul").fadeToggle("fast");
  });
  //新增畫面
  $(".dolist_edit ul li:eq(0)").on("click", function () {
    $(".add_modal").fadeIn("fast");
    $(".add_modal input").focus();
  });
  //新增畫面 取消
  $(".add_modal_close").on("click", function () {
    $(".add_modal").fadeOut("fast");
  });
  //刪除按鈕
  $(".dolist_edit ul li:eq(1)").on("click", function () {
    if ($(".dolist li").length !== 0) {
      $(".dolist li>i").toggleClass("displayNone");
      $(this).parents(".item_top").siblings(".close_bg").toggle();
    }
  });
  $(".donelist_edit ul li:eq(0)").on("click", function () {
    if ($(".donelist li").length !== 0) {
      $(".donelist li>i").toggleClass("displayNone");
      $(this).parents(".item_top").siblings(".close_bg").toggle();
    }
  });
  //done按鈕點擊事件
  $(".dolist").on("click", "li>label", function () {
    $(this).siblings(":checkbox").prop("checked", true);
  });
  $(".donelist").on("click", "li>label", function () {
    $(this).siblings(":checkbox").prop("checked", false);
  });

  //新增鍵點擊事件
  $(".add_modal_save").on("click", function (e) {
    if ($("#title").val() === "") {
      alert("請輸入內容...");
    } else {
      let local = getData();
      local.push({ title: $("#title").val(), done: false });
      saveData(local);
      $("#title").val("");
      load(); //渲染到頁面
    }
  });
  //刪除鍵點擊事件
  $(".dolist").on("click", ".close", function () {
    let data = getData();
    let index = $(this).attr("id");
    data.splice(index, 1);
    saveData(data);
    load();
    $(".close_bg").hide();
  });
  $(".donelist").on("click", ".close", function () {
    let data = getData();
    let index = $(this).attr("id");
    data.splice(index, 1);
    saveData(data);
    load();
    $(".close_bg").hide();
  });
  //todolist正在進行和已完成操作
  $(".dolist,.donelist").on("click", "label", function () {
    let data = getData();
    let index = $(this).siblings("i").attr("id");
    data[index].done = $(this).siblings(":checked").prop("checked");
    saveData(data);
    load();
  });
  $(".dolist").on("mouseenter", "label", function () {
    $(this).siblings('.animate').css("width", "80%");
  });
  $(".dolist").on("mouseleave", "label", function () {
    $(this).siblings('.animate').css("width", "0%");
  });


  //初始載入 memo
  if (localStorage.getItem("memo") == "") {
    $("#txt").val("請輸入內容....");
  } else {
    $("#txt").val(localStorage.getItem("memo"));
  }
  //memo save
  $("#btn").click(function () {
    var txt = document.querySelector("#txt").value;
    localStorage.setItem("memo", txt);
  });
});

