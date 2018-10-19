const Shortener = require('../models/shortener.model')
const RandExp = require('randexp')

module.exports = {
  getUrl: (req, res) => {
    const { shortcode } = req.params
    Shortener.findOne({
      shortcode
    })
      .then(shortener => {
        shortener.update({
          $inc: {
            redirectCount: 1
          }
        }, function (err) {
          if(!err) {
            res.status(200).send({
              shortener
            })
          } else {
            res.status(400).send({
              message: 'get url failed'
            })
          }
        })
      })
      .catch(err => {
        res.status(404).send({
          err,
          message: 'The shortcode cannot be found in the system'
        })
      })
  },
  getStats: (req, res) => {
    const { shortcode } = req.params
    Shortener.findOne({
      shortcode
    })
      .then(shortener => {
        res.status(200).send({
          shortener
        })
      })
      .catch(err => {
        res.status(404).send({
          err,
          message: 'The shortcode cannot be found in the system'
        })
      })
  },
  newUrl: (req, res) => {
    const { url, shortcode } = req.body
    if (!url) {
      res.status(400).send({
        message: 'url is not present'
      })
    } else {
      let newShortener
      if (!shortcode) {
        const randomShorCode = new RandExp('^[0-9a-zA-Z_]{6}$').gen()
        newShortener = new Shortener({
          url,
          shortcode: randomShorCode,
          redirectCount: 1
        })

        newShortener.save((err, result) => {
          if (err) {
            res.status(400).send({
              message: err.message
            })
          } else {
            res.status(201).send({
              shortcode: result
            })
          }
        })
      } else {
        if (/^[0-9a-zA-Z_]{4,}$/.test(shortcode)) {
          newShortener = new Shortener({
            url,
            shortcode,
            redirectCount: 1
          })

          newShortener.save((err, result) => {
            if (err) {
              res.status(400).send({
                message: err.message
              })
            } else {
              res.status(201).send({
                shortcode: result
              })
            }
          })
        } else {
          res.status(422).send({
            message: 'The shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$'
          })
        }
      }
    }
  }
}