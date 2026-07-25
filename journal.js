// =========================
// JOURNAL EDITOR
// =========================

// (We'll add journal features here later)


// =========================
// TOOLBAR
// =========================

const toolPanel = document.getElementById("toolPanel");
const panelTitle = document.getElementById("panelTitle");
const panelOptions = document.getElementById("panelOptions");

const menus = {

    pageBtn: {
        title: "Page Style",
        options: ["Blank", "Lined", "Dotted", "Grid"]
    },

    fontBtn: {
        title: "Font",
        options: ["Cormorant Garamond", "Poppins", "Nunito", "Caveat"]
    },

    sizeBtn: {
        title: "Font Size",
        options: ["Small", "Medium", "Large", "Extra Large"]
    },

    themeBtn: {
        title: "Theme",
        options: ["Cream", "Blush", "Vintage", "Midnight"]
    },

    promptBtn: {
        title: "Writing Prompt",
        options: ["✨ Generate Prompt"]
    },

    bloomBtn: {
        title: "Bloom",
        options: ["🌸 Start Chat"]
    }

};

// Add click event to every toolbar button

Object.keys(menus).forEach(function(id){

    const button = document.getElementById(id);

    button.addEventListener("click", function(event){

        event.stopPropagation();

        panelTitle.textContent = menus[id].title;

        panelOptions.innerHTML = "";

        menus[id].options.forEach(function(option){

            panelOptions.innerHTML +=
            `<button class="panel-option">${option}</button>`;

        });

        toolPanel.style.display = "block";

    });

});


// Close panel when clicking outside

document.addEventListener("click", function(event){

    if(
        !toolPanel.contains(event.target) &&
        !event.target.classList.contains("tool-btn")
    ){

        toolPanel.style.display = "none";

    }

});




const params = new URLSearchParams(window.location.search);

const selectedDate =
    params.get("date") ||
    new Date().toISOString().split("T")[0];







const saveBtn = document.getElementById("saveJournal");
const editor = document.querySelector(".journal-editor");


saveBtn.addEventListener("click", async () => {


    const content = editor.innerText.trim();


    if(content === ""){

        alert("Write something first 🌸");
        return;

    }


    const { data: { user } } = await supabaseClient.auth.getUser();



// Check if today's entry already exists




const { error } = await supabaseClient
    .from("journal_entries")
    .upsert(
        {
            user_id: user.id,
            content: content,
            entry_date: selectedDate
        },
        {
            onConflict: "user_id,entry_date"
        }
    );


if(error){

    console.log(error);

}else{

    showSaveMessage();

}


});

function showSaveMessage(){

    const message = document.getElementById("saveMessage");


    message.classList.add("show");


    setTimeout(()=>{

        message.classList.remove("show");

    },3000);

}





async function loadJournal() {

    const { data: { user } } = await supabaseClient.auth.getUser();

    const { data, error } = await supabaseClient
        .from("journal_entries")
        .select("content")
        .eq("user_id", user.id)
        .eq("entry_date", selectedDate)
        .single();


    if(error){

        console.log(error);
        return;

    }


    if(data){

        editor.innerText = data.content;

    }

}

loadJournal();
