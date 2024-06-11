import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Artist.module.scss';

import { Button, Table, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import artistServices from '~/services/artistServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function Artist() {
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [artist, setArtist] = useState(null);

    const [addArtist, setAddArtist] = useState({
        name: '',
        description: '',
        imageURL: null,
    });

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleCancle = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchArtist() {
            try {
                const listArtist = await artistServices.getAllArtist();
                setArtist(listArtist);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchArtist();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddArtist({
            ...addArtist,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAddArtist({ ...addArtist, imageURL: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(addArtist.name);

            const formData = new FormData();
            formData.append('name', addArtist.name);
            formData.append('description', addArtist.description);
            formData.append('imageURL', addArtist.imageURL); // Thêm tệp nhạc vào FormData

            await artistServices.addArtist(formData); // Gửi dữ liệu dưới dạng FormData

            message.success('Artist added successfully');
            handleCancle();
        } catch (error) {
            console.error('Error creating artist:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faMicrophone} />} Artist</h1>
            </div>
            <div className={cx('container-add')}>
                <Button className={cx('button-add')} onClick={handleOpen}>
                    <PlusOutlined />
                </Button>
                <h5 className={cx('title-add')}>Add Artist</h5>
            </div>
            <div>
                <Table dataSource={artist} rowKey="artistID" pagination={{ pageSize: 3 }}>
                    <Column title="Artist ID" dataIndex="artistID" key="artistID" align="center" width={70} />
                    <Column
                        title="Avatar"
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
                    <Column title="Name" dataIndex="name" key="name" align="center" width={150} />
                    <Column title="Description" dataIndex="description" key="description" align="center" width={400} />
                    <Column
                        title="List Song"
                        dataIndex="listSong"
                        key="listSong"
                        align="center"
                        render={(listSong) => (
                            <ul className={cx('none-list-style')}>
                                {listSong.map((song, index) => (
                                    <li key={index}>{song}</li>
                                ))}
                            </ul>
                        )}
                    />
                    <Column title="List Album" dataIndex="listAlbum" key="listAlbum" align="center" />
                    <Column
                        title="Action"
                        key="action"
                        align="center"
                        render={(_, record) => (
                            <Space size="middle">
                                <a className={cx('edit')} href="/">
                                    Edit
                                </a>
                                <a className={cx('delete')} href="/">
                                    Delete
                                </a>
                            </Space>
                        )}
                    />
                </Table>
            </div>
            <Modal title="Add Artist" open={isModalOpen} onCancel={handleCancle} footer={null}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input artist name!',
                            },
                        ]}
                    >
                        <Input type="text" name="name" value={addArtist.name} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input artist description!',
                            },
                        ]}
                    >
                        <Input type="text" name="description" value={addArtist.description} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Avatar File"
                        name="imageURL"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            type="file"
                            ref={fileInputRef}
                            name="imageURL"
                            value={addArtist.imageURL}
                            onChange={handleFileChange}
                        />
                    </Form.Item>

                    <Form.Item
                        className={cx('button-add-container')}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button onClick={handleSubmit} type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Artist;
