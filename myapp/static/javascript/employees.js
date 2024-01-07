document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("profile").addEventListener("mouseover", profile_icon_hover);
    document.getElementById("profile").addEventListener("mouseout", profile_icon_out_hover);
    document.getElementById("profile-popup").addEventListener("mouseout", profile_icon_out_hover);
    document.getElementById("profile-popup").addEventListener("mouseover", profile_icon_hover);
});

function profile_icon_hover() {
    document.getElementById("profile-popup").style.visibility = "visible";
    document.getElementById("selective-gray-background").classList.add("visible");
}
function profile_icon_out_hover() {
    document.getElementById("profile-popup").style.visibility = "hidden";
    document.getElementById("selective-gray-background").classList.remove("visible");
}

function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function hidePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

