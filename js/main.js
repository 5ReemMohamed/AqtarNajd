window.onload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const langSwitchBtn = document.getElementById('langSwitch');
  const translatableElements = document.querySelectorAll('[data-en][data-ar]');

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("UserName");
  const emailInput = document.getElementById("UserEmail");
  const messageInput = document.getElementById("message");
  const serviceSelect = document.getElementById("service");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const serviceError = document.getElementById("serviceError");

  const successMessage = document.getElementById("formSuccess");

const scrollToTopBtn = document.getElementById("scrollToTopBtn");


window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "flex"; 
  } else {
    scrollToTopBtn.style.display = "none"; 
  }
});


scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
const phoneToggleBtn = document.getElementById("phoneToggleBtn");
const phoneDropdown = document.getElementById("phoneDropdown");


phoneToggleBtn.addEventListener("click", () => {
  phoneDropdown.style.display = phoneDropdown.style.display === "flex" ? "none" : "flex";
});


document.addEventListener("click", (e) => {
  if (!phoneToggleBtn.contains(e.target) && !phoneDropdown.contains(e.target)) {
    phoneDropdown.style.display = "none";
  }
});

  let validationErrors = {
    name: false,
    email: false,
    message: false,
    service: false
  };

  function updatePlaceholders(lang) {
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        const placeholder = input.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) input.placeholder = placeholder;
      }
    });
  }

  function updateErrorMessages(lang) {
    const isRTL = lang === 'ar';

    if (validationErrors.name) {
      nameError.innerHTML = isRTL ? "الاسم يجب أن يكون على الأقل 3 أحرف." : "Name must be at least 3 characters.";
    }

    if (validationErrors.email) {
      emailError.innerHTML = isRTL ? "يرجى إدخال بريد إلكتروني صالح." : "Please enter a valid email.";
    }

    if (validationErrors.message) {
      messageError.innerHTML = isRTL ? "يجب أن تكون الرسالة 10 أحرف على الأقل." : "Message must be at least 10 characters.";
    }

    if (validationErrors.service) {
      serviceError.innerHTML = isRTL ? "يرجى اختيار خدمة." : "Please select a service.";
    }
  }

langSwitchBtn.addEventListener('click', () => {
  const currentLang = langSwitchBtn.getAttribute('data-lang');
  const newLang = currentLang === 'ar' ? 'en' : 'ar';

  translatableElements.forEach(el => {
    const icon = el.querySelector('i');
    const text = el.getAttribute(`data-${newLang}`);

    if (icon) {
      
      el.innerHTML = '';
      el.appendChild(icon);
      el.append(' ' + text);
    } else {
      el.innerHTML = text;
    }
  });

  
  langLabel.textContent = newLang === 'ar' ? 'EN' : 'AR';
  langSwitchBtn.setAttribute('data-lang', newLang);

  
  document.documentElement.setAttribute('lang', newLang);
  document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.style.textAlign = newLang === 'ar' ? 'right' : 'left';

  updatePlaceholders(newLang);
  updateErrorMessages(newLang);
}); 

  function validateAll() {
    let isValid = true;
    const dir = document.documentElement.getAttribute('dir');
    const isRTL = dir === 'rtl';

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';
    const service = serviceSelect?.value || '';

    if (name.length < 3) {
      validationErrors.name = true;
      nameError.innerHTML = isRTL ? "الاسم يجب أن يكون على الأقل 3 أحرف." : "Name must be at least 3 characters.";
      isValid = false;
    } else {
      validationErrors.name = false;
      nameError.innerHTML = "";
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      validationErrors.email = true;
      emailError.innerHTML = isRTL ? "يرجى إدخال بريد إلكتروني صالح." : "Please enter a valid email.";
      isValid = false;
    } else {
      validationErrors.email = false;
      emailError.innerHTML = "";
    }

    if (message.length < 10) {
      validationErrors.message = true;
      messageError.innerHTML = isRTL ? "يجب أن تكون الرسالة 10 أحرف على الأقل." : "Message must be at least 10 characters.";
      isValid = false;
    } else {
      validationErrors.message = false;
      messageError.innerHTML = "";
    }

    if (!service) {
      validationErrors.service = true;
      serviceError.innerHTML = isRTL ? "يرجى اختيار خدمة." : "Please select a service.";
      isValid = false;
    } else {
      validationErrors.service = false;
      serviceError.innerHTML = "";
    }

    return isValid;
  }

  [nameInput, emailInput, messageInput, serviceSelect].forEach(input => {
    if (input) {
      input.addEventListener("input", validateAll);
      input.addEventListener("change", validateAll);
    }
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

      if (validateAll()) {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
          service: serviceSelect.value
        };

        localStorage.setItem("contactFormData", JSON.stringify(formData));

        if (successMessage) {
          successMessage.innerHTML = isRTL ? "تم إرسال الرسالة بنجاح." : "Message sent successfully.";
          successMessage.classList.remove("d-none");
        }

        form.reset();
        validationErrors = { name: false, email: false, message: false, service: false };

        setTimeout(() => {
          if (successMessage) successMessage.classList.add("d-none");
        }, 3000);
      } else {
        if (successMessage) successMessage.classList.add("d-none");
      }
    });
  }

  // AOS Init
  AOS.init({
    offset: 120,
    duration: 1000,
    easing: 'ease-in-out',
  });
});
