var TECalendar = null;
var selStartDate;
var selEndDate;
var id = 0;
var eventIdentifier = '';
window.calendarJsFunctions = {
    
    calendar: function () {
        var calendarEl = document.getElementById('calendar');

        document.getElementById('calMenu').style.visibility = 'visible';
        alert('TECalendar is ' + (TECalendar ? 'An Object' : 'null'));

        if(!TECalendar) TECalendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            selectable : true,
            events: [
                {
                    title: 'All Day Emergency Meeting',
                    start: '2020-09-01'
                },
                {
                    title: 'Five year Strategy Planning',
                    start: '2020-09-07',
                    end: '2020-09-10'
                },
                {
                    groupId: '999',
                    title: 'Repeating Event',
                    start: '2020-09-09T16:00:00'
                },
                {
                    groupId: '999',
                    title: 'Repeating Event',
                    start: '2020-09-16T16:00:00'
                },
                {
                    title: 'Donor Conference',
                    start: '2020-09-11',
                    end: '2020-09-13'
                },
                {
                    title: 'Final Meeting',
                    start: '2020-09-12T10:30:00',
                    end: '2020-09-12T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: '2020-09-12T12:00:00'
                },
                {
                    title: 'Meeting',
                    start: '2020-09-12T14:30:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2020-09-13T07:00:00'
                },
                {
                    title: 'Click for Blazor Training',
                    url: 'https://dotnet.microsoft.com/learn/aspnet/blazor-tutorial/intro',
                    start: '2020-10-28'
                }
            ], // Sample events
            dateClick: function (info) {
                //TECalendar.gotoDate(selStartDate);
            },
            select: function (info) {
                selStartDate = info.startStr;
                selEndDate = info.endStr;
                alert('selected ' + info.startStr + ' to ' + info.endStr);
            },
            eventClick: function (info) {
                TECalendar.getEvents().forEach((ev) => {
                    ev.setProp('backgroundColor', '#3788d8');
                    ev.setProp('borderColor', '#4798e8');                   
                });
                eventIdentifier = info.event.id;
                // change the border color just for fun
                info.el.style.borderColor = 'red';
                info.el.style.backgroundColor = 'purple';
                
                //alert('Event(' + eventIdentifier +'): ' + info.event.title + ' - starting: ' + info.event.start);
            }
        });
        TECalendar.render();
    },
    addNewEvent: function (desc) {
        id = id + 1;
        var timeStamp = '';
        if (selStartDate && selEndDate) {
            if (selStartDate.indexOf('T') === -1) // no time included
                timeStamp = 'T00:00:00';
            else {
                selStartDate.replace('-04:00', '');
                selEndDate.replace('-04:00', '');
            }

            TECalendar.addEvent({ title: '[' + id.toString() + '] ' + desc, start: new Date(selStartDate + timeStamp), end: new Date(selEndDate + timeStamp), allDay: false, id: id.toString() });
            alert('Celebrating ' + desc + ' from ' + selStartDate + ' thru ' + selEndDate + '! There will be much drinking!');
        } else {
            alert('Select a time period before adding the event!');
        }
        selEndDate = "";
        selStartDate = "";
    }
    ,
    removeEvent: function (desc) {
        if (eventIdentifier) {
            var event = TECalendar.getEventById(eventIdentifier);
            if (event) {
                alert('Removing "' + event.title + '" from ' + event.start + ' thru ' + event.end + '! There was much drinking!');
                event.remove();
            } else {
                alert('Something went awry. That event could not be found. Did ya select one?!?')
            }
        }
        eventIdentifier = ''
    }
};