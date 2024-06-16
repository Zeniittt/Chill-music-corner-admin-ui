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
        setModalType(type);
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
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setModalType('');
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchAlbum() {
            try {
                const listAlbum = await albumServices.getAllAlbum();
                setAlbums(listAlbum);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        }
        fetchAlbum();
    }, []);

    const handleDeleteAlbum = async (albumID) => {
        try {
            await albumServices.deleteAlbum(albumID);
            message.success('Album deleted successfully');
            handleReload();
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    const handleSubmit = async (values, file) => {
        try {
            if (modalType === 'add') {
                const formData = new FormData();
                for (const key in values) {
                    formData.append(key, values[key]);
                }
                formData.append('imageURL', file);
                await albumServices.addAlbum(formData);
                message.success('Album added successfully');
            } else if (modalType === 'update' && selectedAlbum) {
                await albumServices.updateAlbum(selectedAlbum.albumID, values);
                message.success('Album updated successfully');
            }
            handleReload();
        } catch (error) {
            console.error('Error processing request:', error);
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
