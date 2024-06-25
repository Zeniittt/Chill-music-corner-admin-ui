import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Genre.module.scss';
import ModalCustom from '~/pages/Genre/ModalCustom';

import { Button, Table, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import genreServices from '~/services/genreServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function Genre() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleReload = () => {
        // Full page reload
        window.location.reload();

        // Or using React Router
        navigate(window.location.pathname);
    };

    const handleOpen = async (type, genreID = null) => {
        setIsModalOpen(true);
        setLoading(true);
        setModalType(type);
        try {
            if (type === 'update' && genreID) {
                try {
                    const genreData = await genreServices.getGenreById(genreID);
                    setSelectedGenre(genreData);
                } catch (error) {
                    console.error('Error fetching genre:', error);
                }
            } else {
                setSelectedGenre(null);
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
        async function fetchGenres() {
            setLoading(true);
            setIsModalOpen(true);
            try {
                const listGenre = await genreServices.getAllGenre();
                setGenres(listGenre);
            } catch (error) {
                console.error('Error fetching genres:', error);
            } finally {
                setLoading(false);
                setIsModalOpen(false);
            }
        }
        fetchGenres();
    }, []);

    const handleDeleteGenre = async (genreID) => {
        setLoading(true);
        setIsModalOpen(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await genreServices.deleteGenre(token, genreID);
                message.success('Genre deleted successfully');
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
            console.error('Error deleting genre:', error);
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
                        await genreServices.addGenre(token, formData);
                        message.success('Genre added successfully');
                    } else if (modalType === 'update' && selectedGenre) {
                        await genreServices.updateGenre(token, selectedGenre.genreID, values);
                        message.success('Genre updated successfully');
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
        <div>
            <div className={cx('title')}>
                <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faHeadphones} />} Genre</h1>
            </div>
            <div className={cx('container-add')}>
                <Button className={cx('button-add')} onClick={() => handleOpen('add')}>
                    <PlusOutlined />
                </Button>
                <h5 className={cx('title-add')}>Add Genre</h5>
            </div>
            <div>
                <Table dataSource={genres} rowKey="genreID" pagination={{ pageSize: 5 }}>
                    <Column title="Genre ID" dataIndex="genreID" key="genreID" align="center" width={500} />
                    <Column
                        title="Genre Image"
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
                    <Column title="Name" dataIndex="name" key="name" align="center" width={700} />
                    <Column
                        title="Action"
                        key="action"
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <button className={cx('edit')} onClick={() => handleOpen('update', record.genreID)}>
                                    Edit
                                </button>
                                <button className={cx('delete')} onClick={() => handleDeleteGenre(record.genreID)}>
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
                    title={modalType === 'add' ? 'Add Genre' : 'Update Genre'}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    btnSubmit={modalType === 'add' ? 'Add' : 'Update'}
                    handleSubmit={handleSubmit}
                    genreData={selectedGenre}
                    loading={loading}
                />
            )}
        </div>
    );
}

export default Genre;
