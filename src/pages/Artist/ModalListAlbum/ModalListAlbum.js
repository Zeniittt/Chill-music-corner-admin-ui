import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import artistServices from '~/services/artistServices';

const { Column } = Table;

function ModalListSong({ isModalOpenListAlbum, onCancel, artistID }) {
    const [listAlbum, setListAlbum] = useState([]);

    useEffect(() => {
        async function fetchAlbum() {
            try {
                const listAlbum = await artistServices.getListAlbumgByArtistID(artistID);
                setListAlbum(listAlbum);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        }
        if (isModalOpenListAlbum && artistID) {
            fetchAlbum();
        }
    }, [isModalOpenListAlbum, artistID]);

    return (
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
                {/* <Column title="Genre" dataIndex="genre" key="genre" align="center" />
                <Column title="Album" dataIndex="album" key="album" align="center" />
                <Column title="Views" dataIndex="views" key="views" align="center" />
                <Column title="Created At" dataIndex="createdAt" key="createdAt" align="center" /> */}
                {/* <Column
                    title="Download"
                    dataIndex="songURL"
                    key="songURL"
                    align="center"
                    render={(songURL) => (
                        <a className={cx('underline')} href={songURL}>
                            Download
                        </a>
                    )}
                /> */}
            </Table>
        </Modal>
    );
}

export default ModalListSong;
