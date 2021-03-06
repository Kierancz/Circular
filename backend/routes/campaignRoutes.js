const mongoose = require('mongoose');
const Campaign = mongoose.model('Campaign');

module.exports = app => {
  app.get('/api/campaigns/find', async (req, res) => {
    await Campaign.geoNear(
      {
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      {
        spherical: true,
        maxDistance: 200
      },
      (err, results, stats) => {
        if (err) {
          res.status(422).send(err);
        } else {
          const data = results.map(
            ({ obj: { address, name, voteCount, _id } }) => {
              return {
                address,
                name,
                voteCount,
                id: _id
              };
            }
          );
          res.send(data);
        }
      }
    );
  });

  app.get('/api/campaigns', async (req, res) => {
    const campaigns = await Campaign.find({});

    const data = campaigns.map(
      ({ _id, address, voteCount, latLng: { coordinates } }) => {
        return {
          address,
          voteCount,
          lat: coordinates[1],
          lng: coordinates[0],
          id: _id
        };
      }
    );

    res.send(data);
  });

  app.get('/api/campaigns/:id', async (req, res) => {
    const campaign = await Campaign.find({ _id: req.params.id }).populate(
      '_wasteProviderId'
    );

    res.send(campaign);
  });

  app.post('/api/campaigns', async (req, res) => {
    const {
      address,
      lat,
      lng,
      _wasteProviderId,
      propertyManager,
      buildingInfo
    } = req.body;

    const campaign = new Campaign({
      address,
      latLng: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      _wasteProviderId,
      propertyManager,
      buildingInfo
    });

    const data = await campaign.save();
    res.send(data);
  });
};
