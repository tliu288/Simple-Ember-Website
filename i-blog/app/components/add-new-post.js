import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  DS: Ember.inject.service('store'),

  actions: {
    openModal: function () {
      this.set('title', null);
      this.set('body', null);



      Ember.$('.ui.newPost.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {
          var newPost = this.get('DS').createRecord('post', {
            title: this.get('title'),
            body: this.get('body'),
          });
          newPost.save().then(()=> {
            return true;
          });
        }
      })
        .modal('show');
    },
  }
});
