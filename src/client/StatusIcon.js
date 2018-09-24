import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle)
library.add(faExclamationCircle)
let useIcon = '';
const StatusIcon = (statusCode) => (
    if(statusCode === 'tx_success')
    {
        useIcon = `${faCheckCircle}`
    }
    else if(statusCode === 'tx_failed') {
        useIcon = `${faExclamationCircle}`
    }
    <FontAwesomeIcon className="fa-spin" icon={useIcon} />
);

export default StatusIcon;