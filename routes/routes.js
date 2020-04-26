const router = require('express').Router();
const mongoose = require('mongoose');
const messagesModel = require('../messageSchema/messageSchema')

router.get('/allMessages', (req, res, next) => {
    messagesModel.find((error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    })
})

router.get('/findMessageBySubject', (req, res, next) => {
    messagesModel.findOne({ subject: req.body.subject }, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    })
})

router.put('/updateSubject/byId', (req, res, next) => {
    messagesModel.findByIdAndUpdate({ _id: req.body._id }, { subject: req.body.subject }, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send("Subject updated")
        }
    })
})

router.put('/updateSubject', (req, res, next) => {
    messagesModel.findOneAndUpdate({ subject: req.body.subject }, { subject: req.body.test }, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send("Subject updated")
        }
    })
})

router.delete('/deleteMessageById', (req, res, next) => {
    messagesModel.findByIdAndDelete({ _id: req.body._id }, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send("Message Deleted")
        }
    })
})

router.put('/updateMessage/byId', (req, res, next) => {
    messagesModel.findByIdAndUpdate({ _id: req.body._id }, { message: req.body.message }, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send("Message updated")
        }
    })
})

router.post('/newMessage', async (req, res, next) => {
    const messageRequest = new messagesModel({
        subject: req.body.subject,
        message: req.body.message
    })

    try {
        const newMessage = await messageRequest.save((data) => {
            if (data) {
                console.log(data)
            }
        });
        res.send("messages added to db");
    } catch (error) {
        res.send("error")
    }
})

module.exports = router;