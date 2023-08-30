const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    validateSearch(phones);
    displayPhones(phones, isShowAll);
}

const validateSearch = (phones) => {
    const invalidSearch = document.getElementById('invalid-search');
    if(phones.length < 1){
        toggleLoadingSpinner(false);
        invalidSearch.classList.remove('hidden')
    }
    else{
        invalidSearch.classList.add('hidden');
    }
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')

    // Clear Container
    phoneContainer.textContent = ''

    // Display Show All Button if there are more than 12 items
    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }

    // Show only 12 phone 
    if(!isShowAll){
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card bg-base-100 border rounded-xl text-primary p-6'
        phoneCard.innerHTML = `
        <figure class=" bg-[#0D6EFD0D] h-72 flex w-full justify-center items-center p-8 rounded-lg">
            <img src="${phone.image}" alt="${phone.phone_name}" class="rounded-xl w-3/5" />
        </figure>
        <div class="card-body items-center text-center pb-0">
            <h4 class="text-sm">${phone.brand}</h4>
            <h2 class="card-title font-bold mb-4">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <p class="font-bold text-xl">$<span>999</span></p>
            <div class="card-actions">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-ghost text-white bg-primary hover:bg-blue-500 normal-case">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

// handle Show detail
const handleShowDetail = async (id) => {
    console.log('clicked', id)
    // Load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const madalDialogue = document.getElementById('show_details_modal')
    madalDialogue.innerHTML = `
    <form method="dialog" class="modal-box">
        <figure class="bg-[#0D6EFD0D] h-72 rounded-lg flex w-full justify-center items-center p-8">
            <img src="${phone.image}" alt="" class="w-2/5">
        </figure>
        <h3 class="font-bold text-lg mt-6">${phone.name}</h3>
        <p class="py-4 text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="py-2"><span class="font-semibold">Storage :</span> ${phone.mainFeatures?.storage || 'No data found'}</p>
        <p class="py-2"><span class="font-semibold">Display Size :</span> ${phone.mainFeatures?.displaySize  || 'No data found'}</p>
        <p class="py-2"><span class="font-semibold">Chipset :</span> ${phone.mainFeatures?.chipSet  || 'No data found'}</p>
        <p class="py-2"><span class="font-semibold">Memory :</span> ${phone.mainFeatures?.memory  || 'No data found'}</p>
        <p class="py-2"><span class="font-semibold">Slug :</span> ${phone.slug  || 'No data found'}</p>
        <div class="modal-action justify-center">
            <button class="btn btn-outline">Close</button>
        </div>
    </form>
    `


    // show the modal
    show_details_modal.showModal()
}


// Handle Search
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll)
}


//  Toggle Loading Spinner
const toggleLoadingSpinner = (isToggle) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isToggle){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}


// handleShowAll
const handleShowAll = () => {
    handleSearch(true)
}

loadPhone('Apple');