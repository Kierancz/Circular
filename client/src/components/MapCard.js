import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import * as _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';

class MapCard extends Component {
  render() {
    const { apartments, campaignAddress } = this.props;
    const MapWithAMarker = withRouter(
      withScriptjs(
        withGoogleMap(props => (
          <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={10}
            defaultCenter={{ lat: 39.7392, lng: -104.9903 }}
            onClick={props.onMapClick}
          >
            {props.markers.map(marker => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onRightClick={() => props.onMarkerRightClick(marker)}
                onClick={() => props.router.push(`/campaign/${marker.id}`)}
                title={marker.street_address}
              />
            ))}
          </GoogleMap>
        ))
      )
    );

    /*
    updateStateToCampaignInfo should be called when:
      - a campaign marker is clicked on the map (this pushes on the router)
      - the someone types in a new address ( is this captured by the router)
      - 'go to your signed campaign' button clicked (this goes through react router)

    + see if I can updateStateToCampaignInfo() in the react router call,
      - calling into redux actions in the router is not working for some reason
      -- look into react-router-redux OH WERE ALREADY USING IT

    + also see if the react router call is recalled if the visible component does not change, but the url (param.id) does
    */

    const mapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
      process.env.REACT_APP_GOOGLE_MAPS_KEY
    }`;
    return (
      <div className="main-content">
        <div className="card card-map">
          <div className="header">
            <h3 className="title text-center">{campaignAddress}</h3>
          </div>
          <div className="content">
            <MapWithAMarker
              googleMapURL={mapUrl}
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={
                <div
                  style={{
                    width: '100%',
                    height: '300px',
                    position: 'relative',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                />
              }
              mapElement={<div style={{ height: '100%' }} />}
              onMapLoad={_.noop}
              onMapClick={_.noop}
              markers={apartments}
              onMarkerRightClick={_.noop}
            />
          </div>
        </div>
      </div>
    );
  }
}

MapCard.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.object).isRequired,
  campaignAddress: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  apartments: state.initialSearch.apartments,
  campaignAddress: state.activeCampaign.campaign.street_address
});

export default MapCard;
