import React from 'react';
import styles from '../checkbox.module.scss';

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <td className={styles.checkboxCell}>
            <label className={styles.adminCheckbox}>
                <input type="checkbox" role="switch" ref={resolvedRef} {...rest} />
                <span className={styles.checkbox__checkmark} />
                <span className={styles.checkbox__body} />
            </label>
        </td>
    );
});
