const event = require('../models/event');
const participation = require('../models/participation');
const notification = require('../models/notification');


const upload = require('../../config/upload'); 
const authenticate = require('../../middleware/authenticate');

class EventController {
    //[POST] /create
    async create(req, res){
        try{
            
            upload.single('image')(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ message: 'Lỗi khi tải lên ảnh!' });
                }

                const { name, address, topic, date, description } = req.body;
                
                //Kiem tra rong
                if(!name || !address || !date) {
                    return res.status(400).json({message: 'Tên, địa chỉ và ngày tổ chức sự kiện là bắt buộc!'});
                }

                const re = /^[a-zA-Z0-9\s]+$/; // Chỉ cho phép chữ cái, số và khoảng trắng

                if (!re.test(name)) {
                    return res.status(400).json({ message: 'Tên sự kiện không hợp lệ. Vui lòng không sử dụng ký tự đặc biệt.' });
                }

                const newevent = new event({
                    name,
                    description,
                    address,
                    topic,
                    host: req.user.id,
                    date,
                    image: req.file
                            ? {
                                data: req.file.buffer,
                                contentType: req.file.mimetype
                            }
                            : null, //neu khong co anh de la null
                });

                await newevent.save();

                const Participation = new participation({
                    userId: req.user.id,
                    eventId: newevent._id // Lưu ID của sự kiện vừa tạo
                });
                await Participation.save();

                res.status(201).json({ message: 'Tạo sự kiện thành công!'});

            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi hệ thống!' });
        }
    }

    //[POST] /:id/join
    async join(req,res){
        const eventId = req.params.id;
        const userId = req.user.id;

        try{
            //Kiem tra event ton tai
            const Event = await event.findById(eventId);
            if (!Event) {
                return res.status(404).json({ message: 'Không tìm thấy sự kiện!' });
            }

            //Kiem tra user da tham gia su kien chua
            const alreadyJoined = await participation.findOne({ userId, eventId });
            if (alreadyJoined) {
                return res.status(400).json({ message: 'Bạn đã tham gia sự kiện này rồi!' });
            }

            //Tao moi ban ghi tham gia
            const Participation = new participation({ userId, eventId });
            await Participation.save();

            res.status(201).json({ message: 'Đăng ký tham gia sự kiện thành công!'});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //[POST]  /:id/Unjoin
    async Unjoin(req,res){
        const eventId = req.params.id; 
        const userId = req.user.id; 

        try {
            const Participation = await participation.findOne({ userId, eventId });

            if (!Participation) {
                return res.status(404).json({ message: 'Người dùng chưa tham gia sự kiện!' });
            }

            // Kiểm tra ngày bắt đầu sự kiện
            const Event = await event.findById(eventId);
            if (!Event) {
                return res.status(404).json({ message: 'Không tìm thấy sự kiện!' });
            }

            const currentDate = new Date();
            const eventStartDate = new Date(Event.date); // Giả sử 'date' là trường lưu trữ ngày bắt đầu sự kiện
            const timeDifference = eventStartDate - currentDate;
            const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

            //Kiem tra dieu kien huy
            if (daysRemaining <= 5) {
                return res.status(400).json({ message: 'Bạn không thể hủy tham gia trước 5 ngày bắt đầu sự kiện!' });
            }

            await participation.findByIdAndDelete(Participation._id); 

            res.status(200).json({ message: 'Hủy tham gia sự kiện thành công!' });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }

    //Kiem tra xem co phai host khong
    async checkEventHost(req,res,next) {
        try{
            const Event = await event.findById(req.params.id);
            if (!Event) {
                return res.status(404).json({ message: 'Sự kiện không tồn tại!' });
            }

            // Kiem tra neu nguoi dung la host
            if (Event.host.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa hay xóa sự kiện này!' });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: 'Lỗi hệ thống kiểm tra host!' });
        }
    }

    //[PUT] /:id/edit
    async editEvent(req, res) {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
    
            try {
                // Tìm sự kiện hiện tại
                const currentEvent = await event.findById(req.params.id);
    
                const updateData = {
                    name: req.body.name,
                    description: req.body.description,
                    address: req.body.address,
                    topic: req.body.topic,
                    image: currentEvent.image, // Giữ nguyên ảnh cũ nếu không có ảnh mới
                };
    
                // Nếu có ảnh mới, cập nhật hình ảnh
                if (req.file && req.file.buffer) {
                    updateData.image = req.file.buffer;
                }
    
                const updatedEvent = await event.findByIdAndUpdate(req.params.id, updateData, { new: true });
                
                //THONG BAO

                // Tìm tất cả người tham gia sự kiện
                const Participations = await participation.find({ eventId: req.params.id }).populate('userId');
    
                // Tạo thông báo cho từng người tham gia sự kiện
                const Notifications = Participations.map(part => ({
                    userId: part.userId._id,
                    eventId: updatedEvent._id,
                    message: `Sự kiện ${updatedEvent.name} bạn tham gia đã cập nhật thông tin mới!.`, // Nội dung thông báo
                }));
    
                // Lưu tất cả thông báo vào cơ sở dữ liệu
                await notification.insertMany(Notifications);
    
                res.json("Cập nhật thành công!");  
            } catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
    }

    //[delete] /:id/cancel
    async cancelEvent(req,res) {
        try{
            const Event = await event.findById(req.params.id);
            if (!Event) {
                return res.status(404).json({ message: 'Không tìm thấy sự kiện!' });
            }

            const currentDate = new Date();
            const eventCreateDate = new Date(Event.createdAt); // Giả sử 'date' là trường lưu trữ ngày bắt đầu sự kiện
            const timeDifference = currentDate-eventCreateDate;
            const days = Math.ceil(timeDifference / (1000 * 3600 * 24));

            //Kiem tra dieu kien huy
            if (days >= 7) {
                return res.status(400).json({ message: 'Bạn không thể xóa sự kiện sau 7 ngày tạo!' });
            }

             //THONG BAO
            
             // Tìm tất cả người tham gia sự kiện
            const Participations = await participation.find({ eventId: req.params.id }).populate('userId');
       
             // Tạo thông báo cho từng người tham gia sự kiện
            const Notifications = Participations.map(part => ({
                userId: part.userId._id,
                eventId: Event._id,                    
                message: `Sự kiện ${Event.name} bạn tham gia đã bị hủy!.`, // Nội dung thông báo
            }));
    
            // Lưu tất cả thông báo vào cơ sở dữ liệu
            await notification.insertMany(Notifications);

            await participation.deleteMany({ eventId: Event._id });
            
            await event.findByIdAndDelete(Event._id); 

            res.json({ message: 'Sự kiện đã bị hủy' });

        } catch (error) {
            res.status(500).json({ message: 'Lỗi hệ thống xóa sự kiện!' });
        }
    }
    
}

module.exports = new EventController();