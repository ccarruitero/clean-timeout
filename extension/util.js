export const getSites = async () => {
  const storage = await browser.storage.local.get('sites');
  if (Object.keys(storage).length > 0) {
    return JSON.parse(storage.sites)
  } else {
    return [];
  }
};

