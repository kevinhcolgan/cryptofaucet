import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner)

const LoadingSpinner = () => (
    <FontAwesomeIcon className="fa-spin" icon="spinner" />
);

export default LoadingSpinner;