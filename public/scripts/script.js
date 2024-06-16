const listingsData = [
  { title: "test", price: 1234, location: "Tarnów", phone: 123321345},
];

let currentEditIndex = -1;
  
function generateListingHTML(listing) {
  return `
    <div class="listing">
      <h3>${listing.title}</h3>
      <p>Cena: ${listing.price ? `${listing.price} zł` : "Do negocjacji"}</p>
      <p>Lokalizacja: ${listing.location}</p>
      <p>Numer telefonu: ${listing.phone}</p>
      <button class="delete-btn">Usuń</button>
    </div>
  `;
}
  
function displayListings() {
  const listingsContainer = document.getElementById("listings");
  let listingsHTML = "";
  listingsData.forEach(listing => {
    listingsHTML += generateListingHTML(listing);
  });
  listingsContainer.innerHTML = listingsHTML;

  const listingElements = document.querySelectorAll('.listing');
  listingElements.forEach(div => {
    div.addEventListener('click', () => {
      div.classList.toggle('zoomed');
    });
  });

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); 
      const index = button.parentElement.getAttribute('data-index');
      deleteListing(index);
    });
  });
}

function editListing(index) {
  currentEditIndex = index;
  const listing = listingsData[index];
  document.getElementById('listingTitle').value = listing.title;
  document.getElementById('listingPrice').value = listing.price;
  document.getElementById('listingLocation').value = listing.location;
  document.getElementById('listingPhone').value = listing.phone;
  document.getElementById('formContainer').style.display = 'block';
}

function saveListing() {
  const title = document.getElementById('listingTitle').value;
  const price = document.getElementById('listingPrice').value;
  const location = document.getElementById('listingLocation').value;
  const phone = document.getElementById('listingPhone').value;
  
  if (currentEditIndex >= 0) {
    listingsData[currentEditIndex] = { title, price: Number(price), location, phone };
    currentEditIndex = -1;
  } else {
    listingsData.push({ title, price: Number(price), location, phone });
  }

  displayListings();
  document.getElementById('formContainer').style.display = 'none';
}

function addNewListing() {
  currentEditIndex = -1;
  document.getElementById('listingTitle').value = '';
  document.getElementById('listingPrice').value = '';
  document.getElementById('listingLocation').value = '';
  document.getElementById('listingPhone').value = '';
  document.getElementById('formContainer').style.display = 'block';
}

function cancelEdit() {
  document.getElementById('formContainer').style.display = 'none';
}

function deleteListing(index) {
  listingsData.splice(index, 1);
  displayListings();
}

window.addEventListener("load", () => {
  displayListings();

  const addListingBtn = document.getElementById("addListingBtn");
  addListingBtn.addEventListener("click", addNewListing);

  const saveListingBtn = document.getElementById("saveListingBtn");
  saveListingBtn.addEventListener("click", saveListing);

  const cancelBtn = document.getElementById("cancelBtn");
  cancelBtn.addEventListener("click", cancelEdit);
  
});

