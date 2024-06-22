import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import artistServices from '~/services/artistServices';
import Loading from '~/pages/Loading';

const { Column } = Table;

function ModalListSong({ isModalOpenListSong, onCancel, artistID }) {
    const [listSong, setListSong] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchSong() {
            setLoading(true);
            try {
                const listSong = await artistServices.getListSongByArtistID(artistID);
                console.log(listSong);
                setListSong(listSong);
            } catch (error) {
                console.error('Error fetching artists:', error);
            } finally {
                setLoading(false);
            }
        }
        if (isModalOpenListSong && artistID) {
            fetchSong();
        }
    }, [isModalOpenListSong, artistID]);

    return (
        <div>
            {loading ? (
                <Modal open={isModalOpenListSong} onCancel={onCancel} footer={null} closable={false} width={70}>
                    <Loading />
                </Modal>
            ) : (
                <Modal open={isModalOpenListSong} onCancel={onCancel} width={1500} footer={null}>
                    <Table dataSource={listSong} rowKey="songID" pagination={{ pageSize: 5 }}>
                        <Column title="Song ID" dataIndex="songID" key="songID" align="center" width={70} />
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
                        <Column title="Genre" dataIndex="genre" key="genre" align="center" />
                        {/* <Column title="Album" dataIndex="album" key="album" align="center" /> */}
                        <Column title="Views" dataIndex="views" key="views" align="center" />
                        <Column title="Created At" dataIndex="createdAt" key="createdAt" align="center" />
                    </Table>
                </Modal>
            )}
        </div>
    );
}

export default ModalListSong;
