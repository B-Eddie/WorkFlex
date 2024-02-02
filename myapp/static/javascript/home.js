/*document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();
}); */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("vacation-days").addEventListener("click", vac_popup);
    document.getElementById("sick-days").addEventListener("click", sic_popup);
    document.getElementById("time-worked-week").addEventListener("click", tim_popup);
    document.getElementById("send-message").addEventListener("click", msg_popup);

    document.getElementById("gray-background").addEventListener("click", gray_click);

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
            height: 300,
        });
        $('.fc-next-button').html('<i class="material-icons">navigate_next</i>');
        $('.fc-prev-button').html('<i class="material-icons">navigate_before</i>');
    });

    $(document).ready(function() {
        $('.delete-message').click(function() {
            var index = $(this).data('message');
            $.ajax({
                type: 'POST',
                url: '/delete-message',
                data: { index: index },
                success: function(response) {
                    if (response.status == 'success') {
                        // Refresh the page or update the message list as needed
                        location.reload(); // This reloads the page
                    } else {
                        console.log('Failed to delete message.');
                    }
                }
            });
        });
    });

    $(document).ready(function() {
        $('.decline-request-sta').click(function() {
            var index = $(this).data('message');
            $.ajax({
                type: 'POST',
                url: '/decline-request-sta',
                data: { index: index },
                success: function(response) {
                    if (response.status == 'success') {
                        // Refresh the page or update the message list as needed
                        location.reload(); // This reloads the page
                    } else {
                        console.log('Failed to delete message.');
                    }
                }
            });
        });
    });

    $(document).ready(function() {
        $('.accept-request-sta').click(function() {
            var index = $(this).data('message');
            var shiftEventId1 = $(this).closest('.shift-changes').find('.sta-to-id').val();
            var shiftEventId2 = $(this).closest('.shift-changes').find('.sta-from-id').val();
            $.ajax({
                type: 'POST',
                url: '/accept-request-sta/' + shiftEventId1 + "|" + shiftEventId2,
                data: { index: index },
                success: function(response) {
                    if (response.status == 'success') {
                        // Refresh the page or update the message list as needed
                        location.reload(); // This reloads the page
                    } else {
                        console.log('Failed to delete message.');
                    }
                }
            });
        });
    });
    $(document).ready(function() {
        $('.decline-request-sca').click(function() {
            var index = $(this).data('message');
            $.ajax({
                type: 'POST',
                url: '/decline-request-sca',
                data: { index: index },
                success: function(response) {
                    if (response.status == 'success') {
                        // Refresh the page or update the message list as needed
                        location.reload(); // This reloads the page
                    } else {
                        console.log('Failed to delete message.');
                    }
                }
            });
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



function gray_click() {
    var tim = document.getElementById("time-worked-week-popup").classList;
    var sic = document.getElementById("sick-days-left").classList;
    var vac = document.getElementById("vacation-days-left").classList;
    var msg = document.getElementById("send-message-popup").classList;

    if (tim.contains("visible")) {
        tim.remove("visible");
        document.getElementById("gray-background").classList.toggle("visible");
    } else if (msg.contains("visible")) {
        msg.remove("visible");
        document.getElementById("gray-background").classList.toggle("visible");
    } else if (sic.contains("visible")) {
        sic.remove("visible");
        document.getElementById("gray-background").classList.toggle("visible");
    } else if (vac.contains("visible")) {
        vac.remove("visible");
        document.getElementById("gray-background").classList.toggle("visible");
    }
}

function msg_popup() {
    document.getElementById("gray-background").classList.toggle("visible");
    document.getElementById("send-message-popup").classList.toggle("visible");
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


