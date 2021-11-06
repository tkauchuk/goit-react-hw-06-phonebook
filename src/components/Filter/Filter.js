import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Filter.module.css';

import actions from '../../redux/items-actions';

function Filter({onFilterChange, contacts, value}) {

    return (
        <label className={styles.label}>
            Find contacts by name
            <input
                className={styles.input}
                type="text"
                name="filter"
                value={value}
                autoComplete="off"
                disabled={!contacts.length > 0}
                onChange={onFilterChange}
            />
        </label>
    );
}

const mapStateToProps = state => ({
  value: state.contacts.filter,
  contacts: state.contacts.items
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: (e) => dispatch(actions.changeContactsFilter(e.target.value))
});

Filter.propTypes = {
    onFilterChange: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);