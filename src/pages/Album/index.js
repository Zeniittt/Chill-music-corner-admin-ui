import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import ModalCustom from '~/pages/Album/ModalCustom';
import ModalListSong from '~/pages/Album/ModalListSong';

import { Button, Table, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import albumServices from '~/services/albumServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function Album() {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const [isModalOpenListSong, setIsModalOpenListSong] = useState(false);
    const [selectedAlbumID, setSelectedAlbumID] = useState(null);

    const navigate = useNavigate();

    const handleReload = () => {
        // Full page reload
        window.location.reload();

        // Or using React Router
        navigate(window.location.pathname);
    };

    const handleOpen = async (type, albumID = null) => {
        setIsModalOpen(true);
        setLoading(true);
        setModalType(type);
        try {
            if (type === 'update' && albumID) {
                try {
                    const albumData = await albumServices.getAlbumById(albumID);
                    setSelectedAlbum(albumData);
                } catch (error) {
                    console.error('Error fetching album:', error);
                }
            } else {
                setSelectedAlbum(null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setModalType('');
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchAlbum() {
            setLoading(true);
            setIsModalOpen(true);
            try {
                const listAlbum = await albumServices.getAllAlbum();
                setAlbums(listAlbum);
            } catch (error) {
                console.error('Error fetching albums:', error);
            } finally {
                setLoading(false);
                setIsModalOpen(false);
            }
        }
        fetchAlbum();
    }, []);

    const handleDeleteAlbum = async (albumID) => {
        setLoading(true);
        setIsModalOpen(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await albumServices.deleteAlbum(albumID);
                message.success('Album deleted successfully');
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
            console.error('Error deleting album:', error);
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
                        formData.append('imageURL', file);
                        await albumServices.addAlbum(token, formData);
                        message.success('Album added successfully');
                    } else if (modalType === 'update' && selectedAlbum) {
                        await albumServices.updateAlbum(token, selectedAlbum.albumID, values);
                        message.success('Album updated successfully');
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

    //------------------------------------------------------------------------------------------
    //handle render list song
    const handleOpenModalListSong = async (albumID) => {
        setIsModalOpenListSong(true);
        setSelectedAlbumID(albumID);
    };

    const handleCloseModalListSong = () => {
        setIsModalOpenListSong(false);
    };

    return (
        <div>
            <div className={cx('title')}>
                <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faCompactDisc} />} Album</h1>
            </div>
            <div className={cx('container-add')}>
                <Button className={cx('button-add')} onClick={() => handleOpen('add')}>
                    <PlusOutlined />
                </Button>
                <h5 className={cx('title-add')}>Add Album</h5>
            </div>
            <div>
                <Table dataSource={albums} rowKey="albumID" pagination={{ pageSize: 5 }}>
                    <Column title="Album ID" dataIndex="albumID" key="albumID" align="center" width={70} />
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
                    <Column
                        title="List Song"
                        key="listSong"
                        align="center"
                        render={(_, record) => (
                            <button
                                className={cx('list-song-btn')}
                                onClick={() => handleOpenModalListSong(record.albumID)}
                            >
                                Click here to view detail
                            </button>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <button className={cx('edit')} onClick={() => handleOpen('update', record.albumID)}>
                                    Edit
                                </button>
                                <button className={cx('delete')} onClick={() => handleDeleteAlbum(record.albumID)}>
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
                    title={modalType === 'add' ? 'Add Album' : 'Update Album'}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    btnSubmit={modalType === 'add' ? 'Add' : 'Update'}
                    handleSubmit={handleSubmit}
                    albumData={selectedAlbum}
                    loading={loading}
                />
            )}
            {isModalOpenListSong && (
                <ModalListSong
                    isModalOpenListSong={isModalOpenListSong}
                    onCancel={handleCloseModalListSong}
                    albumID={selectedAlbumID}
                />
            )}
        </div>
    );
}

export default Album;
