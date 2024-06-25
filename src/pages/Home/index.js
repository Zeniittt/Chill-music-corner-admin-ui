import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Avatar, List } from 'antd';

const cx = classNames.bind(styles);

const data = [
    {
        avatar: '/mapavt.png',
        title: 'Mập aka Diễn diên chánh',
        description:
            'Chiến thần ngủ sớm, ông hoàng đánh răng, kẻ hủy diệt cơm chị Kỳ\nNí này quê Tiền Giang đặc biệt rất yêu Mama 👩‍🍼',
    },
    {
        avatar: '/khaiavt.png',
        title: 'Kmú aka Product Owner Lỏd',
        description:
            'Ní này thích đi Top nhưng đánh gà lắm, Axjoke ghẻ 🪳\n Nhà ở Bình Chánh có sở thích đặc biệt là td tinh thần',
    },
    {
        avatar: '/tinavt.png',
        title: 'Zeniit aka Admin Đẹp Trai',
        description:
            'Ní này đặc biệt đẹp trai, Admin thánh thiện của THK Music Corner \n Quê ở An Giang, sở thích là sút dzô đầu 2 thằng còn lại 🫡',
    },
];

function Home() {
    return (
        <div>
            <div className={cx('video-wrapper')}>
                <h1>About Us</h1>
                <div className={cx('video-container')}>
                    <video className={cx('video')} width="600" poster="/thumbnailvideo.png" controls>
                        <source src="/content.mp4" type="video/mp4" />
                    </video>
                </div>

                <h3 className={cx('title-information')}>Information Developers</h3>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} size={100} />}
                                    title={<h2>{item.title}</h2>}
                                    description={
                                        <p className={cx('des')}>
                                            {' '}
                                            {item.description.split('\n').map((line, index) => (
                                                <span key={index}>
                                                    {line}
                                                    <br /> {/* Thêm dòng mới sau mỗi dòng văn bản */}
                                                </span>
                                            ))}
                                        </p>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
