import config from '~/config';

import Main from '~/pages/Main';
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import User from '~/pages/User';
import Song from '~/pages/Song';
import Artist from '~/pages/Artist';
import Genre from '~/pages/Genre';
import Album from '~/pages/Album';
import Notification from '~/pages/Notification';
import Banner from '~/pages/Banner';

const publicRoutes = [{ path: config.routes.main, component: Main }];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.user, component: User },
    { path: config.routes.song, component: Song },
    { path: config.routes.artist, component: Artist },
    { path: config.routes.genre, component: Genre },
    { path: config.routes.album, component: Album },
    { path: config.routes.notification, component: Notification },
    { path: config.routes.banner, component: Banner },
    { path: config.routes.logout, component: Main },
];

export { publicRoutes, privateRoutes };
