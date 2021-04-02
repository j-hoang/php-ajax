$(document).ready(function() {
  // Global Settings
  let edit = false;

  // Testing Jquery
  console.log('jquery is working!');
  $('#task-result').hide();
  fetchTasks();

  // search key type event
  $('#search').keyup(function() {
    if($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'task-search.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let tasks = JSON.parse(response);
            let template = '';
            tasks.forEach(task => {
              template += `
                     <li><a href="#" class="task-item" taskId="${task.id}">${task.name}</a></li>
                    `
            });
            if(template == '') {
              template = `
                     No Matches Found
                    `
            }
            $('#task-result').show();
            $('#container').html(template);
          }
        }
      })
    }
  });

  // Close search div
  $('.close-icon').on('click',function() {
    $(this).closest('.card').fadeOut();
    $('#search').val("");
  })

  // Add/Edit Task
  $('#task-form').validate({
    rules: {
      name: {
        required: true,
        normalizer: function(value) {
          return $.trim(value);
        },
        maxlength: 50
      },
      description: {
        required: true,
        normalizer: function(value) {
          return $.trim(value);
        },
        maxlength: 200
      }
    },

    submitHandler: function(form) {

        const postData = {
          name: $('#name').val(),
          description: $('#description').val(),
          id: $('#taskId').val()
        };
        const url = edit === false ? 'task-add.php' : 'task-edit.php';
        const msgMod = edit === false ? 'Add' : 'Edit';
        console.log(postData, url);
        $.post(url, postData, (response) => {
          $('#task-form').trigger('reset');
          edit = false;

          if(response == 0)
            toastr.error('Task ' + msgMod + ' Error: Task ' + postData.id + ' Is No Longer Available.', 'Error Alert', {timeOut: 2000});
          else if (response == "full")
            toastr.error('Error: Task List Full. Limit 20 Tasks', 'Error Alert', {timeOut: 2000});
          else
            toastr.success('Task ' + msgMod + 'ed Successfully!', 'Success Alert', {timeOut: 2000});

          fetchTasks();
        })
        .fail(function(xhr, status, error) {
            toastr.error('Task ' + msgMod + ' Error!', 'Error Alert', {timeOut: 2000});
        });
        $('#taskHeader').text('Add New Task');
        $('#taskFormBtn').html('<i class="fa fa-plus-circle"></i> Add Task');

    }
  });

  // Fetching Tasks
  function fetchTasks() {
    $.ajax({
      url: 'tasks-list.php',
      type: 'GET',
      success: function(response) {
        const tasks = JSON.parse(response);
        let template = '';
        tasks.forEach(task => {
          template += `
                  <tr>
                  <td>${task.id}</td>
                  <td>
                  <a href="#" class="task-item text-break" taskId="${task.id}">
                    ${task.name}
                  </a>
                  </td>
                  <td class="text-break">${task.description}</td>
                  <td>
                    <button class="task-delete btn btn-danger p-3 fa fa-trash fa-lg" taskId="${task.id}" type="button"></button>
                  </td>
                  </tr>
                `
        });
        $('#tasks').html(template);
      }
    });
  }

  // Get a Single Task by Id
  $(document).on('click', '.task-item', (e) => {
    // const element = $(this)[0].activeElement; // Does not work on iPhone browsers
    const element = $(e.target);
    const id = $(element).attr('taskId');
    window.scroll(0, 0);

    $.ajax({
      url: 'task-single.php',
      data: {id},
      type: 'POST',
      success: function (response) {
        if(!response.error) {
          console.log("(" + response + ")");
          const task = JSON.parse(response);
          if(task == null) {
            toastr.error('Task ' + id + ' Is No Longer Available.', 'Error Alert', {timeOut: 2000});
            edit = false;
            $('#taskHeader').text('Add New Task');
            $('#taskFormBtn').html('<i class="fa fa-plus-circle"></i> Add Task');
            $('#task-form').find("input[type=text], textarea").val("");
            fetchTasks();
          } else {
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            $('#taskHeader').text('Edit Task ' + id);
            $('#taskFormBtn').html('<i class="fa fa-edit"></i> Edit Task');
            toastr.success('Task Loaded In Form', 'Success Alert', {timeOut: 2000});
            edit = true;
          }
        }
      }
    });


    e.preventDefault();
  });

  // Delete a Single Task
  $(document).on('click', '.task-delete', (e) => {
    if(confirm('Are you sure you want to delete it?')) {
      //const element = $(this)[0].activeElement.parentElement.parentElement; // Does not work on iPhone browsers
      const element = $(e.target);
      const id = $(element).attr('taskId');

      $.post('task-delete.php', {id}, (response) => {

        if(response == 0)
          toastr.error('Task Delete Error: Task ' + id + ' Is No Longer Available.', 'Error Alert', {timeOut: 2000});
        else
          toastr.success('Task Deleted Successfully!', 'Success Alert', {timeOut: 2000});

        fetchTasks();
      });
    }
  });
});
