import React, { useState } from 'react';

const DeleteProjectDialog = ({ project, onClose, onDelete }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleDelete = () => {
        if (!password || password.length !== 4) {
            setError('비밀번호 4자리를 입력해주세요.');
            return;
        }

        try {
            onDelete(password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
                <h2 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', fontWeight: '700', color: '#dc2626' }}>
                    프로젝트 삭제
                </h2>

                <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.6' }}>
                    <strong>"{project.title}"</strong> 프로젝트를 삭제하시겠습니까?<br />
                    삭제하려면 비밀번호를 입력해주세요.
                </p>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        비밀번호 (4자리)
                    </label>
                    <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
                        placeholder="숫자 4자리"
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1rem',
                            letterSpacing: '0.5em'
                        }}
                    />
                </div>

                {error && (
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '20px',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: 'white',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '1rem'
                        }}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleDelete}
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}
                    >
                        삭제하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProjectDialog;
