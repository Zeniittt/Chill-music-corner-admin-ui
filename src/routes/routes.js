import config from '~/config';

import Main from '~/pages/Main';
import Home from '~/pages/Home';
import User from '~/pages/User';
import Marketing from '~/pages/Marketing';

const publicRoutes = [{ path: config.routes.main, component: Main }];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.user, component: User },
    { path: config.routes.marketing, component: Marketing },
    { path: config.routes.logout, component: Main },
];

export { publicRoutes, privateRoutes };
