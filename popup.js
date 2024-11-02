const content = document.querySelector('.content');
const editForm = document.querySelector('.edit-form');
const editSrc = document.querySelector('.edit-form input[name="poster-src"]');
const editSrcSet = document.querySelector(
  '.edit-form input[name="poster-srcSet"]'
);
const editSubmit = document.querySelector('.edit-submit');

let page = 'home';
let editingMovie = null;

let POSTERS = {
  aftersun: [
    'https://a.ltrbxd.com/resized/alternative-poster/8/6/8/5/5/8/p/zJd2NwGzciSMppCHividNSROIZR-0-125-0-187-crop.jpg?v=69aa57d7c3',
    'https://a.ltrbxd.com/resized/alternative-poster/8/6/8/5/5/8/p/zJd2NwGzciSMppCHividNSROIZR-0-250-0-375-crop.jpg?v=69aa57d7c3 2x',
  ],
  'avatar-the-way-of-water': [
    'https://a.ltrbxd.com/resized/alternative-poster/6/3/0/5/8/p/5ScPNT6fHtfYJeWBajZciPV3hEL-0-125-0-187-crop.jpg?v=262a13aa7f',
    'https://a.ltrbxd.com/resized/alternative-poster/6/3/0/5/8/p/5ScPNT6fHtfYJeWBajZciPV3hEL-0-250-0-375-crop.jpg?v=262a13aa7f 2x',
  ],
  'black-panther-wakanda-forever': [
    'https://a.ltrbxd.com/resized/alternative-poster/4/3/5/4/6/0/p/cpKwys2QB4TRLLbRTi9QLJBAfn-0-125-0-187-crop.jpg?v=74538e6ea3',
    'https://a.ltrbxd.com/resized/alternative-poster/4/3/5/4/6/0/p/cpKwys2QB4TRLLbRTi9QLJBAfn-0-250-0-375-crop.jpg?v=74538e6ea3 2x',
  ],
  'bullet-train': [
    'https://a.ltrbxd.com/resized/alternative-poster/6/4/1/9/6/1/p/zTgMFlHG5D1EqdQDhfOTAsyzGoX-0-125-0-187-crop.jpg?v=99113670e1',
    'https://a.ltrbxd.com/resized/alternative-poster/6/4/1/9/6/1/p/zTgMFlHG5D1EqdQDhfOTAsyzGoX-0-250-0-375-crop.jpg?v=99113670e1 2x',
  ],
  'cha-cha-real-smooth': [
    'https://a.ltrbxd.com/resized/alternative-poster/7/3/0/7/9/8/p/z8IPItbwRrJ3QWdCePOnWS1jueY-0-125-0-187-crop.jpg?v=65e37e80f6',
    'https://a.ltrbxd.com/resized/alternative-poster/7/3/0/7/9/8/p/z8IPItbwRrJ3QWdCePOnWS1jueY-0-250-0-375-crop.jpg?v=65e37e80f6 2x',
  ],
  'death-on-the-nile-2022': [
    'https://a.ltrbxd.com/resized/alternative-poster/4/3/4/9/1/3/p/kVr5zIAFSPRQ57Y1zE7KzmhzdMQ-0-125-0-187-crop.jpg?v=1605649726',
    'https://a.ltrbxd.com/resized/alternative-poster/4/3/4/9/1/3/p/kVr5zIAFSPRQ57Y1zE7KzmhzdMQ-0-250-0-375-crop.jpg?v=1605649726 2x',
  ],
  'doctor-strange-in-the-multiverse-of-madness': [
    'https://a.ltrbxd.com/resized/alternative-poster/3/8/5/5/1/1/p/A7CzMZBitf00BAtb1kJa50pWPgV-0-125-0-187-crop.jpg?v=c8dd943155',
    'https://a.ltrbxd.com/resized/alternative-poster/3/8/5/5/1/1/p/A7CzMZBitf00BAtb1kJa50pWPgV-0-250-0-375-crop.jpg?v=c8dd943155 2x',
  ],
  'dont-worry-darling': [
    'https://a.ltrbxd.com/resized/alternative-poster/5/4/6/3/4/7/p/aBEmqoseMlN1jpHV5SGDIbTWBFu-0-125-0-187-crop.jpg?v=8d626bd7eb',
    'https://a.ltrbxd.com/resized/alternative-poster/5/4/6/3/4/7/p/aBEmqoseMlN1jpHV5SGDIbTWBFu-0-250-0-375-crop.jpg?v=8d626bd7eb 2x',
  ],
  'elvis-2022': [
    'https://a.ltrbxd.com/resized/alternative-poster/5/4/2/0/3/2/p/pHSJ1nVYenqReZpCNj9m76qlVoG-0-125-0-187-crop.jpg?v=2a508667ee',
    'https://a.ltrbxd.com/resized/alternative-poster/5/4/2/0/3/2/p/pHSJ1nVYenqReZpCNj9m76qlVoG-0-250-0-375-crop.jpg?v=2a508667ee 2x',
  ],
  'everything-everywhere-all-at-once': [
    'https://a.ltrbxd.com/resized/alternative-poster/4/7/4/4/7/4/p/dFxwJmP66oNIAF5wwcPxC1ghyTt-0-125-0-187-crop.jpg?v=d68b4d6775',
    'https://a.ltrbxd.com/resized/alternative-poster/4/7/4/4/7/4/p/dFxwJmP66oNIAF5wwcPxC1ghyTt-0-250-0-375-crop.jpg?v=d68b4d6775 2x',
  ],
  nope: [
    'https://a.ltrbxd.com/resized/alternative-poster/6/8/2/5/4/7/p/7pt348KBSaqzacLlZS50WmGAVTt-0-125-0-187-crop.jpg?v=9ebd239d46',
    'https://a.ltrbxd.com/resized/alternative-poster/6/8/2/5/4/7/p/7pt348KBSaqzacLlZS50WmGAVTt-0-250-0-375-crop.jpg?v=9ebd239d46 2x',
  ],
  'the-batman': [
    'https://a.ltrbxd.com/resized/alternative-poster/3/4/8/9/1/4/p/2s8RGekcW5YRLR4N4Th2erTxze6-0-125-0-187-crop.jpg?v=0f91827b64',
    'https://a.ltrbxd.com/resized/alternative-poster/3/4/8/9/1/4/p/2s8RGekcW5YRLR4N4Th2erTxze6-0-250-0-375-crop.jpg?v=0f91827b64 2x',
  ],
  'the-northman': [
    'https://a.ltrbxd.com/resized/alternative-poster/5/6/5/8/5/2/p/8p9zXB7M78nZpm215zHfqpknMeM-0-125-0-187-crop.jpg?v=81a4de7b00',
    'https://a.ltrbxd.com/resized/alternative-poster/5/6/5/8/5/2/p/8p9zXB7M78nZpm215zHfqpknMeM-0-250-0-375-crop.jpg?v=81a4de7b00 2x',
  ],
  'thor-love-and-thunder': [
    'https://a.ltrbxd.com/resized/alternative-poster/5/4/3/0/0/2/p/f02d4RFleuhCA7NF21XC5TlqsA0-0-125-0-187-crop.jpg?v=8d2c74ece0',
    'https://a.ltrbxd.com/resized/alternative-poster/5/4/3/0/0/2/p/f02d4RFleuhCA7NF21XC5TlqsA0-0-250-0-375-crop.jpg?v=8d2c74ece0 2x',
  ],
  'triangle-of-sadness': [
    'https://a.ltrbxd.com/resized/alternative-poster/4/2/7/9/7/0/p/3isDMeaKYjCGsI8jtBS2J4j3gXX-0-125-0-187-crop.jpg?v=84f86b4eff',
    'https://a.ltrbxd.com/resized/alternative-poster/4/2/7/9/7/0/p/3isDMeaKYjCGsI8jtBS2J4j3gXX-0-250-0-375-crop.jpg?v=84f86b4eff 2x',
  ],
};

