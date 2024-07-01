import { cloneDeepArray as cloneDeepArray } from './deepArrayClone.mjs';
import { apiUrl as apiUrl, fetchData as fetchData } from './api.mjs';

function testGetData() {
  console.log('test data');
  //fetch('http://127.0.0.1:8000/api/episodes', {
  fetch('https://dev.timothee-dione.ch/anbu-savana/episodes', {
    method: 'GET',
    headers: {
      'Content-Type': '*',
    },
  })
    .then((response) => {
      console.log('loa réponse:', response);
      return;
    })
    .catch((error) => {
      console.log('error', error);
    });
}

/*Global variables */
const playlist = {
  episodes: [
    {
      uri: '',
      title: '',
      no: '',
      tags: [],
    },
  ],
  iframeController: null,
  currentEpisodeId: 0,
};

const activeTags = [
  {
    id: 1,
    value: 'Communication',
  },
  {
    id: 2,
    value: 'Adaptation',
  },
  {
    id: 3,
    value: 'Constance',
  },
  {
    id: 4,
    value: 'Interprétation',
  },
];

const possibleThemesData = [
  {
    id: 1,
    value: 'Communication',
  },
  {
    id: 2,
    value: 'Adaptation',
  },
  {
    id: 3,
    value: 'Constance',
  },
  {
    id: 4,
    value: 'Interprétation',
  },
];

const fetchedEpisodes = [
  {
    uri: '0Hv0HTxBu70NPnEGQgenEP',
    title: "Le contexte dans lequel on s'exprime",
    no: '303',
    tags: ['communication', 'interprétation'],
  },
  {
    uri: '7MdwFbMrjrGLZCd1QFJu9c',
    title: "Détruire la nature par l'action humaine",
    no: '302',
    tags: ['nature', 'communication'],
  },
  {
    uri: '7aYypJ3cz4oQNMlzGnt0qK',
    title: "Le courage d'entreprendre",
    no: '301',
    tags: ['adaptation', 'courage'],
  },
  {
    uri: '4bF1ft92LFvtzLaWcDHYUo',
    title: "Ce qu'il faut faire face à l'impermanence",
    no: '300',
    tags: ['générosité', 'constance'],
  },
];

// const fetchedEpisodes = fetchData(`${apiUrl}/episodes`);
// console.log('fetched episodes', fetchedEpisodes);

const episodesList = document.querySelector('.episodes-list-wrapper');
const episodeNode = document.querySelector('.episode-wrapper');
const tagsList = document.querySelector('.selected-themes-wrapper');
const tagNode = document.querySelector('.theme-tag-wrapper');
const possibleThemesList = document.querySelector('.possible-themes-wrapper');
const possibleThemeNode = document.querySelector('.possible-theme');

/*Player */
window.onSpotifyIframeApiReady = async (IFrameAPI) => {
  const element = document.getElementById('embed-iframe');
  const options = {
    uri: 'spotify:episode:0Hv0HTxBu70NPnEGQgenEP',
  };
  const callback = (EmbedController) => {
    playlist.iframeController = EmbedController; // Stock iFrame controller
  };
  IFrameAPI.createController(element, options, callback);
  generateThemesSelectionList();
  generateTagsList();
  seedEpisodes();
  await filterEpisodesPlaylist();
};

generateTagsList();
seedEpisodes();
await filterEpisodesPlaylist();
generateThemesSelectionList();

/* Episodes */
function seedEpisodes() {
  playlist.episodes = cloneDeepArray(fetchedEpisodes);
  if (!playlist || !playlist.episodes) {
    console.error(
      "Erreur : L'objet playlist ou sa propriété episodes n'est pas défini."
    );
    return;
  }
  generateEpisodesPlaylist();
}

function generateEpisodesPlaylist() {
  document.querySelector(
    '.number-of-episodes'
  ).textContent = `${playlist.episodes.length}épisodes`;
  playlist.episodes.forEach((ep) => {
    const newEpisodeNode = episodeNode.cloneNode(true);
    newEpisodeNode.classList.toggle('hidden');
    newEpisodeNode.dataset.no = ep.no;
    newEpisodeNode.querySelector(
      '.episode-title'
    ).textContent = `Épisode ${ep.no}: ${ep.title}`;
    const newRemoveBtn = newEpisodeNode.querySelector('.remove-episode');
    newRemoveBtn.addEventListener('click', (e) => {
      removeEpisodeFromList(ep);
      emptyEpisodesPlayList();
      generateEpisodesPlaylist();
    });
    const newPlayBtn = newEpisodeNode.querySelector('.play-episode');
    newPlayBtn.addEventListener('click', (e) => {
      testGetData();
      playEpisode(ep.no);
      const episodeDiv = e.target.parentNode.parentNode;
      managePauseEpisodeButtons();
      e.target.parentNode.classList.add('hidden');
      episodeDiv.querySelector('.pause-episode').classList.remove('hidden');
      /*
      Coder une fonction qui remet à pause la valeur de pause episode de l'ancien épisode cliqué et ajoute hidden
      */
    });
    const newPauseBtn = newEpisodeNode.querySelector('.pause-episode');
    newPauseBtn.addEventListener('click', (e) => {
      if (e.target.textContent == 'pause') {
        e.target.textContent = 'play';
        e.target.parentNode.classList.add('previously-played');
      } else {
        e.target.textContent = 'pause';
        e.target.parentNode.classList.remove('previously-played');
      }
      playlist.iframeController.togglePlay();
    });

    episodesList.appendChild(newEpisodeNode);
  });
}

