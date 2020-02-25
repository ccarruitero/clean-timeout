export const getSites = async () => {
  const storage = await browser.storage.local.get('sites');
  if (Object.keys(storage).length > 0) {
    return JSON.parse(storage.sites)
  } else {
    return [];
  }
};

export const updateSites = async (sites) => {
  browser.storage.local.set({
    sites: JSON.stringify(sites)
  });
}

export const removeSite = async (site) => {
  const sites = await getSites();
  const index = sites.indexOf(site);
  if (index > -1) {
    sites.splice(index, 1);
  }
  await updateSites(sites);
}
