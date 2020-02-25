import { getSites, removeSite, updateSites } from './util.js';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const renderList = async () => {
  const sites = await getSites();
  const wrapper = document.querySelector('#sites-list');

  wrapper.innerHTML = '';

  sites.forEach((site) => {
    const item = document.createElement('li');
    item.textContent = site;
    const closeBtn = document.createElement('a');
    closeBtn.textContent = 'x';
    closeBtn.setAttribute('style', `
      cursor: pointer;
      padding: 5px;
      background: grey;
      border-radius: 50%;
      color: white;
      margin-left: 10px;
    `);
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      removeSite(site);
    });
    item.appendChild(closeBtn);
    wrapper.appendChild(item);
  });
}

const storageChange = (changes, area) => {
  renderList();
}

const init = () => {
  renderList();

  const newSite = document.querySelector('#new-site');

  const cleanInput = (target) => {
    target.value = '';
  }

  newSite.addEventListener('keydown', async (e) => {
    const target = e.target;

    if (e.keyCode === ENTER_KEY) {
      let currentSites = await getSites();
      currentSites.push(target.value);
      updateSites(currentSites)
      cleanInput(target);
    } else if (e.keyCode === ESCAPE_KEY) {
      cleanInput(target);
    }
  });

  browser.storage.onChanged.addListener(storageChange);
};

init();
