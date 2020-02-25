(async () => {
  const currentUrl = window.location.toString();
  const sites = await browser.storage.local.get('sites').then(res => JSON.parse(res.sites));

  sites.forEach((site) => {
    if (currentUrl.match(site)) {
      let timeoutId = window.setTimeout(() => {}, 0);

      while (timeoutId--) {
        clearTimeout(timeoutId);
      }
    }
  });
})();
