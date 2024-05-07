import Main from '~/pages/Main';
import Home from '~/pages/Home';

const publicRoutes = [{ path: '/', component: Main }];

const privateRoutes = [{ path: '/home', component: Home }];

export { publicRoutes, privateRoutes };
