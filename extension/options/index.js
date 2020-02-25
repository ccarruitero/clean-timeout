import { getSites } from '../util.js';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const renderList = async () => {
  const sites = await getSites();
  const wrapper = document.querySelector('#sites-list');

  wrapper.innerHTML = '';

  sites.forEach((site) => {
    const item = document.createElement('li');
    item.textContent = site;
    wrapper.appendChild(item);
  });
}

const storageChange = (changes, area) => {
  renderList();
}

const init = () => {
  renderList();

  const newSite = document.querySelector('#new-site');

  newSite.addEventListener('keydown', async (e) => {
    if (e.keyCode === ENTER_KEY) {
      let currentSites = await getSites();
      const target = e.target;
      currentSites.push(target.value);
      browser.storage.local.set({
        sites: JSON.stringify(currentSites)
      });
      e.preventDefault();
      target.value = '';
    }
  });

  browser.storage.onChanged.addListener(storageChange);
};

init();
