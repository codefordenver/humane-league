
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('action_log').del()
    .then(() => knex('users').del())
    .then(() => knex('twitter_contents').del())
    .then(() => knex('facebook_contents').del())
    .then(() => knex('email_contents').del())
    .then(() => knex('phone_contents').del())
    .then(() => knex('twitter_actions').del())
    .then(() => knex('facebook_actions').del())
    .then(() => knex('email_actions').del())
    .then(() => knex('phone_actions').del())

    .then(function () {
      // Inserts seed entries
      return knex('twitter_actions').insert({
        enabled: true, 
        title: 'Tweet at Carl\'s Jr.', 
        description: 'Please re-tweet THL\'s post about Carl\'s Jr\'s attempts to shut down our protest!', 
        target: 'https://twitter.com/TheHumaneLeague/status/963452807389958144'
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
          title: 'Email Carl\'s Jr. Leadership', 
          description: 'Share The Humane League\'s latest blog post about the NYC protest with Carl\'s Jr.', 
          to: 'PKrieg@ckr.com',
          subject: 'Attention Required'
        }, 'id')

          .then(emailActionId => {
            return knex('email_contents').insert([
              { action_id: emailActionId[0], content: 'Mr. Krieg,\n Have you seen this yet? It’s very upsetting and disappointing that Carl’s Jr. not only refuses to address the animal abuse in its supply chain but also actively tries to silence consumers who are urging the company to take action. Please do better. http://blog.thehumaneleague.org/carls-jr-animal-cruelty-scandal' }
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
          { twitter_actions: true, facebook_actions: true, email_actions: true, phone_actions: true, admin: true, name: 'Thomas Laird'}
        ])
      })
    });
};
