import throttle from 'lodash.throttle';
import storage from './storage';
const LOCAL_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.js-feedback-form'),
};

initForm();
refs.form.addEventListener('submit', onFormSubmit); //слушатель на отправку данных submit
refs.form.addEventListener('input', throttle(handleInput, 500)); //слушатель на окна ввода данных input

function onFormSubmit(evt) {
  //не дает перезагружаться странице
  evt.preventDefault();

  //очищает поля ввода после отправки сообщения
  evt.currentTarget.reset();

  //очищает localStorage от того, что там
  // сохраняется на случай перезагрузки страницы
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

//записывает значение которое ввели в localStorage
function handleInput(evt) {
  let saveData = storage.load(LOCAL_STORAGE_KEY);
  if (!saveData) {
    saveData = {};
  }
  const { name, value } = evt.target;
  saveData[name] = value;
  storage.save(LOCAL_STORAGE_KEY, saveData);
}

function initForm() {
  const saveData = storage.load(LOCAL_STORAGE_KEY);

  if (saveData) {
    refs.form.elements.name = saveData.name;
    Object.entries(saveData).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}
