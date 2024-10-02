import React from 'react';
import styles from '../checkbox.module.scss';

export const Checkbox = React.forwardRef((props, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    return (
        <label className={styles.adminCheckbox}>
            <input type="checkbox" ref={resolvedRef} {...props} />
        </label>
    );
});
