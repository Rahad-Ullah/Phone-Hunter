const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')

    // Clear Container
    phoneContainer.textContent = ''

    // Display Show All Button if there are more than 12 items
    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length < 12){
        showAllBtn.classList.add('hidden');
    }
    else{
        showAllBtn.classList.remove('hidden');
    }

    // Show only some phone 
    phones = phones.slice(0, 12)

    phones.forEach(phone => {
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card bg-base-100 border rounded-md text-primary p-6'
        phoneCard.innerHTML = `
        <figure class=" bg-[#0D6EFD0D] h-72 flex w-full justify-center items-center p-8 rounded-lg">
            <img src="${phone.image}" alt="${phone.phone_name}" class="rounded-xl w-3/5" />
        </figure>
        <div class="card-body items-center text-center pb-0">
            <h4 class="text-xs">${phone.brand}</h4>
            <h2 class="card-title font-bold mb-4">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <p class="font-bold text-xl">$<span>999</span></p>
            <div class="card-actions">
                <button class="btn btn-ghost text-white bg-primary hover:bg-blue-500 normal-case">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
}


// Handle Search
const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText)
}

loadPhone('Apple');