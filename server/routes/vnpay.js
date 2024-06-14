const router = require("express").Router()

const vnpay = require("../models/vnpay")

router.get('/getPay', async (req, res) => {
    const options = {
        sort: { createdAt: 1 }
    }

    const cursor = await vnpay.find(options)
    if (cursor) {
        res.status(200).send({ success: true, data: cursor })
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" })
    }
})

router.get()

module.exports = router