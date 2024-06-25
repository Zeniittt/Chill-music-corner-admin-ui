import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Song.module.scss';
import ModalCustom from '~/pages/Song/ModalCustom';

import { Button, Table, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import songServices from '~/services/songServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function Song() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleReload = () => {
        // Full page reload
        window.location.reload();

        // Or using React Router
        navigate(window.location.pathname);
    };

    const handleOpen = async (type, songId = null) => {
        setIsModalOpen(true);
        setLoading(true);
        setModalType(type);
        try {
            if (type === 'update' && songId) {
                try {
                    const songData = await songServices.getSongById(songId);
                    setSelectedSong(songData);
                } catch (error) {
                    console.error('Error fetching song:', error);
                }
            } else {
                setSelectedSong(null);
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setModalType('');
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchSongs() {
            setLoading(true);
            setIsModalOpen(true);
            try {
                const listSong = await songServices.getAllSong();
                setSongs(listSong);
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setLoading(false);
                setIsModalOpen(false);
            }
        }
        fetchSongs();
    }, []);

    const handleDeleteSong = async (songId) => {
        setLoading(true);
        setIsModalOpen(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await songServices.deleteSong(token, songId);
                message.success('Song deleted successfully');
                setTimeout(() => {
                    handleReload();
                }, 500);
            } else {
                message.error('Access denined. No Token provided.');
                setTimeout(() => {
                    handleReload();
                }, 1000);
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    const handleSubmit = async (values, file) => {
        setLoading(true);
        setIsModalOpen(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    if (modalType === 'add') {
                        const formData = new FormData();
                        for (const key in values) {
                            formData.append(key, values[key]);
                        }
                        formData.append('songFile', file);
                        await songServices.addSong(token, formData);
                        message.success('Song added successfully');
                    } else if (modalType === 'update' && selectedSong) {
                        await songServices.updateSong(token, selectedSong.songID, values);
                        message.success('Song updated successfully');
                    }
                    setTimeout(() => {
                        handleReload();
                    }, 500);
                } catch (error) {
                    console.log(error);
                }
            } else {
                message.error('Access denined. No Token provided.');
                setTimeout(() => {
                    handleReload();
                }, 1000);
            }
        } catch (error) {
            console.error('Error processing request:', error);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faMusic} />} Song</h1>
            </div>
            <div className={cx('container-add')}>
                <Button className={cx('button-add')} onClick={() => handleOpen('add')}>
                    <PlusOutlined />
                </Button>
                <h5 className={cx('title-add')}>Add Song</h5>
            </div>
            <div>
                <Table dataSource={songs} rowKey="songID" pagination={{ pageSize: 5 }}>
                    <Column title="Song ID" dataIndex="songID" key="songID" align="center" width={70} />
                    <Column
                        title="Thumbnail"
                        dataIndex="imageURL"
                        key="imageURL"
                        align="center"
                        render={(imageURL) => (
                            <img
                                src={imageURL}
                                alt="avatar"
                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                            />
                        )}
                    />
                    <Column title="Name" dataIndex="name" key="name" align="center" />
                    <Column title="Artist" dataIndex="artist" key="artist" align="center" />
                    <Column title="Genre" dataIndex="genre" key="genre" align="center" />
                    <Column title="Album" dataIndex="album" key="album" align="center" />
                    <Column title="Views" dataIndex="views" key="views" align="center" />
                    <Column title="Created At" dataIndex="createdAt" key="createdAt" align="center" />
                    <Column
                        title="Download"
                        dataIndex="songURL"
                        key="songURL"
                        align="center"
                        render={(songURL) => (
                            <a className={cx('underline')} href={songURL}>
                                Download
                            </a>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <button className={cx('edit')} onClick={() => handleOpen('update', record.songID)}>
                                    Edit
                                </button>
                                <button className={cx('delete')} onClick={() => handleDeleteSong(record.songID)}>
                                    Delete
                                </button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
            {isModalOpen && (
                <ModalCustom
                    type={modalType}
                    title={modalType === 'add' ? 'Add Song' : 'Update Song'}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    btnSubmit={modalType === 'add' ? 'Add' : 'Update'}
                    handleSubmit={handleSubmit}
                    songData={selectedSong}
                    loading={loading}
                />
            )}
        </div>
    );
}

export default Song;
