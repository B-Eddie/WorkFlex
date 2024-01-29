/*document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();
}); */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("profile").addEventListener("mouseover", profile_icon_hover);
    document.getElementById("profile").addEventListener("mouseout", profile_icon_out_hover);
    document.getElementById("profile-popup").addEventListener("mouseout", profile_icon_out_hover);
    document.getElementById("profile-popup").addEventListener("mouseover", profile_icon_hover);

    $(document).ready(function () {
        // Initialize FullCalendar
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            defaultView: 'agendaWeek',
            events: '/get_events',  // URL to fetch events
            height: 400,
        });
        $('.fc-next-button').html('<i class="material-icons">navigate_next</i>');
        $('.fc-prev-button').html('<i class="material-icons">navigate_before</i>');
    });

    $(document).ready(function() {
        $('#target_employee').change(function() {
            var selectedEmployeeId = $(this).val();  // Get the value of the selected option
            if (selectedEmployeeId) {  // Check if a value is selected
                $.ajax({
                    url: '/get-available-shifts/' + selectedEmployeeId,
                    type: 'GET',
                    success: function(response) {
                        var availableShifts = response;
                        $('#available_shifts').empty();
                        $.each(availableShifts, function(index, shift) {
                            $('#available_shifts').append($('<option>', {
                                value: shift.id,
                                text: shift.date + ' - ' + shift.start_time + ' to ' + shift.end_time
                            }));
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error(error);
                    }
                });
            }
        });
    });

});

function profile_icon_hover() {
    document.getElementById("profile-popup").style.visibility = "visible";
    document.getElementById("selective-gray-background").classList.add("visible");
}
function profile_icon_out_hover() {
    document.getElementById("profile-popup").style.visibility = "hidden";
    document.getElementById("selective-gray-background").classList.remove("visible");
}