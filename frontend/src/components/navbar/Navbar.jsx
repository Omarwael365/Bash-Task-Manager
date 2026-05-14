import { Link } from 'react-router-dom';
import {  FaDesktop, FaFileAlt } from "react-icons/fa";

import styles from './Navbar.module.css';

function Navbar() {

    return (
        <div className={`${styles.navbar}`}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h3>Menu</h3>
                    <div className={styles.arrow}>
                    </div>
                </div>

                <div className={styles.items}>
                    <ul className={styles.ulist}>
                        <li className={styles.listitems}>
                            < FaDesktop className={styles.icons} />
                            <Link className={styles.links} to="/">Monitor</Link>
                        </li>
                        <li className={styles.listitems}>
                            < FaFileAlt className={styles.icons} />
                            <Link className={styles.links} to="/report">Reports</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
