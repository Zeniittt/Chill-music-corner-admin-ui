import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Album.module.scss';

import { Button, Table, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import albumServices from '~/services/albumServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function Artist() {
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [album, setAlbum] = useState(null);

    const [addAlbum, setaddAlbum] = useState({
        name: '',
        artist: '',
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
                const listAlbum = await albumServices.getAllAlbum();
                setAlbum(listAlbum);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchArtist();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setaddAlbum({
            ...addAlbum,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setaddAlbum({ ...addAlbum, imageURL: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(addAlbum.name);

            const formData = new FormData();
            formData.append('name', addAlbum.name);
            formData.append('artist', addAlbum.artist);
            formData.append('imageURL', addAlbum.imageURL); // Thêm tệp nhạc vào FormData

            await albumServices.addAlbum(formData); // Gửi dữ liệu dưới dạng FormData

            message.success('Album added successfully');
            handleCancle();
        } catch (error) {
            console.error('Error creating artist:', error);
        }
    };

    return (
        <div>
            <div className={cx('title')}>
                <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faCompactDisc} />} Album</h1>
            </div>
            <div className={cx('container-add')}>
                <Button className={cx('button-add')} onClick={handleOpen}>
                    <PlusOutlined />
                </Button>
                <h5 className={cx('title-add')}>Add Album</h5>
            </div>
            <div>
                <Table dataSource={album} rowKey="albumID" pagination={{ pageSize: 5 }}>
                    <Column title="Album ID" dataIndex="albumID" key="albumID" align="center" width={70} />
                    <Column
                        title="Thumbnaik"
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
                    <Column title="Artist" dataIndex="artist" key="artist" align="center" width={400} />
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
            <Modal title="Add Album" open={isModalOpen} onCancel={handleCancle} footer={null}>
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
                                message: 'Please input album name!',
                            },
                        ]}
                    >
                        <Input type="text" name="name" value={addAlbum.name} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Artist"
                        name="artist"
                        rules={[
                            {
                                required: true,
                                message: 'Please input album artist!',
                            },
                        ]}
                    >
                        <Input type="text" name="artist" value={addAlbum.artist} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Thumbnail File"
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
                            value={addAlbum.imageURL}
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
