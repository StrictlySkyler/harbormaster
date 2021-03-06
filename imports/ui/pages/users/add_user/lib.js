import { Users } from '../../../../api/users';

const is_harbormaster = function () {
  var user_id = Meteor.user() ? Meteor.user().emails[0].address: '';
  var user = Users.findOne(user_id);

  if (user && user.harbormaster) { return true; }

  return false;
};

const on_submit = function () {
  let { 
    invite_email,
    fresh,
    $route,
    $router,
  } = this;
  
  H.call('Users#invite_user', invite_email, (err, result) => {
    const rootPath = "/";
    
    if (err) { throw err; }

    if (fresh && $route.path != rootPath) $router.push(rootPath)
    else $router.push('/users');

  });
};

export {
  is_harbormaster,
  on_submit,
}