async function filterEpisodesPlaylist() {
  resetEpisodesPlaylist();
  const episodesToRemove = [];
  for (const ep of playlist.episodes) {
    let keepEpisodeInList = false;
    activeTags.forEach((tag) => {
      const epTagsClone = [...ep.tags];
      const lowerCaseEpisodeTags = epTagsClone.map((element) => {
        return element.toLowerCase();
      });
      if (lowerCaseEpisodeTags.includes(tag.value.toLowerCase())) {
        keepEpisodeInList = true;
      }
    });
    if (!keepEpisodeInList) {
      episodesToRemove.push(ep);
    }
  }
  episodesToRemove.forEach((epToRemove) => {
    playlist.episodes.splice(
      playlist.episodes.indexOf(
        playlist.episodes.filter((epToRmv) => epToRmv.no == epToRemove.no)[0]
      ),
      1
    );
  });
  emptyEpisodesPlayList();
  generateEpisodesPlaylist();
}

function emptyEpisodesPlayList() {
  const episodesPlaylist = document.querySelector('.episodes-list-wrapper');
  const children = episodesPlaylist.querySelectorAll('.episode-wrapper');
  for (let i = 1; i < children.length; i++) {
    episodesPlaylist.removeChild(children[i]);
  }
}

function resetEpisodesPlaylist() {
  playlist.episodes = cloneDeepArray(fetchedEpisodes);
}

//Remplacer emtpyEpisodePlalist par emptyNodesList
function removeEpisodeFromList(episode) {
  let episodeIndexToRemove = playlist.episodes.indexOf(
    playlist.episodes.filter((ep) => ep.no == episode.no)[0]
  );
  playlist.episodes.splice(episodeIndexToRemove, 1);
}

function playEpisode(episodeNo) {
  const episode = playlist.episodes.filter((ep) => ep.no == episodeNo)[0];
  const options = {
    uri: `spotify:episode:${episode.uri}`,
  };
  playlist.iframeController.loadUri(options.uri);
  playlist.iframeController.play();
  playlist.currentEpisodeId = episodeNo;
  manageEpisodesListStyle();
}

function manageEpisodesListStyle() {
  document.querySelectorAll('.episode-wrapper').forEach((ep) => {
    ep.classList.remove('selected-episode');
  });
  document
    .querySelector(`.episode-wrapper[data-no="${playlist.currentEpisodeId}"]`)
    .classList.toggle('selected-episode');
}

function managePauseEpisodeButtons() {
  const pauseEpisodeButtons = document.querySelectorAll('.pause-episode');
  pauseEpisodeButtons.forEach((btn) => {
    btn.classList.add('hidden');
  });
  const playEpisodeButtons = document.querySelectorAll('.play-episode');
  playEpisodeButtons.forEach((btn) => {
    btn.classList.remove('hidden');
  });
}

/*Tags*/
function removeTagFromList(tagId) {
  let tagIndexToRemove = activeTags.indexOf(
    activeTags.filter((t) => t.id == tagId)[0]
  );
  activeTags.splice(tagIndexToRemove, 1);
  emptyNodesList('.selected-themes-wrapper', '.theme-tag-wrapper');
  generateTagsList();
  filterEpisodesPlaylist();
}

function generateTagsList() {
  activeTags.forEach((t) => {
    const newTagNode = tagNode.cloneNode(true);
    newTagNode.dataset.id = t.id;
    newTagNode.querySelector('.tag-value').textContent = t.value;
    const newRemoveBtn = newTagNode.querySelector('.remove-tag');
    newRemoveBtn.addEventListener('click', (e) => {
      removeTagFromList(t.id);
    });
    newTagNode.classList.toggle('hidden');
    tagsList.appendChild(newTagNode);
  });
}

function emptyNodesList(listWrapper, childWrapper) {
  const listToEmpty = document.querySelector(listWrapper);
  const children = listToEmpty.querySelectorAll(childWrapper);
  for (let i = 1; i < children.length; i++) {
    listToEmpty.removeChild(children[i]);
  }
}

function generateThemesSelectionList() {
  possibleThemesData.forEach((themeData) => {
    const themeOption = possibleThemeNode.cloneNode(true);
    themeOption.dataset.id = themeData.id;
    themeOption.setAttribute('value', themeData.value);
    themeOption.textContent = themeData.value;
    themeOption.removeAttribute('disabled');
    themeOption.removeAttribute('selected');
    possibleThemesList.appendChild(themeOption);
  });
  possibleThemesList.addEventListener('change', (e) => {
    const correspondingThemeData = activeTags.filter(
      (tag) => tag.value == possibleThemesList.value
    )[0];
    if (correspondingThemeData == null) {
      activeTags.push({
        id: possibleThemesData.filter(
          (tag) => tag.value == possibleThemesList.value
        )[0].id,
        value: possibleThemesList.value,
      });
      emptyNodesList('.selected-themes-wrapper', '.theme-tag-wrapper');
      generateTagsList();
      filterEpisodesPlaylist();
    } else {
    }
    deselectTags();
  });
}

function deselectTags() {
  possibleThemesList.value = 'Ajouter';
}

//Next: tester la génération de tags en lançant generateTagsList()
