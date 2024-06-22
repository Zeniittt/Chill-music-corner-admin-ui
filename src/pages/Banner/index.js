import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import ModalCustom from '~/pages/Banner/ModalCustom';

import { Button, Table, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import bannerServices from '~/services/bannerServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function Banner() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [banners, setBanners] = useState([]);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleReload = () => {
        // Full page reload
        window.location.reload();

        // Or using React Router
        navigate(window.location.pathname);
    };

    const handleOpen = async (type, bannerID = null) => {
        setIsModalOpen(true);
        setLoading(true);
        setModalType(type);
        try {
            if (type === 'update' && bannerID) {
                try {
                    const bannerData = await bannerServices.getBannerById(bannerID);
                    setSelectedBanner(bannerData);
                } catch (error) {
                    console.error('Error fetching banner:', error);
                }
            } else {
                setSelectedBanner(null);
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
        async function fetchBanners() {
            setLoading(true);
            setIsModalOpen(true);
            try {
                const listBanner = await bannerServices.getAllBanner();
                setBanners(listBanner);
            } catch (error) {
                console.error('Error fetching banners:', error);
            } finally {
                setLoading(false);
                setIsModalOpen(false);
            }
        }
        fetchBanners();
    }, []);

    const handleDeleteBanner = async (bannerID) => {
        setLoading(true);
        setIsModalOpen(true);
        try {
            await bannerServices.deleteBanner(bannerID);
            message.success('Banner deleted successfully');
            handleReload();
        } catch (error) {
            console.error('Error deleting banner:', error);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    const handleSubmit = async (values, file) => {
        setLoading(true);
        setIsModalOpen(true);
        try {
            if (modalType === 'add') {
                const formData = new FormData();
                for (const key in values) {
                    formData.append(key, values[key]);
                }
                formData.append('imageURL', file);
                await bannerServices.addBanner(formData);
                console.log(formData);
                message.success('Banner added successfully');
            } else if (modalType === 'update' && selectedBanner) {
                await bannerServices.updateBanner(selectedBanner.bannerID, values);
                message.success('Banner updated successfully');
            }
            handleReload();
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
                <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faAd} />} Banner</h1>
            </div>
            <div className={cx('container-add')}>
                <Button className={cx('button-add')} onClick={() => handleOpen('add')}>
                    <PlusOutlined />
                </Button>
                <h5 className={cx('title-add')}>Add Banner</h5>
            </div>
            <div>
                <Table dataSource={banners} rowKey="bannerID" pagination={{ pageSize: 5 }}>
                    <Column title="Banner ID" dataIndex="bannerID" key="bannerID" align="center" width={70} />
                    <Column
                        title="Banner Image"
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
                    <Column title="Title" dataIndex="title" key="title" align="center" />
                    <Column title="Content" dataIndex="body" key="body" align="center" />

                    <Column
                        title="Link"
                        dataIndex="link"
                        key="link"
                        align="center"
                        render={(link) => (
                            <a className={cx('underline')} href={link}>
                                {link}
                            </a>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <button className={cx('edit')} onClick={() => handleOpen('update', record.bannerID)}>
                                    Edit
                                </button>
                                <button className={cx('delete')} onClick={() => handleDeleteBanner(record.bannerID)}>
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
                    title={modalType === 'add' ? 'Add Banner' : 'Update Banner'}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    btnSubmit={modalType === 'add' ? 'Add' : 'Update'}
                    handleSubmit={handleSubmit}
                    bannerData={selectedBanner}
                    loading={loading}
                />
            )}
        </div>
    );
}

export default Banner;