const getChromeStore = new Promise((resolve, reject) => {
  if (!chrome.storage) reject();
  chrome.storage.local.get(['posterboxd'], function (result) {
    if (!result) reject();
    if (result.posterboxd) {
      resolve(result.posterboxd);
    }
  });
});

renderContent();

async function renderContent() {
  if (chrome.storage) {
    POSTERS = await getChromeStore;
  }
  if (page === 'home') {
    // resetting content of other page
    content.innerHTML = '';

    Object.keys(POSTERS).forEach((movie) => {
      // create posters
      const posterHolder = document.createElement('div');
      posterHolder.classList.add('poster-holder');
      posterHolder.innerHTML = `<img src='${POSTERS[movie][0]}' alt='The Image' />`;

      // delete button
      const remove = document.createElement('div');
      remove.classList.add('remove');
      remove.innerHTML = `❌`;
      posterHolder.appendChild(remove);
      remove.addEventListener('click', () => {
        delete POSTERS[movie];
        if (chrome.storage) {
          chrome.storage.local.set({
            posterboxd: POSTERS,
          });
        }
        renderContent();
      });

      // edit button
      const edit = document.createElement('div');
      edit.classList.add('edit');
      edit.innerHTML = '&#9997;';
      posterHolder.appendChild(edit);
      edit.addEventListener('click', () => {
        console.log('edit');
        page = 'edit';
        editingMovie = movie;
        renderContent();
      });

      // letterboxd link button
      const lbox = document.createElement('a');
      lbox.classList.add('lbox-link');
      lbox.innerHTML = '🔗';
      lbox.href = `https://letterboxd.com/film/${movie}`;
      lbox.target = '_blank';
      posterHolder.appendChild(lbox);

      content.appendChild(posterHolder);
    });
  } else {
    // resetting content of other page
    content.innerHTML = '';

    // adding form
    content.appendChild(editForm);
    editForm.style.display = 'inline-flex';

    // fill data
    editSrc.value = POSTERS[editingMovie][0];
    editSrcSet.value = POSTERS[editingMovie][1];

    editForm.addEventListener('submit', (e) => e.preventDefault());
    editSubmit.addEventListener('click', () => {
      const newSrc = editSrc.value;
      const newSrcSet = editSrcSet.value;
      POSTERS[editingMovie] = [newSrc, newSrcSet];
      if (chrome.storage) {
        chrome.storage.local.set({
          posterboxd: POSTERS,
        });
      }
      page = 'home';
      renderContent();
    });

    const posterHolder = document.createElement('div');
    posterHolder.classList.add('poster-holder-lg');
    posterHolder.innerHTML = `<img src='${POSTERS[editingMovie][0]}' alt='The Image' />`;
    posterHolder.innerHTML += `<p>${editingMovie}</p>`;
    content.insertBefore(posterHolder, content.firstChild);
  }
}
