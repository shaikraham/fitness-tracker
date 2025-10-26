const form = document.getElementById("fitnessForm");
const activityList = document.getElementById("activityList");
const totalSteps = document.getElementById("totalSteps");
const totalCalories = document.getElementById("totalCalories");
const progressBar = document.getElementById("progressBar");

let activities = JSON.parse(localStorage.getItem("activities")) || [];

function renderActivities() {
  activityList.innerHTML = "";
  let steps = 0, calories = 0;

  activities.forEach((act, index) => {
    steps += act.steps;
    calories += act.calories;

    const li = document.createElement("li");
    li.innerHTML = `
      ${act.workout} - ${act.steps} steps, ${act.calories} cal
      <button onclick="deleteActivity(${index})">❌</button>
    `;
    activityList.appendChild(li);
  });

  totalSteps.textContent = steps;
  totalCalories.textContent = calories;

  let progress = Math.min((steps / 10000) * 100, 100);
  progressBar.style.width = progress + "%";

  localStorage.setItem("activities", JSON.stringify(activities));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const steps = parseInt(document.getElementById("steps").value);
  const calories = parseInt(document.getElementById("calories").value);
  const workout = document.getElementById("workout").value;

  activities.push({ steps, calories, workout });
  form.reset();
  renderActivities();
});

function deleteActivity(index) {
  activities.splice(index, 1);
  renderActivities();
}

renderActivities();