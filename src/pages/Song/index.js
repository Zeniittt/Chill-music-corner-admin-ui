import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Song.module.scss';

import { Button, Table, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import songServices from '~/services/songServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function Song() {
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [song, setSong] = useState(null);
    const [selectedSongId, setSelectedSongId] = useState(null);
    //const [user, setUser] = useState(null);

    const [addSong, setAddSong] = useState({
        name: '',
        artist: '',
        genre: '',
        album: '',
        views: '',
        songFile: null,
    });

    const navigate = useNavigate();

    const handleReload = () => {
        // Full page reload
        window.location.reload();

        // Or using React Router
        navigate(window.location.pathname);
    };

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleCancle = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchSong() {
            try {
                const listSong = await songServices.getAllSong();
                setSong(listSong);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchSong();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddSong({
            ...addSong,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAddSong({ ...addSong, songFile: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', addSong.name);
            formData.append('artist', addSong.artist);
            formData.append('genre', addSong.genre);
            formData.append('album', addSong.album);
            formData.append('views', addSong.views);
            formData.append('songFile', addSong.songFile); // Thêm tệp nhạc vào FormData

            try {
                await songServices.addSong(formData); // Gửi dữ liệu dưới dạng FormData
            } catch (error) {
                console.error('Error creating user:', error);
            }

            message.success('Song added successfully');
            handleReload();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleSelectSong = (record) => {
        // Extract song ID from the record object
        const songId = record.songID;

        // Update state with the selected song ID
        setSelectedSongId(songId);
    };

    const handleDeleteSong = async (songId) => {
        try {
            await songServices.deleteSong(songId);
            message.success('Song added successfully');
            setTimeout(() => {
                console.log('Delayed message after 2 seconds');
            }, 1000);
            handleReload();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <div className={cx('title')}>
                <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faMusic} />} Song</h1>
            </div>
            <div className={cx('container-add')}>
                <Button className={cx('button-add')} onClick={handleOpen}>
                    <PlusOutlined />
                </Button>
                <h5 className={cx('title-add')}>Add Song</h5>
            </div>
            <div>
                <Table dataSource={song} rowKey="userID" pagination={{ pageSize: 5 }} onRow={handleSelectSong}>
                    <Column title="Song ID" dataIndex="songID" key="userID" align="center" width={70} />
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
                                <button className={cx('edit')}>Edit</button>
                                <button
                                    className={cx('delete')}
                                    disabled={!selectedSongId}
                                    onClick={() => handleDeleteSong(record.songID)}
                                >
                                    {/* Bind `handleDeleteSong` to the button click and pass the song ID */}
                                    Delete
                                </button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
            <Modal title="Add Song" open={isModalOpen} onCancel={handleCancle} footer={null}>
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
                                message: 'Please input song name!',
                            },
                        ]}
                    >
                        <Input type="text" name="name" value={addSong.name} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Artist"
                        name="artist"
                        rules={[
                            {
                                required: true,
                                message: 'Please input song artist!',
                            },
                        ]}
                    >
                        <Input type="text" name="artist" value={addSong.artist} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[
                            {
                                required: true,
                                message: 'Please input song genre!',
                            },
                        ]}
                    >
                        <Input type="text" name="genre" value={addSong.genre} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Album"
                        name="album"
                        rules={[
                            {
                                required: true,
                                message: 'Please input song album!',
                            },
                        ]}
                    >
                        <Input type="text" name="album" value={addSong.album} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Views"
                        name="views"
                        rules={[
                            {
                                required: true,
                                message: 'Please input song views!',
                            },
                        ]}
                    >
                        <Input type="text" name="views" value={addSong.views} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Song File"
                        name="songFile"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            type="file"
                            ref={fileInputRef}
                            name="songFile"
                            value={addSong.songFile}
                            onChange={handleFileChange}
                        />
                    </Form.Item>

                    {/* <div className={cx('container-add-file')}>
                        <Button className={cx('button-add-file')} onClick={handleFileButtonClick}>
                            <FolderAddOutlined />
                        </Button>
                        <h5 className={cx('title-add-file')}>Add Song File</h5>
                    </div> */}

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

export default Song;
