import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './User.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Table, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import userServices from '~/services/userServices';

const cx = classNames.bind(styles);

const { Column } = Table;

function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    const [addUser, setAddUser] = useState({
        name: '',
        status: '',
    });

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleCancle = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const listUser = await userServices.getAllUser();
                setUser(listUser);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddUser({
            ...addUser,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userServices.addUser(addUser);
            message.success('User added successfully');
            handleCancle();
            const listUser = await userServices.getAllUser();
            setUser(listUser);
            // Xử lý phản hồi từ API, ví dụ: cập nhật state hoặc hiển thị thông báo thành công
        } catch (error) {
            console.error('Error creating user:', error);
            // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
        }
    };

    return (
        <div>
            <div className={cx('title')}>
                <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faUser} />} User</h1>
            </div>
            <div className={cx('container-add')}>
                <Button className={cx('button-add')} onClick={handleOpen}>
                    <PlusOutlined />
                </Button>
                <h5 className={cx('title-add')}>Add User</h5>
            </div>
            <div>
                <Table dataSource={user} rowKey="userID" pagination={{ pageSize: 5 }}>
                    <Column title="User ID" dataIndex="userID" key="userID" align="center" width={120} />
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
                    <Column title="Username" dataIndex="username" key="username" align="center" />
                    <Column title="Email" dataIndex="email" key="email" align="center" />
                    <Column title="SignIn Method" dataIndex="signInMethod" key="signInMethod" align="center" />

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
            <Modal title="Add User" open={isModalOpen} onCancel={handleCancle} footer={null}>
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
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input type="text" name="name" value={addUser.name} onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your status!',
                            },
                        ]}
                    >
                        <Input type="text" name="status" value={addUser.status} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
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

export default User;
