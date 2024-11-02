window.onload = function () {
  renderPosters();
  attachTrigger();

  window.addEventListener('scroll', (event) => {
    let scroll = this.scrollY;
    if (scroll % 400 < 10) {
      console.log('triggered');
      attachTrigger();
      renderPosters();
    }
  });

  function attachTrigger() {
    const overlays = Array.from(document.querySelectorAll('.overlay-actions'));

    for (let overlay of overlays) {
      if (overlay.childElementCount < 4) {
        overlay.style.transform = 'translateX(-13px)';

        const btn = document.createElement('span');

        btn.style.display = 'inline-flex';
        btn.style.padding = '4px';
        btn.style.backgroundColor = 'rgba(0,0,0,0.7)';
        btn.borderRadius = '0 4px 4px 0';
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="#ffffff">
    <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
    </svg>`;

        overlay.appendChild(btn);

        btn.addEventListener('click', (e) => {
          const film = e.target.closest('a').href.split('/').at(-2);
          const poster = [
            e.target
              .closest('a')
              .previousSibling.src.replace('0-125-0-187', '0-230-0-345')
              .replace('0-150-0-225', '0-230-0-345')
              .replace('0-70-0-105', '0-230-0-345'),
            e.target.closest('a').previousSibling.srcset,
          ];
          chrome.storage.local.get(['posterboxd'], function (result) {
            if (result && result.posterboxd) {
              const storedPosters = result.posterboxd;
              storedPosters[film] = poster;
              console.log({ storedPosters });
              chrome.storage.local.set({
                posterboxd: storedPosters,
              });
            } else {
              console.log('first entry', { film, poster });
              chrome.storage.local.set({
                posterboxd: { [film]: poster },
              });
            }
          });
        });
      }
    }
  }

  function renderPosters() {
    chrome.storage.local.get(['posterboxd'], function (result) {
      if (!result) return;
      if (result.posterboxd) {
        const storedPosters = result.posterboxd;
        console.log(storedPosters);
        Object.keys(storedPosters).forEach((movie) => {
          const foundPosters = Array.from(
            document.querySelectorAll(
              `.film-poster[data-film-link="/film/${movie}/"] img`
            )
          );

          // filter out custom posters
          const defaultPosters = foundPosters.filter(
            (poster) => !poster.src.includes('alternative-poster')
          );

          defaultPosters.forEach((poster) => {
            poster.src = storedPosters[movie][0].replace(
              '125-0-187',
              '230-0-345'
            );
            poster.srcset = storedPosters[movie][1];
          });
        });
      }
    });
  }
};
