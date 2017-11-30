import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  DS: Ember.inject.service('store'),

  modalName: Ember.computed(function() {
  return 'Delete-Post' + this.get('ID');
}),

  actions: {
    openDeleteModal: function () {
      Ember.$('.ui.'+ this.get('modalName') + '.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {
          this.get('DS').find('post',this.get('ID')).then((post) => {
            post.destroyRecord();
            post.save().then(()=> {
              return true;
          });
          })
        }

      })
        .modal('show');
    },

  }
});
