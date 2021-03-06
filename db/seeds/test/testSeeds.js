
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('action_log').del()
    .then(() => {
      return knex.raw('ALTER SEQUENCE action_log_id_seq RESTART WITH 1');
    })
    .then(() => knex('users').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    })
    .then(() => knex('twitter_contents').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE twitter_contents_id_seq RESTART WITH 1');
    })
    .then(() => knex('facebook_contents').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE facebook_contents_id_seq RESTART WITH 1');
    })
    .then(() => knex('email_contents').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE email_contents_id_seq RESTART WITH 1');
    })
    .then(() => knex('phone_contents').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE phone_contents_id_seq RESTART WITH 1');
    })
    .then(() => knex('twitter_actions').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE twitter_actions_id_seq RESTART WITH 1');
    })
    .then(() => knex('facebook_actions').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE facebook_actions_id_seq RESTART WITH 1');
    })
    .then(() => knex('email_actions').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE email_actions_id_seq RESTART WITH 1');
    })
    .then(() => knex('phone_actions').del())
    .then(() => {
      return knex.raw('ALTER SEQUENCE phone_actions_id_seq RESTART WITH 1');
    })

    .then(function () {
      // Inserts seed entries
      return knex('twitter_actions').insert({
        enabled: true, 
        title: 'Tweet Action Title', 
        description: 'Tweet Action Description', 
        target: 'https://twitter.com/katieescruggs'
      }, 'id')

        .then(twitterActionId => {
          return knex('twitter_contents').insert([
            { action_id: twitterActionId[0], content: 'Twitter Content 1' },
            { action_id: twitterActionId[0], content: 'Twitter Content 2' },
            { action_id: twitterActionId[0], content: 'Twitter Content 3' }
          ])
        })

      .then(() => {
        return knex('facebook_actions').insert({
          enabled: true, 
          title: 'Facebook Action Title', 
          description: 'Facebook Action Description', 
          target: 'https://facebook.com/katie.reap.7'
        }, 'id')

          .then(facebookActionId => {
            return knex('facebook_contents').insert([
              { action_id: facebookActionId[0], content: 'Facebook Content 1' },
              { action_id: facebookActionId[0], content: 'Facebook Content 2' },
              { action_id: facebookActionId[0], content: 'Facebook Content 3' }
            ])
          })
      })

      .then(() => {
        return knex('email_actions').insert({
          enabled: true, 
          title: 'Email Action Title', 
          description: 'Email Action Description', 
          to: 'katie.e.scruggs@gmail.com',
          cc: 'julabi@gmail.com',
          bcc: 'lairdthomasr@gmail.com',
          subject: 'Email Subject'
        }, 'id')

          .then(emailActionId => {
            return knex('email_contents').insert([
              { action_id: emailActionId[0], content: 'Email Content 1' },
              { action_id: emailActionId[0], content: 'Email Content 2' },
              { action_id: emailActionId[0], content: 'Email Content 3' }
            ])
          })
      })

      .then(() => {
        return knex('phone_actions').insert({
          enabled: true, 
          title: 'Phone Action Title', 
          description: 'Phone Action Description', 
          name: 'Katie Scruggs',
          position: 'Troop Rallier',
          phone_number: '4054269430'
        }, 'id')

          .then(phoneActionId => {
            return knex('phone_contents').insert([
              { action_id: phoneActionId[0], content: 'Phone Script 1' },
              { action_id: phoneActionId[0], content: 'Phone Script 2' },
              { action_id: phoneActionId[0], content: 'Phone Script 3' }
            ])
          })
      })

      .then(() => {
        return knex('users').insert([
          { twitter_actions: true, facebook_actions: true, email_actions: true, phone_actions: true, admin: true, name: 'Katie Scruggs'},
          { twitter_actions: true, facebook_actions: true, email_actions: true, phone_actions: false, admin: false, name: 'Julie Hawkins'},
          { twitter_actions: true, facebook_actions: true, email_actions: true, phone_actions: true, admin: true, super_admin: true, id_token: 'testtoken', name: 'Thomas Laird'},

        ])
      })
      .then(() => {
        return knex('action_log').insert([
          { user_id: 1, action_id: 1, action_type: 'twitter_action', description: 'test action'}
        ]);
      });
    });
};
