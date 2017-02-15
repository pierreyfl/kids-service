import React from 'react';
import { find } from 'lodash';
import { Redirect, matchPath } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import {
  AuthenticationPage,
  CheckoutPage,
  ContactDetailsPage,
  EditProfilePage,
  InboxPage,
  LandingPage,
  ListingPage,
  ManageListingsPage,
  OrderPage,
  PasswordChangePage,
  PasswordForgottenPage,
  PayoutPreferencesPage,
  ProfilePage,
  SalesConversationPage,
  SearchPage,
  SecurityPage,
  StyleguidePage,
} from './containers';

// This is only used for testing that redirects work correct in the
// client and when rendering in the server.
const RedirectLandingPage = () => <Redirect to="/" />;

const routesConfiguration = [
  {
    pattern: '/',
    exactly: true,
    name: 'LandingPage',
    component: match => <LandingPage {...match} />,
  },
  {
    pattern: '/s',
    exactly: true,
    name: 'SearchPage',
    component: match => <SearchPage {...match} />,
    loadData: SearchPage ? SearchPage.loadData : null,
    routes: [
      {
        pattern: '/s/filters',
        exactly: true,
        name: 'SearchFiltersPage',
        component: match => <SearchPage {...match} tab="filters" />,
        loadData: SearchPage ? SearchPage.loadData : null,
      },
      {
        pattern: '/s/listings',
        exactly: true,
        name: 'SearchListingsPage',
        component: match => <SearchPage {...match} tab="listings" />,
        loadData: SearchPage ? SearchPage.loadData : null,
      },
      {
        pattern: '/s/map',
        exactly: true,
        name: 'SearchMapPage',
        component: match => <SearchPage {...match} tab="map" />,
        loadData: SearchPage ? SearchPage.loadData : null,
      },
    ],
  },
  {
    pattern: '/l',
    exactly: true,
    name: 'ListingBasePage',
    component: RedirectLandingPage,
    routes: [
      {
        pattern: '/l/:slug/:id',
        exactly: true,
        name: 'ListingPage',
        component: match => <ListingPage {...match} />,
      },
    ],
  },
  {
    pattern: '/u',
    exactly: true,
    name: 'ProfileBasePage',
    component: RedirectLandingPage,
    routes: [
      {
        pattern: '/u/:displayName',
        exactly: true,
        name: 'ProfilePage',
        component: match => <ProfilePage {...match} />,
        routes: [
          {
            pattern: '/u/:displayName/edit',
            auth: true,
            exactly: true,
            name: 'EditProfilePage',
            component: match => <EditProfilePage {...match} />,
          },
        ],
      },
    ],
  },
  {
    pattern: '/checkout',
    exactly: true,
    name: 'CheckoutBasePage',
    component: RedirectLandingPage,
    routes: [
      {
        pattern: '/checkout/:listingId',
        exactly: true,
        name: 'CheckoutPage',
        component: match => <CheckoutPage {...match} />,
      },
    ],
  },
  {
    pattern: '/login',
    exactly: true,
    name: 'LogInPage',
    component: match => <AuthenticationPage {...match} tab="login" />,
  },
  {
    pattern: '/signup',
    exactly: true,
    name: 'SignUpPage',
    component: match => <AuthenticationPage {...match} tab="signup" />,
  },
  {
    pattern: '/password',
    exactly: true,
    name: 'PasswordPage',
    component: match => <PasswordForgottenPage {...match} />,
  },
  {
    pattern: '/password/forgotten',
    exactly: true,
    name: 'PasswordForgottenPage',
    component: match => <PasswordForgottenPage {...match} />,
  },
  {
    pattern: '/password/change',
    exactly: true,
    name: 'PasswordChangePage',
    component: match => <PasswordChangePage {...match} />,
  },
  {
    pattern: '/orders',
    auth: true,
    exactly: true,
    name: 'OrdersPage',
    component: match => <InboxPage {...match} filter="orders" />,
  },
  {
    pattern: '/sales',
    auth: true,
    exactly: true,
    name: 'SalesPage',
    component: match => <InboxPage {...match} filter="sales" />,
  },
  {
    pattern: '/order/:id',
    auth: true,
    exactly: true,
    name: 'OrderPage',
    component: RedirectLandingPage,
    routes: [
      {
        pattern: '/order/:id/details',
        auth: true,
        exactly: true,
        name: 'OrderDetailsPage',
        component: match => <OrderPage {...match} tab="details" />,
      },
      {
        pattern: '/order/:id/discussion',
        auth: true,
        exactly: true,
        name: 'OrderDiscussionPage',
        component: match => <OrderPage {...match} tab="discussion" />,
      },
    ],
  },
  {
    pattern: '/sale/:id',
    auth: true,
    exactly: true,
    name: 'SalePage',
    component: match => <SalesConversationPage {...match} tab="discussion" />,
    routes: [
      {
        pattern: '/sale/:id/details',
        auth: true,
        exactly: true,
        name: 'SaleDetailsPage',
        component: match => <SalesConversationPage {...match} tab="discussion" />,
      },
      {
        pattern: '/sale/:id/discussion',
        auth: true,
        exactly: true,
        name: 'SaleDiscussionPage',
        component: match => <SalesConversationPage {...match} tab="discussion" />,
      },
    ],
  },
  {
    pattern: '/listings',
    auth: true,
    exactly: true,
    name: 'ManageListingsPage',
    component: match => <ManageListingsPage {...match} />,
  },
  {
    pattern: '/account',
    auth: true,
    exactly: true,
    name: 'AccountPage',
    component: () => <Redirect to="/account/contact-details" />,
    routes: [
      {
        pattern: '/account/contact-details',
        auth: true,
        exactly: true,
        name: 'ContactDetailsPage',
        component: match => <ContactDetailsPage {...match} />,
      },
      {
        pattern: '/account/payout-preferences',
        auth: true,
        exactly: true,
        name: 'PayoutPreferencesPage',
        component: match => <PayoutPreferencesPage {...match} />,
      },
      {
        pattern: '/account/security',
        auth: true,
        exactly: true,
        name: 'SecurityPage',
        component: match => <SecurityPage {...match} />,
      },
    ],
  },
  {
    pattern: '/styleguide',
    exactly: true,
    name: 'Styleguide',
    component: match => <StyleguidePage {...match} />,
  },
  {
    pattern: '/styleguide/:component',
    exactly: true,
    name: 'StyleguideComponent',
    component: match => <StyleguidePage {...match} />,
  },
  {
    pattern: '/styleguide/:component/:example',
    exactly: true,
    name: 'StyleguideComponentExample',
    component: match => <StyleguidePage {...match} />,
  },
  {
    pattern: '/styleguide/:component/:example/:type',
    exactly: true,
    name: 'StyleguideComponentExampleRaw',
    component: match => <StyleguidePage {...match} />,
  },
];

