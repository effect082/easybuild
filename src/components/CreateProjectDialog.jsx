import React, { useState } from 'react';
import { templates } from '../templates/templates';

const CreateProjectDialog = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('뉴스레터');
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('personal'); // 'personal' or 'team'
    const [error, setError] = useState('');

    const handleCreate = () => {
        // Validation
        if (!title.trim()) {
            setError('제목을 입력해주세요.');
            return;
        }
        if (!author.trim()) {
            setError('작성자명을 입력해주세요.');
            return;
        }
        if (!password || password.length !== 4 || !/^\d{4}$/.test(password)) {
            setError('비밀번호는 4자리 숫자여야 합니다.');
            return;
        }

        // Get template based on type
        let template = null;
        if (type === '뉴스레터') {
            template = templates.find(t => t.id === 'newsletter');
        } else if (type === '홍보') {
            template = templates.find(t => t.id === 'promotion');
        } else if (type === '초대장') {
            template = templates.find(t => t.id === 'invitation');
        }

        onCreate({
            title: title.trim(),
            type,
            author: author.trim(),
            password,
            category,
            template
        });
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
                <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', fontWeight: '700', textAlign: 'center' }}>
                    새 프로젝트 만들기
                </h2>

                {/* Title */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        제목
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="예: 5월 가정의 달 행사 초대"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                {/* Category */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        분류
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={() => setCategory('personal')}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: `1px solid ${category === 'personal' ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                backgroundColor: category === 'personal' ? '#eff6ff' : 'white',
                                color: category === 'personal' ? 'var(--primary-color)' : '#666',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            개인
                        </button>
                        <button
                            type="button"
                            onClick={() => setCategory('team')}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: `1px solid ${category === 'team' ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                backgroundColor: category === 'team' ? '#eff6ff' : 'white',
                                color: category === 'team' ? 'var(--primary-color)' : '#666',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            팀
                        </button>
                    </div>
                </div>

                {/* Type */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        유형 선택
                    </label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {['뉴스레터', '홍보', '초대장'].map((t) => (
                            <label key={t} style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                border: `2px solid ${type === t ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                backgroundColor: type === t ? '#eff6ff' : 'white',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="type"
                                    value={t}
                                    checked={type === t}
                                    onChange={(e) => setType(e.target.value)}
                                    style={{ marginRight: '8px' }}
                                />
                                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        비밀번호 (4자리, 삭제 방지용)
                    </label>
                    <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
                        placeholder="숫자 4자리"
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

                {/* Author */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        작성자명 또는 팀명
                    </label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="예: 복지센터"
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                {/* Error */}
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

                {/* Buttons */}
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
                        onClick={handleCreate}
                        style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}
                    >
                        생성하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectDialog;
