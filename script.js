let time = document.getElementById("time");
let dateInput = document.getElementById("alarmdate");
let timeInput = document.getElementById("alarmtime");
let set = document.getElementById("setalarm");
let contain = document.getElementById("alarms");
let alarmSound = document.getElementById("alarmSound");
let interVal;
let maxValue = 3;
let cnt = 0;
let alarmTimeArray = [];

function timeChangeFunction() {
    let current = new Date();
    let hrs = current.getHours();
    let min = String(current.getMinutes()).padStart(2, "0");
    let sec = String(current.getSeconds()).padStart(2, "0");
    let period = "AM";

    if (hrs >= 12) {
        period = "PM";
    }
    if (hrs > 12) {
        hrs -= 12;
    }

    // Update the time display on the clock
    time.textContent = `${hrs}:${min}:${sec} ${period}`;
}

function alarmSetFunction() {
    let now = new Date();
    let selectedDate = new Date(dateInput.value + "T" + timeInput.value);

    if (selectedDate <= now) {
        alert("Invalid time. Please select a future date and time.");
        return;
    }
    if (alarmTimeArray.includes(selectedDate.toString())) {
        alert(`You can't set multiple alarms for the same time.`);
        return;
    }

    if (cnt < maxValue) {
        let timeUntilAlarm = selectedDate - now;
        let alarmDiv = document.createElement("div");
        alarmDiv.classList.add('alarm');
        alarmDiv.innerHTML = `<span>${selectedDate.toLocaleString()}</span>
                              <button class="delete-alarm">Delete</button>`;

        alarmDiv.querySelector(".delete-alarm").addEventListener("click", () => {
            alarmDiv.remove();
            cnt--;
            clearTimeout(interVal);
            const idx = alarmTimeArray.indexOf(selectedDate.toString());
            if (idx !== -1) {
                alarmTimeArray.splice(idx, 1);
            }
        });

        interVal = setTimeout(() => {
            alarmSound.play(); 
            alert('Time to wake up!');
            alarmDiv.remove();
            cnt--;

            const alarmIndex = alarmTimeArray.indexOf(selectedDate.toString());
            if (alarmIndex !== -1) {
                alarmTimeArray.splice(alarmIndex, 1);
            }
        }, timeUntilAlarm);

        cnt++;
        alarmTimeArray.push(selectedDate.toString());
        contain.appendChild(alarmDiv);
    } else {
        alert(`You can only set a maximum of ${maxValue} alarms.`);
    }
}

// Initialize the clock and set up event listeners
setInterval(timeChangeFunction, 1000);
set.addEventListener("click", alarmSetFunction);
timeChangeFunction();
