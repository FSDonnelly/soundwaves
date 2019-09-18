import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashboardLayout from '../../hoc/DashboardLayout';
import { loadUser } from '../../actions/user';
import MyButton from '../../utils/Button';
const Dashboard = ({ loadUser, user: { loading, isAuthenticated } }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [loadUser]);

  return loading && isAuthenticated === null ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <DashboardLayout>
        <div className='container'>
          <div className='info'>
            <h1>User Information</h1>
            <div className='profile'>
              <span>Name</span>
              <span>Lastname</span>
              <span>Email</span>
            </div>
            <MyButton
              type='default'
              linkTo='/user/profile'
              message='Edit Account Info'
              buttonClassName='ui green inverted button'
              icon='far fa-user-circle'
              addStyles={{
                marginTop: '10px'
              }}
            />
          </div>
          <div className='info'>
            <h1>Purchase History</h1>
            <div className='purchase-history'>history</div>
          </div>
        </div>
      </DashboardLayout>
    </Fragment>
  );
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Dashboard);
