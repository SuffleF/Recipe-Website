//Main page

//Responsive Nav and Button
const burgerButton = document.getElementById('burgerButton')
const burgerMenu = document.getElementById('burgerMenu')
const longNav = document.getElementById('longNav')
const line1 = document.getElementById('line1')
const line2 = document.getElementById('line2')
const line3 = document.getElementById('line3')
const line4 = document.getElementById('line4')
const line5 = document.getElementById('line5')
const closeSide = document.getElementById('closeSide')

burgerButton.addEventListener('click', () => {

  if(burgerMenu.classList == 'invisible') {
    burgerMenu.classList.toggle('visible')
  }

  else{
    burgerMenu.classList.toggle('invisible')
  }

  line1.classList.toggle('translate-x-10')
  line2.classList.toggle('translate-x-10')
  line3.classList.toggle('translate-x-10')
  line4.classList.toggle('rotate-45')
  line5.classList.toggle('-rotate-45')
  closeSide.classList.toggle('translate-x-0')
  burgerMenu.classList.toggle('translate-y-0')
  burgerMenu.classList.toggle('scale-100')
  burgerMenu.style.transition = 'all 400ms ease-in-out'
})

//Search Button and Content
const searchButton = document.querySelectorAll('.searchButton')
const searchContent = document.getElementById('searchContent')
const searchForm = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')

searchForm.style.transform = 'scale(0)'
searchContent.style.visibility = 'hidden'

searchButton.forEach(button => {
  button.addEventListener('click', () => {
    if(searchContent.style.visibility = 'hidden') {
      searchContent.style.visibility = 'visible'
      searchForm.style.transition = 'all 300ms ease-in-out'
      searchForm.style.transform = 'scale(1)'
      searchInput.value = ''
      searchContent.addEventListener('transitionend', () => {
      searchInput.focus();
      });
    }
  })
})

searchContent.addEventListener('click', (e) => {
  if(e.target !== e.currentTarget ) return 
  searchContent.style.visibility = 'hidden'
  searchForm.style.transition = 'all 300ms ease-in-out'
  searchForm.style.transform = 'scale(0)'
})

searchButton.forEach(button => {
  button.addEventListener('click', () => {
    searchContent.addEventListener('wheel', (event) => {
      event.preventDefault()
    }, 
    { passive: false })

    searchContent.addEventListener('touchmove', (event) => {
      event.preventDefault()
    }, 
    { passive: false })
  })
})

//---------------------------------------------------------------------------------------------------------------

//Submit-recipe Page

    //Selected image name
    function uploadFile(target) {
        document.getElementById("fileLabel").innerHTML = target.files[0].name;
    }

    //Add ingredient
    const ingredientList = document.getElementById('ingredientList')
    const ingredientInput = document.getElementById('ingredientInput')

    const ingredientTemplate = (ingredient, id) => 
    `
    <li class="ingredientContainer text-gray-400 mt-2 list-none" id="ingredient-${id}">
        <div class="flex justify-between bg-[#181920] rounded-md py-3 px-1">
            <span class="w-full text-left font-medium text-base ml-3 space-x-1"> 
                <span>${ingredient.trim()}</span>
            </span>
            <div class="deleteButton flex items-center mr-1 text-xl cursor-pointer hover:text-gray-300 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"/></svg>
            </div>
        </div>
    </li>
    `

    const newIngredient = () => {
        if (!ingredientInput.value){
            ingredientWarning.style.display = 'block';
            return false;
        } else {
            ingredientWarning.style.display = 'none';
        }

        // Add ingredient data to an array
        const ingredientContent = ingredientInput.value.trim()
        const ingredientArray = ingredientList.dataset.ingredients ? toString(ingredientList.dataset.ingredients) : []
        ingredientArray.push(ingredientContent)

        // Convert ingredients to JSON object
        const ingredientData = ingredientArray

        // Append JSON data to a hidden input element
        const ingredientInputHidden = document.createElement('input')
        ingredientInputHidden.type = 'hidden'
        ingredientInputHidden.name = 'ingredientData'
        ingredientInputHidden.value = ingredientData
        document.getElementById('form').appendChild(ingredientInputHidden)

        // Get the id of the last item and add one to create the next id.
        const id = ingredientList.lastElementChild ? parseInt(ingredientList.lastElementChild.id.slice(5)) + 1 : 1

        ingredientList.insertAdjacentHTML('beforeend', ingredientTemplate(ingredientContent, id))

        const deleteButton = ingredientList.lastElementChild.querySelector('.deleteButton')
        deleteButton.addEventListener('click', () => deleteIngredient(id))

        ingredientInput.value = ''
    }

    const deleteIngredient = (id) => {  
        const ingredientContainer = document.querySelector(`#ingredient-${id}`)
        ingredientContainer.remove()
    }

    //Add steps
    const stepList = document.getElementById('stepList')
    const stepInput = document.getElementById('stepInput')

    const stepTemplate = (step, id) => 
    `
    <li class="stepContainer text-gray-400 mt-2 list-none" id="step-${id}">
        <div class="flex justify-between bg-[#181920] rounded-md py-3 px-1">
            <span class="w-full text-left font-medium text-base ml-3 space-x-1"> 
                <span class="list">${step.trim()}</span>
            </span>
            <div class="deleteButton flex items-center mr-1 text-xl cursor-pointer hover:text-gray-300 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"/></svg>
            </div>
        </div>
    </li>
    `

    const newStep = () => {
        if (!stepInput.value){
            stepWarning.style.display = 'block'
            return false
        } else {
            stepWarning.style.display = 'none'
        }

        // Add step data to an array
        const stepContent = stepInput.value.trim()
        const stepArray = stepList.dataset.steps ? toString(stepList.dataset.steps) : []
        stepArray.push(stepContent)

        // convert steps to JSON object
        const stepData = stepArray

        // Append JSON data to a hidden input element
        const stepInputHidden = document.createElement('input')
        stepInputHidden.type = 'hidden'
        stepInputHidden.name = 'stepData'
        stepInputHidden.value = stepData
        document.getElementById('form').appendChild(stepInputHidden)

        // Get the id of the last item and add one to create the next id.
        const id = stepList.lastElementChild ? parseInt(stepList.lastElementChild.id.slice(5)) + 1 : 1

        stepList.insertAdjacentHTML('beforeend', stepTemplate(stepContent, id))

        const deleteButton = stepList.lastElementChild.querySelector('.deleteButton')
        deleteButton.addEventListener('click', () => deleteStep(id))

        stepInput.value = ''
    }

    const deleteStep = (id) => {  
        const stepContainer = document.querySelector(`#step-${id}`)
        stepContainer.remove()
    }