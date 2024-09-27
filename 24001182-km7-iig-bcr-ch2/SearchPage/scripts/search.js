const carsContent = document.getElementById("cars-content");
const searchBtn = document.getElementById("search-btn");
const driverSelect = document.getElementById("driver-select");
const capacitySelect = document.getElementById("capacity-select");
const dateSelect = document.getElementById("date-select");
const timeSelect = document.getElementById("time-select");

// Function to generate a random date and time
function getRandomAvailableDate() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const randomDate = new Date(
    today.getTime() + Math.random() * (nextWeek.getTime() - today.getTime())
  );

  //format date yyyy-mm-dd, hh:mm
  const formattedDate = randomDate.toISOString().split("T")[0];
  const formattedTime = randomDate.toTimeString().slice(0, 5);

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

const getCarsData = async () => {
  const response = await fetch("./data/cars.json");
  const data = await response.json();

  data.forEach((car) => {
    const availableAt = getRandomAvailableDate();
    car.availableDate = availableAt.date;
    car.availableTime = availableAt.time;
  });

  return data;
};

function displayCars(cars) {
  let carsContentHTML = "";

  cars.forEach((car) => {
    const carHTML = `
      <div class="col-lg-3 col-md-4 d-flex justify-content-center">
        <div class="card" style="width: 18rem; margin-bottom: 20px;">
          <img src="${car.image}" class="card-img-top" alt="${car.model}" style="height: 200px; object-fit: cover;" />
          <div class="card-body">
            <h6 class="card-title">${car.manufacture}/${car.model}</h6>
            <h5>Rp.${car.rentPerDay} / hari</h5>
            <p class="card-text">
              Available at: ${car.availableDate}, ${car.availableTime} WIB <br />
              <i class="fas fa-car"></i>  ${car.type} <br />
              <i class="fas fa-cogs"></i> ${car.transmission} <br />
              <i class="fas fa-users"></i>  ${car.capacity} penumpang <br />
              <i class="fas fa-calendar-alt"></i> ${car.year}
            </p>
            <a href="#" class="btn btn-primary" style="background-color: #5cb85f";>Sewa Sekarang</a>
          </div>
        </div>
      </div>
    `;
    carsContentHTML += carHTML;
  });

  carsContent.innerHTML = carsContentHTML;
}

/*Display all cars on page load (remove comment to see or display all cars before searching)
async function displayAllCars() {
  const data = await getCarsData();
  displayCars(data); // Show all cars initially
}
displayAllCars();*/

//To make the submit button disabled when the requirement not met
function areRequiredFieldsSelected() {
  return driverSelect.value && dateSelect.value && timeSelect.value;
}

function toggleSearchButton() {
  searchBtn.disabled = !areRequiredFieldsSelected();
}

driverSelect.addEventListener("change", toggleSearchButton);
dateSelect.addEventListener("change", toggleSearchButton);
timeSelect.addEventListener("change", toggleSearchButton);

toggleSearchButton();

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchCarsContent();
});

//Search function (Click more than once if no car available, since the date keep changing every reload/submit)
async function searchCarsContent() {
  const data = await getCarsData();
  const selectedCapacity = capacitySelect.value;
  const selectedDate = dateSelect.value;
  const selectedTime = timeSelect.value;

  let filteredCars = data.filter((car) => {
    const isSameDate = car.availableDate === selectedDate;
    const isEarlierOrEqualTime = car.availableTime <= selectedTime;

    if (isSameDate && isEarlierOrEqualTime) {
      if (!selectedCapacity || car.capacity >= parseInt(selectedCapacity)) {
        return true;
      }
    }
    return false;
  });

  if (filteredCars.length === 0) {
    carsContent.innerHTML = `<h1>No available cars found!</h1>`;
    return;
  }

  displayCars(filteredCars);
}