const flattenRoutes = routesArray =>
  routesArray.reduce((a, b) => a.concat(b.routes ? [b].concat(flattenRoutes(b.routes)) : b), []);

const findRouteByName = (nameToFind, routes) => {
  const flattenedRoutes = flattenRoutes(routes);
  return find(flattenedRoutes, route => route.name === nameToFind);
};

/**
 * E.g. ```const toListingPath = toPathByRouteName('ListingPage', routes);```
 * Then we can generate listing paths with given params (```toListingPath({ id: uuidX })```)
 */
const toPathByRouteName = (nameToFind, routes) => {
  const route = findRouteByName(nameToFind, routes);
  if (!route) {
    throw new Error(`Path "${nameToFind}" was not found.`);
  }
  return pathToRegexp.compile(route.pattern);
};

/**
 * Shorthand for single path call. (```pathByRouteName('ListingPage', routes, { id: uuidX });```)
 */
const pathByRouteName = (nameToFind, routes, params = {}) =>
  toPathByRouteName(nameToFind, routes)(params);

/**
 * matchRoutesToLocation helps to figure out which routes are related to given location.
 */
const matchRoutesToLocation = (routes, location, matchedRoutes = [], params = {}) => {
  let parameters = { ...params };
  let matched = [...matchedRoutes];

  routes.forEach(route => {
    const { exactly = false } = route;
    const match = !route.pattern || matchPath(location.pathname, route.pattern, { exact: exactly });

    if (match) {
      matched.push(route);

      if (match.params) {
        parameters = { ...parameters, ...match.params };
      }
    }

    if (route.routes) {
      const { matchedRoutes: subRouteMatches, params: subRouteParams } = matchRoutesToLocation(
        route.routes,
        location,
        matched,
        parameters,
      );
      matched = matched.concat(subRouteMatches);
      parameters = { ...parameters, ...subRouteParams };
    }
  });

  return { matchedRoutes: matched, params: parameters };
};

const matchPathnameCreator = routes =>
  (location, matchedRoutes = [], params = {}) =>
    matchRoutesToLocation(routes, { pathname: location }, matchedRoutes, params);

/**
 * matchRoutesToLocation helps to figure out which routes are related to given location.
 */
const matchPathname = matchPathnameCreator(routesConfiguration);

// Exported helpers
export { findRouteByName, flattenRoutes, matchPathname, toPathByRouteName, pathByRouteName };

export default routesConfiguration;