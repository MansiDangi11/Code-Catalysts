const calendarContainer = document.querySelector(".calendar-container");


function createMonth(year, month){


    const monthCard = document.createElement("div");

    monthCard.classList.add("month-card");


    const monthName = new Date(year, month)
        .toLocaleString("default", {
            month:"long",
            year:"numeric"
        });



    monthCard.innerHTML = `

        <h2>${monthName}</h2>

        <div class="weekdays">

            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>

        </div>


        <div class="days">

        </div>

    `;



    const daysContainer = monthCard.querySelector(".days");



    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();



    // empty spaces before first day

    let offset = firstDay === 0 ? 6 : firstDay - 1;


    for(let i=0; i<offset; i++){

        daysContainer.innerHTML += `<div></div>`;

    }



    for(let day = 1; day <= totalDays; day++){

    const fullDate =
        `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

    daysContainer.innerHTML += `

        <div class="day" data-date="${fullDate}">
            ${day}
        </div>

    `;

}



    calendarContainer.appendChild(monthCard);

    monthCard.querySelectorAll(".day").forEach(function(day){

    day.addEventListener("click", function(){

        const selectedDate = day.dataset.date;

        window.location.href =
            `journal.html?date=${selectedDate}`;

    });

});


}



const today = new Date();

for(let i = 0; i < 12; i++){

    const date = new Date(
        today.getFullYear(),
        today.getMonth() - i,
        1
    );

    createMonth(
        date.getFullYear(),
        date.getMonth()
    );

}

const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", function(){

    window.location.href = "Dashboard.html";

});


async function markJournalDates(){

    const { data: { user } } = await supabaseClient.auth.getUser();

    if(!user) return;

    const { data, error } = await supabaseClient
        .from("journal_entries")
        .select("entry_date")
        .eq("user_id", user.id);

    if(error){

        console.log(error);
        return;

    }

    data.forEach(function(entry){

        const day = document.querySelector(
            `[data-date="${entry.entry_date}"]`
        );

        if(day){

            day.classList.add("has-entry");

        }

    });

}

markJournalDates();