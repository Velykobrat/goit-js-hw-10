// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();

  const delayInput = this.elements['delay'];
  const stateInput = this.elements['state'];
  const delay = parseInt(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then((delay) => {
    iziToast.success({
      title: 'Success',
      message: `✅ Fulfilled promise in ${delay}ms`,
    });
  }).catch((delay) => {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
    });
  });

  delayInput.value = '';
});
