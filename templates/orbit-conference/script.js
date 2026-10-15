'use strict';

// Replace the date (including its time zone) when adapting this template.
const eventStartsAt = '2026-11-12T09:00:00-08:00';
const countdown = document.querySelector('#countdown');
function updateCountdown() {
  const target = Date.parse(eventStartsAt);
  if (!Number.isFinite(target)) {
    countdown.textContent = 'date to be announced';
    return;
  }
  const remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
  const units = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24,
    Math.floor(remaining / 60) % 60, remaining % 60];
  countdown.textContent = units.map(value => String(value).padStart(2, '0')).join(' : ');
  countdown.setAttribute('aria-label', `${units[0]} days, ${units[1]} hours, ${units[2]} minutes, ${units[3]} seconds until the demo event`);
}
updateCountdown();
setInterval(updateCountdown, 1000);

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation-links');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

// Each tab group is independent; arrow keys, Home and End activate and focus tabs.
document.querySelectorAll('[role="tablist"]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  function activate(tab) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      activate(tabs[next]);
      tabs[next].focus();
    });
  });
});

const dialog = document.querySelector('#registration');
document.querySelectorAll('.register').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#chosen-pass').textContent = button.dataset.pass;
    dialog.showModal();
  });
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
