const express = require('express');
const router = express.Router({ strict: true });

const stats = require('./stats');

router.get('/varz', (req, res) => {
  stats.getAllActiveUsers((err, results) => {
    res.send({
      activeUsers: results
    });
  });
});

module.exports = router;