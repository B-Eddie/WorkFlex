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
                right: 'month,agendaWeek,agendaDay'
            },
            events: '/get_events',  // URL to fetch events
            displayEventTime: false,
        });
        $('.fc-next-button').html('<i class="material-icons">navigate_next</i>');
        $('.fc-prev-button').html('<i class="material-icons">navigate_before</i>');
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
