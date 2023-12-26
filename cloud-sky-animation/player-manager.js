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
    value: 'Sagesse',
  },
  {
    id: 2,
    value: 'Oppiniatreté',
  },
];

const episodesList = document.querySelector('.episodes-list-wrapper');
const episodeNode = document.querySelector('.episode-wrapper');
const tagsList = document.querySelector('.selected-themes-wrapper');
const tageNode = document.querySelector('.theme-tag-wrapper');

/*Player */
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('embed-iframe');
  const options = {
    uri: 'spotify:episode:0Hv0HTxBu70NPnEGQgenEP',
  };
  const callback = (EmbedController) => {
    playlist.iframeController = EmbedController; // Stock iFrame controller
  };
  IFrameAPI.createController(element, options, callback);
  seedEpisodes();
};

/* Episodes */
function seedEpisodes() {
  console.log('coucou');
  playlist.episodes[0] = {
    uri: '0Hv0HTxBu70NPnEGQgenEP',
    title: "Le contexte dans lequel on s'exprime",
    no: '303',
    tags: ['communication', 'interprétation'],
  };
  playlist.episodes[1] = {
    uri: '7MdwFbMrjrGLZCd1QFJu9c',
    title: "Détruire la nature par l'action humaine",
    no: '302',
    tags: ['nature', 'interprétation'],
  };
  playlist.episodes[2] = {
    uri: '7aYypJ3cz4oQNMlzGnt0qK',
    title: "Le courage d'entreprendre",
    no: '301',
    tags: ['adaptation', 'constance'],
  };
  playlist.episodes[3] = {
    uri: '4bF1ft92LFvtzLaWcDHYUo',
    title: "Ce qu'il faut faire face à l'impermanence",
    no: '300',
    tags: ['adaptation', 'constance'],
  };
  generateEpisodesPlaylist();
}

function generateEpisodesPlaylist() {
  playlist.episodes.forEach((ep) => {
    const newEpisodeNode = episodeNode.cloneNode(true);
    newEpisodeNode.dataset.no = ep.no;
    newEpisodeNode.querySelector(
      '.episode-title'
    ).textContent = `Épisode ${ep.no}: ${ep.title}`;
    const newRemoveBtn = newEpisodeNode.querySelector('.remove-episode');
    newRemoveBtn.classList.toggle('hidden');
    newRemoveBtn.addEventListener('click', (e) => {
      removeEpisodeFromList(ep.no);
    });
    const newPlayBtn = newEpisodeNode.querySelector('.play-episode');
    newPlayBtn.classList.toggle('hidden');
    newPlayBtn.addEventListener('click', (e) => {
      playEpisode(ep.no);
    });
    episodesList.appendChild(newEpisodeNode);
  });
}

function emptyEpisodesPlayList() {
  const episodesPlaylist = document.querySelector('.episodes-list-wrapper');
  const children = episodesPlaylist.querySelectorAll('.episode-wrapper');
  for (let i = 1; i < children.length; i++) {
    episodesPlaylist.removeChild(children[i]);
  }
}

//Remplacer emtpyEpisodePlalist par emptyNodesList
function removeEpisodeFromList(episodeNo) {
  let episodeIndexToRemove = playlist.episodes.indexOf(
    playlist.episodes.filter((ep) => ep.no == episodeNo)[0]
  );
  playlist.episodes.splice(episodeIndexToRemove, 1);
  emptyEpisodesPlayList();
  generateEpisodesPlaylist();
}

function playEpisode(episodeNo) {
  const episode = playlist.episodes.filter((ep) => ep.no == episodeNo)[0];
  const options = {
    uri: `spotify:episode:${episode.uri}`,
  };
  console.log('ouiiii', playlist.iframeController, options.uri);
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

/*Tags*/
function removeTagFromList(tagId) {
  let tagIndexToRemove = activeTags.indexOf(
    activeTags.filter((t) => t.id == tagId)[0]
  );
  activeTags.remove(tagIndexToRemove, 1);
  emptyNodesList('selected-themes-wrapper', 'theme-tag-wrapper');
  generateEpisodesPlaylist();
}

function generateTagsList() {
  activeTags.forEach((t) => {
    const newTagNode = tagNode.cloneNode(true);
    tagNode.dataset.id = t.id;
    newTagNode.querySelector('.tag-value').textContent = `${t.value}`;
    const newRemoveBtn = newTagNode.querySelector('.remove-tag');
    newRemoveBtn.classList.toggle('hidden');
    newRemoveBtn.addEventListener('click', (e) => {
      removeTagFromList(t.no);
    });
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
