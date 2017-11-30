import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('Home', {path: '/'});
  this.route('Contact');

  this.route('contact', function() {
    this.route('phone');
    this.route('Email');
  });
  this.route('posts');
});

export default Router;
