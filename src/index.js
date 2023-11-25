import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = ref;

hideElement(loader);
hideElement(error);
hideElement(divCatInfo);

async function init() {
  try {
    const data = await fetchBreeds();
    const arrBreedsId = data.map(element => ({
      text: element.name,
      value: element.id,
    }));
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
  } catch (error) {
    onFetchError(error);
  }
}

selector.addEventListener('change', onSelectBreed);

async function onSelectBreed(event) {
  showElement(loader);
  hideElement(selector);
  hideElement(divCatInfo);

  const breedId = event.currentTarget.value;
  try {
    const data = await fetchCatByBreed(breedId);
    const { url, breeds } = data[0];

    divCatInfo.innerHTML = `<div><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
    showElement(divCatInfo);
  } catch (error) {
    onFetchError(error);
  } finally {
    hideElement(loader);
    showElement(selector);
  }
}

function onFetchError(error) {
  showElement(selector);
  hideElement(loader);

  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-center',
    timeout: 5000,
    width: '500px',
    fontSize: '32px',
  });

  hideElement(loader);
}

function showElement(element) {
  element.classList.remove('is-hidden');
}

function hideElement(element) {
  element.classList.add('is-hidden');
}

init();
