import PropTypes from 'prop-types';

import styles from './Filter.module.css';


function Filter({onFilterChange, isFilterActive}) {

    const onFilterInputChange = event => {
        const {value} = event.target;
        onFilterChange(value);
    }

    return (
        <label className={styles.label}>
            Find contacts by name
            <input
                className={styles.input}
                type="text"
                name="filter"
                autoComplete="off"
                disabled={!isFilterActive}
                onChange={onFilterInputChange}
            />
        </label>
    );
}

Filter.propTypes = {
    onFilterChange: PropTypes.func
}

export default Filter;