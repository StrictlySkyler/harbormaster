import { ReactiveVar } from 'meteor/reactive-var';
import { Lanes } from '../../../api/lanes';
import { Users } from '../../../api/users';

let total_shipments = new ReactiveVar('Loading');

const shipments_last_24_hours = function () {
  return total_shipments.get().toLocaleString();
};

const latest_shipment = function () {
  let latest_shipment = Session.get('latest_shipment') || false;

  H.call('Shipments#get_latest_date', function (err, res) {
    if (err) throw err;
    Session.set('latest_shipment', res);
  });

  if (! latest_shipment) return { locale: 'loading...' };

  return Session.get('latest_shipment');
};

const total_captains = function () {
  var captains = [];
  var lanes = Lanes.find().fetch();

  _.each(lanes, function (lane) {
    if (lane.captains) {
      captains = captains.concat(lane.captains);
    }
  });
  return _.uniq(captains).length.toLocaleString();
};

const total_harbormasters = function () {
  var harbormasters = Users.find({ harbormaster: true }).fetch();
  return harbormasters.length.toLocaleString();
};

export {
  shipments_last_24_hours,
  latest_shipment,
  total_captains,
  total_harbormasters,
  total_shipments
}