const db = require("../models/bundle.model");

exports.create = async (req, res) => {
  const data = {
    name: req.body.name,
  };
  db.kategori
    .create(data)
    .then((result) => {
      res.send({
        code: 200,
        message: "Berahasil menyimpan data",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Gagal menyimpan data",
      });
    });
};

exports.findAll = async (req, res) => {
  db.kategori
    .findAll()
    .then((result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          message: "OK",
          data: result,
        });
      } else {
        res.send({
          code: 404,
          message: "Tidak ada data",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Gagal retrive data",
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  db.kategori.findOne({where:{id:id}}).then(result =>{
       res.send({
            code:200,
            message: 'OK',
            data :result
        })
    }) .catch(err =>{
        res.status(500).send({
            code:500,
            message: 'Gagal retrive data'
        })
    })
}


exports.update = async (req, res) => {
  const id = req.params.id;

  const data = {
    name: req.body.name,
  };
  db.kategori
    .update(data, {
      where: { id: id },
    })
    .then((result) => {
      if (result[0]) {
        res.send({
          code: 200,
          message: "Berhasil Update Data",
        });
      } else {
        // 422 request yg diminta ada kesalahan
        res.status(422).send({
          code: 422,
          message: "Gagal Update Data, field error",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Gagal Update Data",
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  db.kategori
    .destroy({
      where: { id: id },
    })
    .then((result) => {
      res.send({
        code: 200,
        message: "Berhasil Delete Data",
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Gagal Delete Data",
      });
    });
};
