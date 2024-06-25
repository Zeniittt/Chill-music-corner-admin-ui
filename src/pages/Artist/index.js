import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Artist.module.scss';
import ModalCustom from '~/pages/Artist/ModalCustom';
import ModalListSong from '~/pages/Artist/ModalListSong';
import ModalListAlbum from '~/pages/Artist/ModalListAlbum';

import { Button, Table, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import artistServices from '~/services/artistServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function Artist() {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);

    const [isModalOpenListSong, setIsModalOpenListSong] = useState(false);
    const [isModalOpenListAlbum, setIsModalOpenListAlbum] = useState(false);
    const [selectedArtistID, setSelectedArtistID] = useState(null);

    const navigate = useNavigate();

    const handleReload = () => {
        // Full page reload
        window.location.reload();

        // Or using React Router
        navigate(window.location.pathname);
    };

    const handleOpen = async (type, artistId = null) => {
        setIsModalOpen(true);
        setLoading(true);
        setModalType(type);
        try {
            if (type === 'update' && artistId) {
                try {
                    const artistData = await artistServices.getArtistById(artistId);
                    setSelectedArtist(artistData);
                } catch (error) {
                    console.error('Error fetching artist:', error);
                }
            } else {
                setSelectedArtist(null);
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
        async function fetchAritst() {
            setLoading(true);
            setIsModalOpen(true);
            try {
                const listArtist = await artistServices.getAllArtist();
                setArtists(listArtist);
            } catch (error) {
                console.error('Error fetching artists:', error);
            } finally {
                setLoading(false);
                setIsModalOpen(false);
            }
        }
        fetchAritst();
    }, []);

    const handleDeleteArtist = async (artistId) => {
        setLoading(true);
        setIsModalOpen(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await artistServices.deleteArtist(token, artistId);
                message.success('Artist deleted successfully');
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
            console.error('Error deleting artist:', error);
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
                        await artistServices.addArtist(token, formData);
                        message.success('Artist added successfully');
                    } else if (modalType === 'update' && selectedArtist) {
                        await artistServices.updateArtist(token, selectedArtist.artistID, values);
                        message.success('Artist updated successfully');
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
    const handleOpenModalListSong = async (artistId) => {
        setIsModalOpenListSong(true);
        setSelectedArtistID(artistId);
    };

    const handleCloseModalListSong = () => {
        setIsModalOpenListSong(false);
    };

    //------------------------------------------------------------------------------------------
    //handle render list album
    const handleOpenModalListAlbum = async (artistId) => {
        setIsModalOpenListAlbum(true);
        setSelectedArtistID(artistId);
    };

    const handleCloseModalListAlbum = () => {
        setIsModalOpenListAlbum(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('title')}>
                    <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faMicrophone} />} Artist</h1>
                </div>
                <div className={cx('container-add')}>
                    <Button className={cx('button-add')} onClick={() => handleOpen('add')}>
                        <PlusOutlined />
                    </Button>
                    <h5 className={cx('title-add')}>Add Artist</h5>
                </div>
                <div>
                    <Table dataSource={artists} rowKey="artistID" pagination={{ pageSize: 3 }}>
                        <Column title="Artist ID" dataIndex="artistID" key="artistID" align="center" width={70} />
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
                        <Column title="Description" dataIndex="description" key="description" align="center" />
                        <Column
                            title="List Song"
                            key="listSong"
                            align="center"
                            render={(_, record) => (
                                <button
                                    className={cx('list-song-btn')}
                                    onClick={() => handleOpenModalListSong(record.artistID)}
                                >
                                    Click here to view detail
                                </button>
                            )}
                        />
                        <Column
                            title="List Album"
                            key="listAlbum"
                            align="center"
                            render={(_, record) => (
                                <button
                                    className={cx('list-album-btn')}
                                    onClick={() => handleOpenModalListAlbum(record.artistID)}
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
                                    <button
                                        className={cx('edit')}
                                        onClick={() => handleOpen('update', record.artistID)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={cx('delete')}
                                        onClick={() => handleDeleteArtist(record.artistID)}
                                    >
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
                        title={modalType === 'add' ? 'Add Artist' : 'Update Artist'}
                        isModalOpen={isModalOpen}
                        handleCancel={handleCancel}
                        btnSubmit={modalType === 'add' ? 'Add' : 'Update'}
                        handleSubmit={handleSubmit}
                        artistData={selectedArtist}
                        loading={loading}
                    />
                )}
                {isModalOpenListSong && (
                    <ModalListSong
                        isModalOpenListSong={isModalOpenListSong}
                        onCancel={handleCloseModalListSong}
                        artistID={selectedArtistID}
                    />
                )}
                {isModalOpenListAlbum && (
                    <ModalListAlbum
                        isModalOpenListAlbum={isModalOpenListAlbum}
                        onCancel={handleCloseModalListAlbum}
                        artistID={selectedArtistID}
                    />
                )}
            </div>
        </div>
    );
}

export default Artist;
