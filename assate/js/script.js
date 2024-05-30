
'use strict';

var month_hijri = ['محرم', 'صفر', 'ربیع‌ الأول', 'ربیع‌ الثانی', 'جمادی‌ الأولى', 'جمادی‌ الثانیة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];

var months = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];

var CurrentMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12];

var dateObj = new Date();
var month = dateObj.getMonth();
var currMonth = dateObj.getMonth();
var year = dateObj.getFullYear();
var currYear = dateObj.getFullYear();
var table = _('cal');


_('month').innerHTML = months[month];
_('year').innerHTML = year;



_('prev').addEventListener('click', () => trackMonth('prev'));
_('next').addEventListener('click', () => trackMonth('next'));

function _(id) {
    return document.getElementById(id);
}

function trackMonth(dir) {
    if (dir == 'prev') month -= 1;
    if (dir == 'next') month += 1;
    if (month > 11) {
        month = 0;
        year += 1;
    }
    if (month < 0) {
        month = 11;
        year -= 1;
    }
    _('month').innerHTML = months[month];
    _('year').innerHTML = year;

    calender(month, year);
}

function calender(month, year) {

    var today = dateObj.getDate();
    var firstDay = new Date(year, month, 1);
    var startDay = firstDay.getDay();
    var weekDays = ['الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه', 'السبت'];
    var monthLength = new Date(year, month + 1, 0).getDate();
    var html = '';
    console.log(currMonth);
    var valentines = new Date();
    var day1 = valentines.getDay();

    _('todayName').innerHTML = weekDays[day1];
    _('todayNumber').innerHTML = today;
    // DAYS OF WEEK HEADER
    html += '<tr>';
    for (var i = 0; i < weekDays.length; i++) {
        html += '<td class="py-0" style="font-size: xx-small;">' + weekDays[i] + '</td>';
    }
    html += '</tr>';

    // CALENDAR PART
    var count = 0;
    html += "<tr><td colspan='" + startDay + "'></td>";
    count = startDay;
    for (var day = 1; day <= monthLength; day++) {

        if (count % 7 === 0) {
            html += "<tr>";
        }
        if (today !== day) {
            html += "<td class='normal fw-semibold numbar-day-calender px-2 py-2 fs-6'>" + day + "</td>";
        } else if (currMonth === month) {
            html += "<td class='normal fw-semibold numbar-day-calender px-2 py-2 fs-6 rounded-circle background-danger text-white' style='width: 2.4em;height: 2em;'>" + day + "</td>";
        } else {
            html += "<td class='normal fw-semibold numbar-day-calender px-2 py-2 fs-6'>" + day + "</td>";
        }
        count++;
        if (count % 7 === 0) {
            html += "</tr>";
        }
    }
    table.innerHTML = html;
    var inputDate = document.querySelector('input[type="date"]');
    inputDate.value = year + '-' + CurrentMonths[month] + '-' + today;
}
calender(month, year);


const customSelect = document.querySelector(".custom-select");
const selectBtn = document.querySelector(".select-button");

const selectedValue = document.querySelector(".selected-value");
const optionsList = document.querySelectorAll(".select-dropdown li");

// add click event to select button
selectBtn.addEventListener("click", () => {
    // add/remove active class on the container element
    customSelect.classList.toggle("active");
    // update the aria-expanded attribute based on the current state
    selectBtn.setAttribute(
        "aria-expanded",
        selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
});

optionsList.forEach((option) => {
    function handler(e) {
        // Click Events
        if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
            selectedValue.textContent = this.children[1].textContent;
            customSelect.classList.remove("active");
        }
        // Key Events
        if (e.key === "Enter") {
            selectedValue.textContent = this.textContent;
            customSelect.classList.remove("active");
        }
    }

    option.addEventListener("keyup", handler);
    option.addEventListener("click", handler);
});