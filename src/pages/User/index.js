import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './User.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Table, Modal } from 'antd';
import userServices from '~/services/userServices';
import Loading from '../Loading';

const cx = classNames.bind(styles);

const { Column } = Table;

function User() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            setIsModalOpen(true);
            try {
                const listUser = await userServices.getAllUser();
                setUser(listUser);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {loading ? (
                <Modal
                    className={cx('loading')}
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    closable={false}
                    width={70}
                >
                    <Loading />
                </Modal>
            ) : (
                <div>
                    <div className={cx('title')}>
                        <h1 className={cx('text-title')}> {<FontAwesomeIcon icon={faUser} />} User</h1>
                    </div>
                    <div>
                        <Table dataSource={user} rowKey="userID" pagination={{ pageSize: 7 }}>
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
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
