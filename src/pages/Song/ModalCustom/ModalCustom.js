import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

function ModalCustom({ type, title, isModalOpen, handleCancel, btnSubmit, handleSubmit, songData }) {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (songData) {
            form.setFieldsValue(songData);
        } else {
            form.resetFields();
        }
    }, [songData, form]);

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
                            message: 'Please input song name!',
                        },
                    ]}
                >
                    <Input type="text" name="name" />
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
                    <Input type="text" name="artist" />
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
                    <Input type="text" name="genre" />
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
                    <Input type="text" name="album" />
                </Form.Item>

                {type === 'update' ? null : (
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
                        <Input type="text" name="views" />
                    </Form.Item>
                )}
                {type === 'update' ? null : (
                    <Form.Item
                        label="Song File"
                        name="songFile"
                        rules={[
                            {
                                required: true,
                                message: 'Please upload a song file!',
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
    );
}

export default ModalCustom;
