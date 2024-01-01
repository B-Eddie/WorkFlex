/*document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();
}); */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("vac-right-txt").addEventListener("click", vac_popup);
    document.getElementById("sic-right-txt").addEventListener("click", sic_popup);
    document.getElementById("tim-right-txt").addEventListener("click", tim_popup);
    document.getElementById("gray-background").addEventListener("click", gray_click);

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
            height: 300,
        });
        $('.fc-next-button').html('<i class="material-icons">navigate_next</i>');
        $('.fc-prev-button').html('<i class="material-icons">navigate_before</i>');
    });
});


function gray_click() {
    var tim = document.getElementById("time-worked-week-popup").classList;
    var sic = document.getElementById("sick-days-left").classList;
    var vac = document.getElementById("vacation-days-left").classList;

    if (tim.contains("visible")) {
        tim.remove("visible");
        document.getElementById("gray-background").classList.toggle("visible");
    } else if (sic.contains("visible")) {
        sic.remove("visible");
        document.getElementById("gray-background").classList.toggle("visible");
    } else if (vac.contains("visible")) {
        vac.remove("visible");
        document.getElementById("gray-background").classList.toggle("visible");
    }
}


function vac_popup() {
    document.getElementById("gray-background").classList.toggle("visible");
    document.getElementById("vacation-days-left").classList.toggle("visible");
}

function tim_popup() {
    document.getElementById("gray-background").classList.toggle("visible");
    document.getElementById("time-worked-week-popup").classList.toggle("visible");
}

function sic_popup() {
    document.getElementById("gray-background").classList.toggle("visible");
    document.getElementById("sick-days-left").classList.toggle("visible");
}

