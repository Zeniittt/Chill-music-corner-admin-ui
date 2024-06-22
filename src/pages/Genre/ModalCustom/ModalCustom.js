import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Loading from '~/pages/Loading';
import classNames from 'classnames/bind';
import styles from './ModalCustom.module.scss';

const cx = classNames.bind(styles);

function ModalCustom({ type, title, isModalOpen, handleCancel, btnSubmit, handleSubmit, genreData, loading }) {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (genreData) {
            form.setFieldsValue(genreData);
        } else {
            form.resetFields();
        }
    }, [genreData, form]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const onFinish = (values) => {
        handleSubmit(values, file);
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
                <Modal title={title} open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input genre name!',
                                },
                            ]}
                        >
                            <Input type="text" name="name" />
                        </Form.Item>

                        {type === 'update' ? null : (
                            <Form.Item
                                label="Banner Image"
                                name="imageURL"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload a banner file!',
                                    },
                                ]}
                            >
                                <Input type="file" onChange={handleFileChange} />
                            </Form.Item>
                        )}

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                {btnSubmit}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
}

export default ModalCustom;
