// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


// Функція для форматування чисел менше 10 з додаванням ведучих нулів
function addLeadingZero(value) {
    return value < 10 ? "0" + value : value;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const datePicker = flatpickr("#datetime-picker", {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate < new Date()) {
          iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
          });
          document.querySelector('[data-start]').disabled = true;
        } else {
          document.querySelector('[data-start]').disabled = false;
        }
      }
    });
  
    document.querySelector('[data-start]').addEventListener('click', () => {
      const selectedDate = datePicker.selectedDates[0];
      const now = new Date();
      if (selectedDate < now) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
        return;
      }
  
      document.querySelector('[data-start]').disabled = true;
      datePicker.destroy();
  
      const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = selectedDate - now;
  
        if (distance <= 0) {
          clearInterval(timerInterval);
          iziToast.success({
            title: 'Success',
            message: 'Countdown completed!',
          });
          return;
        }
  
        const { days, hours, minutes, seconds } = convertMs(distance);
  
        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
      }, 1000);
    });
  });
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }



  