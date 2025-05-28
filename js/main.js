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
  const phoneInput = document.getElementById("UserPhone");
  const messageInput = document.getElementById("message");
  const serviceSelect = document.getElementById("service");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");
  const serviceError = document.getElementById("serviceError");

  const successMessage = document.getElementById("formSuccess");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const phoneToggleBtn = document.getElementById("phoneToggleBtn");
  const phoneDropdown = document.getElementById("phoneDropdown");

  phoneToggleBtn?.addEventListener("click", () => {
    phoneDropdown.style.display = phoneDropdown.style.display === "flex" ? "none" : "flex";
  });

  document.addEventListener("click", (e) => {
    if (!phoneToggleBtn?.contains(e.target) && !phoneDropdown?.contains(e.target)) {
      phoneDropdown.style.display = "none";
    }
  });

  let validationErrors = {
    name: false,
    email: false,
    phone: false,
    message: false,
    service: false
  };

  function updatePlaceholders(lang) {
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
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
    if (validationErrors.phone) {
      phoneError.innerHTML = isRTL ? "يرجى إدخال رقم هاتف صالح." : "Please enter a valid phone number.";
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
      el.innerHTML = '';
      if (icon) {
        el.appendChild(icon);
        el.append(' ' + text);
      } else {
        el.innerHTML = text;
      }
    });

    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.style.textAlign = newLang === 'ar' ? 'right' : 'left';
    langSwitchBtn.setAttribute('data-lang', newLang);

    updatePlaceholders(newLang);
    updateErrorMessages(newLang);
  });

  function validateAll() {
    let isValid = true;
    const dir = document.documentElement.getAttribute('dir');
    const isRTL = dir === 'rtl';

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
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

    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      validationErrors.phone = true;
      phoneError.innerHTML = isRTL ? "يرجى إدخال رقم هاتف صالح." : "Please enter a valid phone number.";
      isValid = false;
    } else {
      validationErrors.phone = false;
      phoneError.innerHTML = "";
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

  [nameInput, emailInput, phoneInput, messageInput, serviceSelect].forEach(input => {
    input?.addEventListener("input", validateAll);
    input?.addEventListener("change", validateAll);
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

      if (validateAll()) {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          message: messageInput.value.trim(),
          service: serviceSelect.value
        };

        const whatsappNumber = "966546925850";
        const messageText = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}%0AService: ${formData.service}`;

        window.open(`https://wa.me/${whatsappNumber}?text=${messageText}`, '_blank');

        if (successMessage) {
          successMessage.innerHTML = isRTL ? "تم إرسال الرسالة بنجاح عبر واتساب." : "Message sent successfully via WhatsApp.";
          successMessage.classList.remove("d-none");
        }

        form.reset();
        validationErrors = { name: false, email: false, phone: false, message: false, service: false };

        setTimeout(() => {
          if (successMessage) successMessage.classList.add("d-none");
        }, 3000);
      } else {
        successMessage?.classList.add("d-none");
      }
    });
  }

  AOS.init({
    offset: 120,
    duration: 1000,
    easing: 'ease-in-out',
  });
});
