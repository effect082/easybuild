import styles from './EditorLayout.module.css';

const EditorLayout = ({ leftPanel, centerPanel, rightPanel }) => {
    return (
        <div className={styles.container}>
            <aside className={styles.leftPanel}>
                {leftPanel}
            </aside>
            <main className={styles.centerPanel}>
                <div className={styles.mobileWrapper}>
                    {centerPanel}
                </div>
            </main>
            <aside className={styles.rightPanel}>
                {rightPanel}
            </aside>
        </div>
    );
};

export default EditorLayout;
