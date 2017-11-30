import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  DS: Ember.inject.service('store'),
  postsData: null,
  title: Ember.computed.oneWay('postsData.title'),
  body: Ember.computed.oneWay('postsData.body'),


  modalName: Ember.computed(function()
  {
    return 'Edit-Post' + this.get('ID');
  }),

  actions: {
    openEditModal: function () {
      this.set('postsData', this.get('DS').peekRecord('post',this.get('ID')))

      Ember.$('.ui.'+ this.get('modalName')+ '.modal').modal({
        closable: false,
        transition: 'horizontal flip',
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {
          this.get('DS').findRecord('post',this.get('ID')).then((rec) =>
          {
            rec.set('title', this.get('title'));
            rec.set('body',this.get('body'));
            rec.save().then(() =>{
              return true;
            });
          });
        }

      })
        .modal('show');
    },

  }
});
