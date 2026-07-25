

const bloomImage = document.querySelector(".bloom-image");

const bloomPopup = document.querySelector(".bloom-popup");


bloomImage.addEventListener("click", function(){

    bloomPopup.style.display = 
    bloomPopup.style.display === "block" 
    ? "none" 
    : "block";

});


async function loadHabits(){

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();


    if(userError || !user){

        console.log("No user");

        return;

    }


    const { data, error } = await supabaseClient
.from("habits")
.select(`
    *,
    habits_logs(
        date,
        completed
    )
`)
.eq("user_id", user.id);



    console.log("Habits:", data);



    if(error){

        console.log(error);

        return;

    }


    const habitList = document.getElementById("habitList");


    habitList.innerHTML = "";

console.log("Rendering:", habitList);

const today = new Date()
.toISOString()
.split("T")[0];


    data.forEach((habit)=>{

        console.log("Adding:", habit.habit_name);


        const habitItem = document.createElement("div");

        habitItem.classList.add("habit-item");


        habitItem.innerHTML = `

    <span>
        🌸 ${habit.habit_name}
    </span>

    <button 
class="habit-circle ${habit.habits_logs?.some(log => log.date === today && log.completed) ? "completed" : ""}"
data-id="${habit.id}">
</button>

`;




        habitList.appendChild(habitItem);


    });


}


loadHabits();


const addHabitBtn = document.getElementById("addHabitBtn");

const habitPopup = document.getElementById("habitPopup");

const saveHabitBtn = document.getElementById("saveHabitBtn");

const habitInput = document.getElementById("habitInput");



addHabitBtn.addEventListener("click", ()=>{

    habitPopup.style.display="flex";

});




saveHabitBtn.addEventListener("click", async ()=>{


    const habitName = habitInput.value.trim();


    if(!habitName){

        return;

    }



    const { data:{user}, error:userError } = await supabaseClient.auth.getUser();



    if(userError || !user){

        console.log("No user");

        return;

    }



    const { error } = await supabaseClient
    .from("habits")
    .insert({

        user_id:user.id,

        habit_name:habitName

    });



    if(error){

        console.log("Insert error:", error);

        return;

    }



    // clear input

    habitInput.value="";


    // close popup

    habitPopup.style.display="none";



    // success message

    const success = document.getElementById("habitSuccess");


    success.style.display="block";



    setTimeout(()=>{

        success.style.display="none";

    },3000);



    // reload habits

    loadHabits();


});


document.addEventListener("click", async function(e){


    if(e.target.classList.contains("habit-circle")){


        const button = e.target;

        const habitId = button.dataset.id;


        const today = new Date()
        .toISOString()
        .split("T")[0];



        const { error } = await supabaseClient
        .from("habits_logs")
        .insert({

            habit_id: habitId,

            date: today,

            completed: true

        });



        if(error){

            console.log("Habit log error:", error);

            return;

        }



        console.log("Habit completed 🌸");


        button.classList.add("completed");


    }


});


async function loadDayHabits(date){


    const { data, error } = await supabaseClient
    .from("habits_logs")
    .select(`
        completed,
        habits(
            habit_name
        )
    `)
    .eq("date", date);



    if(error){

        console.log(error);

        return;

    }



    const list = document.getElementById("dayHabitList");

    list.innerHTML="";


    data.forEach((log)=>{


        const item = document.createElement("div");


        item.innerHTML = `

        ${log.completed ? "🌸" : "○"}

        ${log.habits.habit_name}

        `;


        list.appendChild(item);


    });


}

document.addEventListener("click", function(e){

    if(e.target.classList.contains("calendar-day")){

        const selectedDate = e.target.dataset.date;

        console.log("Clicked:", selectedDate);

        document.getElementById("selectedDate").innerText =
        selectedDate;

        loadDayHabits(selectedDate);

    }

});

const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", function(){

    window.location.href = "dashboard.html";

});