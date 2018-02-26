
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
        description: "Let's keep the pressure on CKE's Chief Marketing Officer, Jeff Jenkins, to be a leader for the animals and address the suffering of chickens in Carl's Jr's supply chain.", 
        target: 'https://twitter.com/jeffmjenkins'
      }, 'id')

        .then(twitterActionId => {
          return knex('twitter_contents').insert([
           { action_id: twitterActionId[0], content: "Please stop ignoring the suffering in your chicken supply chain. #FridayFeeling #PioneersOfCruelty http://blog.thehumaneleague.org/carls-jr-animal-cruelty-scandal"},
           { action_id: twitterActionId[0], content: "It’s time @Carlsjr adopts the same animal welfare standards as Burger King, Subway, and Chipotle. #BoycottCarlsJr www.PioneersOfCruelty.com"},
           { action_id: twitterActionId[0], content: "Consumers are fed up with @Carlsjr’s refusal to address the animal cruelty in its supply chain. #FridayFeeling http://blog.thehumaneleague.org/carls-jr-animal-cruelty-scandal"}
          ])
        })

      .then(() => {
        return knex('facebook_actions').insert({
          enabled: true, 
          title: 'MeatFree Food', 
          description: 'Comment on The Humane League\'s facebook page with your favorite meat-free recipes!', 
          target: 'https://www.facebook.com/thehumaneleague/'
        }, 'id')

          .then(facebookActionId => {
            return knex('facebook_contents').insert([
              { action_id: facebookActionId[0], content: 'My favorite vegan/vegetarian recipe is: ' },
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
          title: 'Call Carl\'s Jr. Leadership', 
          description: 'Phone Action Description', 
          name: 'Katie Scruggs',
          position: 'Troop Rallier',
          phone_number: '4054269430'
        }, 'id')

          .then(phoneActionId => {
            return knex('phone_contents').insert([
              { action_id: phoneActionId[0], content: 'Hello, my name is Katie Scruggs, and I am calling to tell you about phone script 1.' },
              { action_id: phoneActionId[0], content: 'Hello, my name is Katie Scruggs, and I am calling on behalf of phone script 2.' },
              { action_id: phoneActionId[0], content: 'Phone Script 3: Hello, my name is Katie Scruggs, and ...' }
            ])
          })
      })
    });
};
