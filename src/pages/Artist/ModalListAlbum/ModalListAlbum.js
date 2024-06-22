import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import artistServices from '~/services/artistServices';
import Loading from '~/pages/Loading';

const { Column } = Table;

function ModalListSong({ isModalOpenListAlbum, onCancel, artistID }) {
    const [listAlbum, setListAlbum] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchAlbum() {
            setLoading(true);
            try {
                const listAlbum = await artistServices.getListAlbumgByArtistID(artistID);
                setListAlbum(listAlbum);
            } catch (error) {
                console.error('Error fetching artists:', error);
            } finally {
                setLoading(false);
            }
        }
        if (isModalOpenListAlbum && artistID) {
            fetchAlbum();
        }
    }, [isModalOpenListAlbum, artistID]);

    return (
        <div>
            {loading ? (
                <Modal open={isModalOpenListAlbum} onCancel={onCancel} footer={null} closable={false} width={70}>
                    <Loading />
                </Modal>
            ) : (
                <Modal open={isModalOpenListAlbum} onCancel={onCancel} width={1500} footer={null}>
                    <Table dataSource={listAlbum} rowKey="songID" pagination={{ pageSize: 5 }}>
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
                    </Table>
                </Modal>
            )}
        </div>
    );
}

export default ModalListSong;
